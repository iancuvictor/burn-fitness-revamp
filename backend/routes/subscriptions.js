import express from "express";
import Abonament from "../schemas/abonament.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protect, admin } from "./auth.js";
import multer from 'multer';

const UPLOAD_PATH = process.env.FOLDER_UPLOADS_ABONAMENTE;
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    const parts = file.originalname.split('.');
    const ext = parts[parts.length - 1];
    cb(null, Date.now() + '_abonament.' + ext);
  }
})

const upload = multer({ storage });

router.get('/', async (req, res) => {
    let data = await Abonament.find();
    res.json(data);
});

router.post('/adaugaAbonament', admin, async (req, res) => {
    try{
        await Abonament.create({
            highlighted: req.body.highlighted,
            reducereAplicabila: req.body.reducereAplicabila,
            tier: req.body.tier,
            titlu: req.body.titlu,
            desc: req.body.desc,
            preturi: req.body.preturi,
        })
        res.json('test');
    } catch(err) {
        res.json('an error has occured');
        console.log(err);
    }
})

router.put('/updateAbonament', admin, async (req, res) => {
    await Abonament.updateOne({_id: req.body._id}, { $set: req.body });
    res.json('Abonament actualizat');
})

router.delete('/stergeAbonament', admin, async (req, res) => {
    await Abonament.deleteOne({ _id: req.body._id});
    res.json('Abonament sters');
    console.log('abonament sters');
});

export default router;