const express = require("express");
const router = express.Router();


const userController = require("../controllers/UserController");
const chatController = require("../controllers/ChatController");

router.use(express.json());

// ----- Rutas de usuario ------

// Ruta para crear un usuario
router.post("/user", userController.createUser);
// Ruta para eliminar un usuario
router.delete("/user", userController.deleteUser);
// Ruta login
router.post("/user/login", userController.login);
// Ruta logout
router.post("/user/logout", userController.logout)
// Ruta cambiar a ocupado
router.put("/user/set-busy", userController.setBusy)

// ------ Rutas de chats ------

// Ruta para crear un chat
router.post("/chats/create", chatController.create);
// Ruta para traer los chats del user
router.post("/chats", chatController.getChatsFromUser);
// Ruta para abrir una sala de chat
router.post("/chats/openChat", chatController.openChat);
// Ruta para enviar mensajes
router.post("/chats/sendMessage", chatController.sendMessage);

module.exports = router;