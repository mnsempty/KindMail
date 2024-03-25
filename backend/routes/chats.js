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
      return res
        .status(400)
        .json({ message: "user1_ID y user2_ID son obligatorios" });
    }

    // Crear la sala de chat
    const chatData = { user1_ID, user2_ID };
    await chatController.addChatToList(chatData); // Llamar a la función para agregar chat a la lista

    res.status(201).json({ message: "Chat creado correctamente" });
  } catch (error) {
    console.error("Error al crear chat:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Ruta para coger los chats de un usuario en la pagina home.
router.post("/", async (req, res) => {
  try {
    const { user_ID } = req.body;

    const userChats = await chatController.getUserChats(user_ID);

    res.status(200).json({ userChats });
  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.log("Error al traer los chats del usuario:", err);
  }
});

// Ruta para abrir un chat en especifico y devolver mensajes, avatares e id de los users.
router.post("/openChat", async (req, res) => {
  try {
    const { chat_ID } = req.body;

    const messagesFromChat = await chatController.getMessagesFromChat(chat_ID);

    res.status(200).json({ messagesFromChat });
  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.log("Error al traer el chat del usuario:", err);
  }
});

// Ruta para enviar mensajes.
router.post("/sendMessage", async (req, res) => {
  try {
    const { sender, receiver, content,chat_ID } = req.body;

    const messageData = { sender, receiver, content,chat_ID };
    await chatController.sendMessage(messageData); // Guardar el mensaje en la bbdd.

    res.status(201).json({ message: "Mensaje enviado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.log("Error al enviar mensaje:", err);
  }
});

module.exports = router;
