import express from "express";
import Abonament from "../schemas/abonament.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protect, admin } from "./auth.js";
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('get subscriptions')
    let data = await Abonament.find();
    res.json(data);
});

router.post('/adaugaAbonament', admin, async (req, res) => {
    try{
        await Abonament.create({
            tier: req.body.tier,
            titlu: req.body.titlu,
            desc: req.body.desc,
            preturi: req.body.preturi,
            imagine: req.body.imagine
        })
        res.json('test');
    } catch(err) {
        res.json('an error has occured');
        console.log(err);
    }
})

export default router;