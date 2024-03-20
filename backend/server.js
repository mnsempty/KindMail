const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { Server } = require("socket.io");
const { createServer } = require("http");

const userRoutes = require('./routes/user');

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

app.use(
  cors({
    // todo with .env
    origin: "http://localhost:3000",
  })
);



app.use('/api/user', userRoutes);



server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
