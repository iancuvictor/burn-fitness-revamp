import express from "express";
import Orar from "../schemas/orarClase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protect, admin } from "./auth.js";
const router = express.Router();

router.post("/orarClase", async (req, res) => {
  console.log(req.body);
  let checkAvailability = await Orar.findOne({
    zi: req.body.zi,
    locatie: req.body.locatie,
    ora: req.body.ora,
  });
  if (checkAvailability === null) {
    try {
      await Orar.create({
        locatie: req.body.locatie,
        zi: req.body.zi,
        ora: req.body.ora,
        denumire: req.body.denumire,
        antrenor: req.body.antrenor,
      });
      res.json("clasă adăugată la orar");
    } catch (err) {
      res.json("an error has occured");
      console.log("error adding class");
      console.log(err);
    }
  } else if (checkAvailability !== null) {
    res.json({ message: "classAlreadyExists" });
    console.log("class already exists");
  }
});

router.get("/orarClase", async (req, res) => {
  let dataClase = await Orar.find();
  res.json(dataClase);
});

export default router;
