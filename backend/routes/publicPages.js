import express from 'express';
import mongoose from 'mongoose';
import { admin } from './auth.js';
import AntrenorSala from '../schemas/publicSchemas/anternoriSali.js';
import PaginaSala from '../schemas/publicSchemas/paginaSala.js';
import Review from '../schemas/publicSchemas/review.js';
import nodemailer from 'nodemailer';

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router()

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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "burnclujfake@gmail.com",
    pass: process.env.MAIL_PASS,
  },
});


router.post('/antrenori/adaugaAntrenor', admin, upload.single('pozaProfil'), async (req, res) => {
    try {
        await AntrenorSala.create({
            nume: req.body.nume,
            sali: JSON.parse(req.body.sali),
            functii: JSON.parse(req.body.functii),
            calificari: JSON.parse(req.body.calificari),
            descriere: req.body.descriere,
            pozaProfil: req.file.path,
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
        updateData.pozaProfil = req.file.path
    }
    
    try{
        await AntrenorSala.updateOne({_id: req.body.id}, {$set: updateData})
        console.log(`Antrenor with name: ${req.body.nume} was updated`)
        res.status(200).json('Update worked');
    } catch(err) {
        res.status(err.response.status).json(`Failed with status: ${err.response.status}`)
    }
})

router.put('/paginaSala', admin, async (req, res) => {
    await PaginaSala.updateOne({
        sala: req.query.locatie
    }, {$set: req.body})
    res.json({message: 'Pagina a fost actualizată'});
})

router.post('/paginaSala/create', admin, async (req, res) => {
    await PaginaSala.create({
        sala: req.body.sala
    });
    console.log('creat');
    res.json({message: 'Pagina a fost actualizată'});
})

router.get('/paginaSala', async (req, res) => {
    let datePagina = await PaginaSala.findOne({sala: req.query.locatie})
    res.json(datePagina);
})

// Reviews
router.post('/reviews', admin, async (req, res) => {
    console.log(req.body);
    await Review.create({
        sala: req.body.sala,
        nume: req.body.nume,
        comentariu: req.body.comentariu,
        stele: +req.body.nrStele,
    })
    console.log(req.body);
    res.status(201).json({message: 'Review adaugat'})
});

router.get(`/reviews`, async (req, res) => {
    let reviews = await Review.find()
    res.json(reviews);
})


// contact form

router.post('/contact', async (req, res) => {
    try{
        await transporter.sendMail({
            from: 'burnclujfake@gmail.com',
            to: 'burnclujfake@gmail.com',
            replyTo: req.body.email,
            subject: `Mesaj de la: ${req.body.nume} [${req.body.telefon}]`,
            text: req.body.mesaj,
        })
        console.log(`Email primit de la ${req.body.email}`)
        res.status(200).json('Emailul a fost trimis!');
    } catch(err){
        if(err.status){
            res.status(err.status.code).json({message: 'A intervenit o eroare'});
        } else {
            res.json('Error');
        }
    }
})

export default router; 