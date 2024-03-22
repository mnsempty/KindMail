const express = require("express");
const router = express.Router();
require("dotenv").config();
const client = require("../Database/RedisClient");

const chatController = require("../controllers/ChatController");

router.use(express.json());

// Ruta para crear un chat entre 2 users.
router.post("/create", async (req, res) => {
  try {
    const { user1_ID, user2_ID } = req.body;

    // Verificar si los usuarios ya están en una sala de chat juntos
    const existingChatID = await chatController.findChatByUserIDs(
      user1_ID,
      user2_ID
    );
    if (existingChatID) {
      return res
        .status(400)
        .json({ message: "Los usuarios ya están en una sala de chat juntos" });
    }

    

    if (!user1_ID || !user2_ID) {
      return res.status(400).json({ message: "user1_ID y user2_ID son obligatorios" });
    }

    // Crear la sala de chat
    const chatData = { user1_ID, user2_ID }; // Agregar chat_ID al objeto de chat
    await chatController.addChatToList(chatData); // Llamar a la función para agregar chat a la lista

    console.log("funciona back");
    res.status(201).json({ message: "Chat creado correctamente" });
  } catch (error) {
    console.error("Error al crear chat:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Ruta para coger los chats de un usuario en la pagina home.
router.get("/", async (req, res) => {});

// Ruta para abrir un chat en especifico y devolver mensajes, avatares e id de los users.
router.post("/openChat", async (req, res) => {});

module.exports = router;
