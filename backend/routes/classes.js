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

import multer from 'multer';
const CLASE_UPLOAD_PATH = process.env.FOLDER_UPLOADS_CLASE;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, CLASE_UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    const parts = file.originalname.split('.');
    const ext = parts[parts.length - 1];
    cb(null, req.body.nume + '_pozaClasa.' + ext);
  }
})

const upload = multer({ storage });

router.post("/orarClase", admin, async (req, res) => {
  let checkAvailability = null;
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
      res.json("clasă adăugată la orar");
    } catch (err) {
      res.status(400).json({ message: "errorAddingClass" });
      console.log("error adding class");
      console.log(err);
    }
  } else if (checkAvailability !== null) {
    res.json({ message: "classAlreadyExists" });
    console.log("class already exists");
  }
});

router.get("/orarClase", async (req, res) => {
  let dataClase;
  if (req.query.locatie !== undefined) {
    dataClase = await Orar.find({ locatie: req.query.locatie });
  } else if (req.query.clasa) {
    dataClase = await Orar.find({ denumire: req.query.clasa });
  }
  res.json(dataClase);
});

router.delete("/orarClase", admin, async (req, res) => {
  try {
    await Orar.deleteOne({
      _id: req.body._id
    });
    console.log(`Class deleted: ${req.body.locatie}`);
    res.json({ message: `Class deleted ${req.body.locatie}` });
  } catch (err) {
    console.log(err);
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
          console.log("class added");
          res.json({ message: "signedUpForClass" });
        } else if (clasa.inscrisi.length === clasa.capacitate) {
          console.log("class FULL");
          res.json({ message: "classFull" });
        }
      } else {
        console.log("deja inscris");
        res.json({ message: "alreadyEnrolled" });
      }
    }
  } else {
    console.log('Nu are aerobic');
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
    console.log("removed it");
  } catch (err) {
    console.log(err);
    res.json("error happened");
  }
});

// Adding trainers

router.post('/antrenor', admin, async (req, res) => {

  try {
    let result = await Antrenor.create({
      numeAntrenor: req.body.numeAntrenor
    })
    console.log(result);
    res.status(201).json('antrenorAdaugat')
    console.log(`Antrenor adăugat: ${req.body.numeAntrenor}`);
  } catch (err) {
    console.log(err);
    res.status(409).json('failed')
  }
});

// Deleting trainers

router.delete('/antrenor', admin, async (req, res) => {
  let antrenor = await Antrenor.findOne({ _id: req.body._id });
  try {
    await Antrenor.deleteOne({ _id: req.body._id });
    console.log(`Antrenorul cu numele: ${antrenor.numeAntrenor} a fost șters`)
    res.status(204).json(`Antrenorul cu numele: ${antrenor.numeAntrenor} a fost șters`);
  } catch (err) {
    console.log(err);
    res.status(500).json('A intervenit o eroare');
  }
})

// Adding classes (admin panel)

router.post('/clasa', admin, upload.single('imagine'), async (req, res) => {
  console.log(req.file);
  try {
    await Clasa.create({
      nume: req.body.nume,
      descriere: req.body.descriere || '',
      imagine: req.file.filename || ''
    })
    console.log(`Clasă adăugată: ${req.body.nume}`);
    res.status(201).json('Clasa adaugata')
  } catch (err) {
    console.log(err);
    res.status(409).json('failed')
  }
});

// Updating classes

router.put('/clasa', admin, upload.single('imagine'), async (req, res) => {
  let data = {
    id: req.body.id,
    nume: req.body.nume,
    descriere: req.body.descriere,
    imagine: req.file?.filename || req.body.imagine
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
  let clasa = await Clasa.find({ _id: req.body._id })
  try {
    await Clasa.deleteOne({ _id: req.body._id });
    console.log(`Clasa cu numele: ${clasa.nume} a fost ștearsă`)
    res.status(204).json(`Antrenorul cu numele: ${clasa.nume} a fost șters`);
  } catch (err) {
    console.log(err);
    res.status(500).json('A intervenit o eroare');
  }
})

router.get('/getSelectors', async (req, res) => {
  let antrenor = await Antrenor.find({});
  let clasa = await Clasa.find({});
  res.status(200).json({ antrenori: antrenor, clase: clasa });
})

router.post('/extindeOrarul', admin, async (req, res) => {
  console.log(req.body);
  let newDates = [];
  for (let data of req.body) {
    newDates.push(new Date(new Date(data).setDate(new Date(data).getDate() + 7)));
  }
  let classes = await Orar.find({ data: { $in: req.body } });
  console.log(classes);
  let checkEmpty = await Orar.find({ data: { $in: newDates } })
  // console.log(checkEmpty);
  if (checkEmpty.length === 0) {
    for (let clasa of classes) {
      try{
        console.log('created instance');
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
        console.log(err);
      }
    }
    console.log('Orar extins');
    res.status(201).json({ message: 'orarul a fost extins/timetable has been extended' });
  } else {
    console.log(`Clase deja exista in aceasta perioada/Classes already exist in this timestamp`)
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
