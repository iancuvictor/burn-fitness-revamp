import express from "express";
import Abonament from "../schemas/abonament.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protect, admin } from "./auth.js";
const router = express.Router();

router.get('/', (req, res) => {
    console.log('get abonamente');
    res.json('get abonamente');
});

router.post('/adaugaAbonament', admin, (req, res) => {
    console.log(req);
    res.json('test');
})

export default router;