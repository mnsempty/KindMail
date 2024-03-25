const express = require("express");
require("dotenv").config();
const cors = require("cors");
console.log("------KindMail------");

const { Server } = require("socket.io");
const { createServer }  = require("node:http");

//import js con socket parte backend
const setupSocket = require('./serverSocket');

const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chats');

const port = process.env.PORT || 5000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    // todo with .env
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
// link a la parte de los sockets
setupSocket(io);
app.use(
  cors({
    // todo with .env
    origin: "http://localhost:3000",
  })
);

app.use('/api/user', userRoutes);
app.use('/api/chats', chatRoutes);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
