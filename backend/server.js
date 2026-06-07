import dotenv from "dotenv";
dotenv.config();
import express from "express";
import createServer from "express";
import mongoose from "mongoose";

const server = createServer();
let port = process.env.PORT;
mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server up and running on ${port}`);
    });
    console.log("Burn Fitness Cluj DB Connected successfuly");
  })
  .catch((err) => console.log(err));

server.get("/index", (req, res) => {
  console.log(req);
  res.send("test");
});
