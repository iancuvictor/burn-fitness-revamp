import dotenv from "dotenv";
dotenv.config();
import express from "express";
import createServer from "express";
import mongoose from "mongoose";
import userRoutes from './routes/users.js';

const server = createServer();
let port = process.env.PORT;

server.use(express.json())

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