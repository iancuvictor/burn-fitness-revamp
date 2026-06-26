import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRoutes from './routes/users.js';
import classesRoutes from './routes/classes.js';
import abonamenteRoutes from './routes/subscriptions.js';
import cors from 'cors'
import cookieParser from "cookie-parser";


const server = express();
let port = process.env.PORT;
server.use(cors({ origin: ['http://localhost:5173', 'http://192.168.0.220:5173', 'http://192.168.0.220:3000'], credentials: true }))

server.use(express.json())
server.use(cookieParser())
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

server.listen(port, () => {
      console.log(`Server up and running on ${port}`);
    });

    // in case of nodemon problems run: taskkill /f /im node.exe