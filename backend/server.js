const express = require("express");
require("dotenv").config();
const cors = require("cors");

// Para subir imagenes
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Nombre único del archivo
  },
});
const upload = multer({ storage: storage });

console.log("------KindMail------");

const { Server } = require("socket.io");
const { createServer } = require("node:http");

//import js con socket parte backend
const setupSocket = require("./serverSocket");

const web = require("./routes/web");


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

app.use("/api", web);

app.use('/uploads', express.static('uploads'));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
