import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRoutes from './routes/users.js';
import cors from 'cors'
import cookieParser from "cookie-parser";


const server = express();
let port = process.env.PORT;
server.use(cors({ origin: 'http://localhost:5173', credentials: true }))

server.use(express.json())
server.use(cookieParser())


server.listen(port, () => {
      console.log(`Server up and running on ${port}`);
    });

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("Burn Fitness Cluj DB Connected successfuly");
  })
  .catch((err) => console.log(err));

server.use('/api/users', userRoutes);