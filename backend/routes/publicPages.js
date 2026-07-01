import express from 'express';
import mongoose from 'mongoose';
import { admin } from './auth.js';
import AntrenorSala from '../schemas/publicSchemas/anternoriSali.js';
import multer from 'multer';
const router = express.Router()

const UPLOAD_PATH = process.env.FOLDER_UPLOADS;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname  === 'pozaProfil'){
            cb(null, `${UPLOAD_PATH}/POZEPROFIL/ANTRENORI`);
        }
    },
    filename: (req, file, cb) => {
        const parts = file.originalname.split('.');
        const ext = parts[parts.length - 1];
        cb(null, req.body.nume + '_' + file.fieldname  + '.' + ext);
    }
})

const upload = multer({storage});


router.post('/antrenori/adaugaAntrenor', admin, upload.single('pozaProfil'), async (req, res) => {
    try {
        await AntrenorSala.create({
            nume: req.body.nume,
            sali: JSON.parse(req.body.sali),
            functii: JSON.parse(req.body.functii),
            calificari: JSON.parse(req.body.calificari),
            descriere: req.body.descriere,
            pozaProfil: req.file.filename,
        }) 
        console.log(`Trainer with name: ${req.body.nume} was created.`);
        res.status(201).json(`Trainer with name: ${req.body.nume} was created.`);
    } catch(err) {
        console.log(err)
        console.log(`Trainer with name ${req.body.nume} already exists`);
        res.status(409).json(`Failed with status: 409`)
    }
})

router.get('/antrenori', async (req, res) => {
    try{
        let data = await AntrenorSala.find();
        res.status(200).json(data);
    } catch(err) {
        res.status(err.response.status).json(`Failed with status: ${err.response.status}`)
    }
})

router.put('/antrenori/updateAntrenor', admin, upload.single('pozaProfil'), async (req, res) => {
    let updateData = {
        nume: req.body.nume,
            functii: JSON.parse(req.body.functii),
            calificari: JSON.parse(req.body.calificari),
            descriere: req.body.descriere,
    }
    if(req.file !== undefined){
        updateData.pozaProfil = req.file.filename
    }
    
    try{
        await AntrenorSala.updateOne({_id: req.body.id}, {$set: updateData})
        console.log(`Antrenor with name: ${req.body.nume} was updated`)
        res.status(200).json('Update worked');
    } catch(err) {
        res.status(err.response.status).json(`Failed with status: ${err.response.status}`)
    }
})

export default router; 