import express from "express";
import Orar from "../schemas/orarClase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protect, admin } from "./auth.js";
import User from "../schemas/user.js";
import Antrenor from "../schemas/listaAntrenoriAdmin.js";
import Clasa from "../schemas/listaClaseAdmin.js";
import cron from 'node-cron';
const router = express.Router();

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'burnFitness/pozeProfil',
    public_id: (req, file) => req.user.userId + '_pozaProfil',
  },
});

const upload = multer({ storage });

router.post("/orarClase", admin, async (req, res) => {
  let checkAvailability = await Orar.findOne({locatie: req.body.locatie, denumire: req.body.denumire, data: req.body.data})
  if (checkAvailability === null) {
    try {
      await Orar.create({
        locatie: req.body.locatie,
        zi: req.body.zi,
        data: req.body.data,
        expiryDate: new Date(new Date(req.body.data).getTime() + 7 * 24 * 60 * 60 * 1000),
        denumire: req.body.denumire,
        antrenor: req.body.antrenor,
        capacitate: req.body.capacitate
      });
      res.status(200).json("clasă adăugată la orar");
    } catch (err) {
      res.status(400).json({ message: "errorAddingClass" });
    }
  } else {
    res.json({ message: "classAlreadyExists" });
  }
});

router.get("/orarClase", async (req, res) => {
  let dataClase;
  try{
    if (req.query.locatie !== undefined) {
      dataClase = await Orar.find({ locatie: req.query.locatie });
    } else if (req.query.clasa) {
      dataClase = await Orar.find({ denumire: req.query.clasa });
    }
    res.status(200).json(dataClase);
  } catch(err) {
    res.status(503).json({message: 'A aparut o eroare'})
  }
});

router.delete("/orarClase", admin, async (req, res) => {
  try {
    await Orar.deleteOne({
      _id: req.body._id
    });
    res.status(204).json({ message: `Class deleted ${req.body.locatie}` });
  } catch (err) {
    res.json({ message: `An error has occured` });
  }
});

// Sign up for classes

router.post("/signUpClasa", protect, async (req, res) => {
  let clasa = await Orar.findOne({ _id: req.body._id });
  let user = await User.findOne({ _id: req.user.userId });
  let hasAerobic = user.activeSubscriptions.some((abonament) =>
    abonament.subscriptionName.toLowerCase().includes("aerobic"),
  );
  if (hasAerobic) {
    if (user.activeClasses.length === 0 || user.activeClasses.length > 0) {
      if (
        user.activeClasses.some((clasa) => clasa.classId === req.body._id) ===
        false
      ) {
        if (clasa.inscrisi.length < clasa.capacitate) {
          await Orar.updateOne(
            { _id: req.body._id },
            {
              $push: {
                inscrisi: { numeClient: user.username, idClient: user._id },
              },
            },
          );

          await User.updateOne(
            { _id: req.user.userId },
            {
              $push: {
                activeClasses: {
                  classId: clasa._id,
                  className: clasa.denumire,
                  date: clasa.data,
                  antrenor: clasa.antrenor,
                  locatie: clasa.locatie,
                  zi: clasa.zi,
                },
              },
            },
          );
          res.status(200).json({ message: "signedUpForClass" });
        } else if (clasa.inscrisi.length === clasa.capacitate) {
          res.json({ message: "classFull" });
        }
      } else {
        res.json({ message: "alreadyEnrolled" });
      }
    }
  } else {
    res.json({ message: 'noAerobicSubscription' });
  }
});

// Sign out from classes

router.put("/renuntaLaClasa", protect, async (req, res) => {
  let user = await User.findOne({ _id: req.user.userId });
  let clasa = await Orar.findOne({ _id: req.body._id });

  try {
    await User.updateOne(
      { _id: req.user.userId },
      { $pull: { activeClasses: { classId: req.body._id } } },
    );
    await Orar.updateOne(
      { _id: req.body._id },
      { $pull: { inscrisi: { idClient: req.user.userId } } },
    );
  res.status(200).json({message: 'Utilizatorul a renuntat cu succes la clasa'});
  } catch (err) {
    res.json("error happened");
  }
});

// Adding trainers

router.post('/antrenor', admin, async (req, res) => {

  try {
    let result = await Antrenor.create({
      numeAntrenor: req.body.numeAntrenor
    })
    res.status(201).json('antrenorAdaugat')
  } catch (err) {
    res.status(409).json('failed')
  }
});

// Deleting trainers

router.delete('/antrenor', admin, async (req, res) => {
  let antrenor = await Antrenor.findOne({ _id: req.body._id });
  try {
    await Antrenor.deleteOne({ _id: req.body._id });
    res.status(204).json(`Antrenorul cu numele: ${antrenor.numeAntrenor} a fost șters`);
  } catch (err) {
    res.status(500).json('A intervenit o eroare');
  }
})

// Adding classes (admin panel)

router.post('/clasa', admin, upload.single('imagine'), async (req, res) => {
  try {
    await Clasa.create({
      nume: req.body.nume,
      descriere: req.body.descriere || '',
      imagine: req.file.path || ''
    })
    res.status(201).json('Clasa adaugata')
  } catch (err) {
    res.status(409).json('failed')
  }
});

// Updating classes

router.put('/clasa', admin, upload.single('imagine'), async (req, res) => {
  let data = {
    id: req.body.id,
    nume: req.body.nume,
    descriere: req.body.descriere,
    imagine: req.file?.path || req.body.imagine
  }
  try {
    await Clasa.updateOne({ _id: data.id }, { $set: data });
    res.status(201).json({ message: 'Clasa a fost updatata' })
  } catch (err) {
    res.json({ message: 'O eroare a aparut' });
  }
});

// Deleting classes 

router.delete('/clasa', admin, async (req, res) => {
  let clasa = await Clasa.findOne({ _id: req.body._id })
  try {
    await Clasa.deleteOne({ _id: req.body._id });
    res.status(204).json(`Antrenorul cu numele: ${clasa.nume} a fost șters`);
  } catch (err) {
    res.status(500).json('A intervenit o eroare');
  }
})

router.get('/getSelectors', async (req, res) => {
  let antrenor = await Antrenor.find({});
  let clasa = await Clasa.find({});
  res.status(200).json({ antrenori: antrenor, clase: clasa });
})

router.post('/extindeOrarul', admin, async (req, res) => {
  let newDates = [];
  for (let data of req.body) {
    newDates.push(new Date(new Date(data).setDate(new Date(data).getDate() + 7)));
  }
  let classes = await Orar.find({ data: { $in: req.body } });
  let checkEmpty = await Orar.find({ data: { $in: newDates } })
  if (checkEmpty.length === 0) {
    for (let clasa of classes) {
      try{
        await Orar.create({
          locatie: clasa.locatie,
          zi: clasa.zi,
          data: new Date(new Date(clasa.data).setDate(new Date(clasa.data).getDate() + 7)),
          denumire: clasa.denumire,
          antrenor: clasa.antrenor,
          capacitate: clasa.capacitate,
          expiryDate: new Date(new Date(clasa.expiryDate).setDate(new Date(clasa.expiryDate).getDate() + 7))
        })
      } catch(err) {
      }
    }
    res.status(201).json({ message: 'orarul a fost extins/timetable has been extended' });
  } else {
    res.status(409).json({message: 'Clase deja exista in aceasta perioada/Classes already exist in this timestamp'})
  }
});


// Cron jobs

cron.schedule('0 0 * * *', async () => {
  await User.updateMany(
    {},
    { $pull: { activeClasses: { date: { $lt: new Date() } } } }
  );
});

export default router;
