import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRoutes from './routes/users.js';
import classesRoutes from './routes/classes.js';
import abonamenteRoutes from './routes/subscriptions.js';
import publicRoutes from './routes/publicPages.js';
import payments from './routes/payments.js';
import cors from 'cors'
import cookieParser from "cookie-parser";


const server = express();
let port = process.env.PORT;
let localDevArr = ['http://localhost:5173', 'http://192.168.0.220:5173', 'http://192.168.0.220:3000'];
const prodOrigin = 'https://burn-fitness-revamp.vercel.app';
server.use(cors({
  origin: process.env.NODE_ENV === "production" ? prodOrigin : localDevArr,
  credentials: true
}))

server.use(cookieParser())
server.use('/api/payments', payments);
server.use(express.json())
server.use('/api/uploads', express.static('./uploads'));

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("Burn Fitness Cluj DB Connected successfuly");
  })
  .catch((err) => console.log(err));

server.use('/api/users', userRoutes);
server.use('/api/classes', classesRoutes);
server.use('/api/abonamente', abonamenteRoutes);
server.use('/api/publicPages', publicRoutes);

server.listen(port, () => {
      console.log(`Server up and running on ${port}`);
    });

    // in case of nodemon problems run: taskkill /f /im node.exe