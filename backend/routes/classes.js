import express from "express";
import Orar from "../schemas/orarClase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protect, admin } from "./auth.js";
const router = express.Router();

router.post("/orarClase", async (req, res) => {
    let checkAvailability = null
  if (checkAvailability === null) {
    try {
      await Orar.create({
        locatie: req.body.locatie,
        zi: req.body.zi,
        ora: req.body.ora,
        denumire: req.body.denumire,
        antrenor: req.body.antrenor,
        capacitate: req.body.capacitate
      });
      res.json("clasă adăugată la orar");
    } catch (err) {
      res.status(400).json({message: "errorAddingClass"});
      console.log("error adding class");
      console.log(err);
    }
  } else if (checkAvailability !== null) {
    res.json({ message: "classAlreadyExists" });
    console.log("class already exists");
  }
});

router.get("/orarClase", async (req, res) => {
  let dataClase = await Orar.find({locatie: req.query.locatie});

  console.log(dataClase);
  res.json(dataClase);
});

router.delete('/orarClase', admin, async (req, res) => {
    try {
        await Orar.deleteOne({locatie: req.body.locatie, zi: req.body.zi, ora: req.body.ora });
        console.log(`Class deleted: ${req.body.locatie}`)
        res.json({message:`Class deleted ${req.body.locatie}`})
    } catch(err) {
        console.log(err);
        res.json({message:`An error has occured`})
    }
})

export default router;
