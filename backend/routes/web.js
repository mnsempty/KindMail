const express = require("express");
const router = express.Router();


const userController = require("../controllers/UserController");
const chatController = require("../controllers/ChatController");

router.use(express.json());

// ----- Rutas de usuario ------

// Ruta para crear un usuario
// router.post("/user", upload.single('image'), userController.createUser);
router.post("/create_user", userController.createUser);
// Ruta para eliminar un usuario
router.delete("/user/:email", userController.deleteUser);
// Ruta recoger todos los datos de todos los usuarios para busqueda
router.get("/users", userController.searchUsers);
// Ruta recoger todos los datos de todos los usuarios
router.get("/user/get-users", userController.getAllUsers);
// Ruta login
router.post("/user/login", userController.login);
// Ruta logout
router.post("/user/logout", userController.logout)
// Ruta cambiar a ocupado
router.put("/user/set-busy", userController.setBusy)
// Ruta cambiar a online
router.put("/user/set-online", userController.setOnline)
// Cantidad de usuarios (landing page)
router.get("/user/quantity", userController.quantity);
// Ruta para cambiar datos del perfil
router.post("/user/profile", userController.profile);
// Ruta para cambiar la imagen del perfil
router.post("/user/profile/image", userController.profilePhoto);

// ------ Rutas de chats ------

// Ruta para crear un chat
router.post("/chats/create", chatController.create);
// Ruta para traer los chats del user
router.post("/chats", chatController.getChatsFromUser);
// Ruta para abrir una sala de chat
router.post("/chats/openChat", chatController.openChat);
//ruta para comprobar un chat/crear un email(Research users)
router.post("/chats/openChatOrEmail",chatController.openChatOrEmail)
// Ruta para enviar mensajes
router.post("/chats/sendMessage", chatController.sendMessage);
// Cantidad de chats (landing page)
router.get("/chats/quantity", chatController.quantity);
// Ruta denunciar
router.post("/user/report", chatController.reportUsers);
// Ruta traer cantidad denuncias por usuario
router.get("/user/get-reports", chatController.getReports);
// Ruta para enviar el email
router.post("/chats/email",chatController.sendEmail);

module.exports = router;