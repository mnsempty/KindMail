import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { Redis } from "ioredis";

import { Server } from "socket.io";
import { createServer } from "node:http";

dotenv.config();//* note dotenv.config({ path: '/ruta/absoluta/a/tu/.env' }); en caso de que tengamos un .env general


const port = process.env.PORT ?? 5000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    //todo with .env
     origin: 'http://localhost:3000',
     methods: ["GET", "POST"],
     allowedHeaders: ["my-custom-header"],
     credentials: true
  }
 });

app.use(cors({
  //todo with .env
  origin: 'http://localhost:3000'
 })); 

// const db = new Redis({
//   password: process.env.TOKEN,
//   host: process.env.HOST,
//   port: process.env.DBPORT,
// });

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});