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

// might add cron scheduler sometimes in the future

// cron.schedule('0 0 1 * * ', () => {
//   console.log('');
// });

router.post("/orarClase", admin, async (req, res) => {
  let checkAvailability = null;
  if (checkAvailability === null) {
    try {
      await Orar.create({
        locatie: req.body.locatie,
        zi: req.body.zi,
        ora: req.body.ora,
        data: req.body.data,
        denumire: req.body.denumire,
        antrenor: req.body.antrenor,
        capacitate: req.body.capacitate,
        expiryDate: new Date(new Date(req.body.data).getTime() + 7 * 24 * 60 * 60 * 1000)
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
  let dataClase = await Orar.find({ locatie: req.query.locatie });
  res.json(dataClase);
});

router.delete("/orarClase", admin, async (req, res) => {
  try {
    await Orar.deleteOne({
      locatie: req.body.locatie,
      zi: req.body.zi,
      ora: req.body.ora,
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
                  date: clasa.data.toLocaleDateString(),
                  antrenor: clasa.antrenor,
                  locatie: clasa.locatie,
                  zi: clasa.zi,
                  ora: clasa.ora,
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
    res.json({message: 'noAerobicSubscription'});
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
    res.json("test");
    console.log("removed it");
  } catch (err) {
    console.log(err);
    res.json("error happened");
  }
});

// Adding trainers

router.post('/antrenor', admin, async (req, res) => {

  try{
    let result = await Antrenor.create({
      numeAntrenor: req.body.numeAntrenor
    })
    console.log(result);
    res.status(201).json('antrenorAdaugat')
    console.log(`Antrenor adăugat: ${req.body.numeAntrenor}`);
  } catch(err) {
    console.log(err);
    res.status(409).json('failed')
  }
});

// Adding classes (admin panel)

router.post('/clasa', admin, async (req, res) => {

  try{
    let result = await Clasa.create({
      numeClasa: req.body.numeClasa
    })
    console.log(result);
    res.status(201).json('clasaAdaugata')
    console.log(`Clasă adăugată: ${req.body.numeAntrenor}`);
  } catch(err) {
    console.log(err);
    res.status(409).json('failed')
  }
});

router.get('/getSelectors', async (req, res) => {
  let antrenor = await Antrenor.find({});
  let clasa = await Clasa.find({});
  res.status(200).json({antrenori: antrenor, clase: clasa});
})

router.post('/extindeOrarul', admin, async (req, res) => {
  // console.log(req.body);
  let classes = await Orar.find({data: {$in: req.body}})
  for(let clasa of classes){
    await Orar.create({
      locatie: clasa.locatie,
      zi: clasa.zi,
      ora: clasa.ora,
      data: new Date(new Date(clasa.data).setDate(new Date(clasa.data).getDate() + 7)),
      denumire: clasa.denumire,
      antrenor: clasa.antrenor,
      capacitate: clasa.capacitate,
      expiryDate: new Date(new Date(clasa.expiryDate).setDate(new Date(clasa.expiryDate).getDate() + 7))
    })
  }
  res.status(201).json({message: 'orarul a fost extins/timetable has been extended'});
});
export default router;
