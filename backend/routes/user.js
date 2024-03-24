const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../Database/RedisClient");
const userController = require("../controllers/UserController");
router.use(express.json());
// Ruta para crear un usuario
router.post("/", async (req, res) => {
  try {
    const { name, surname, email, birthday, role, password } = req.body; // Verificar si el usuario existe antes de crearlo
    const existingUser = await userController.findUser(email);
    if (existingUser) {
      return res.status(404).json({ message: "Usuario ya existente" });
    }
    const userData = { name, surname, email, birthday, role, password };
    userController.saveUser(userData);
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}); // Ruta para eliminar un usuario
router.delete("/", async (req, res) => {
  try {
    const { email } = req.body;
    // Verificar si el usuario existe antes de eliminarlo
    const existingUser = await userController.findUser(email);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } // Eliminar el usuario de la base de datos
    userController.delUser(email);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}); // Ruta login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body; // Verificar si el usuario existe en la base de datos
    const existingUser = await userController.findUser(email);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } //Comparar contraseñas
    const passwordMatch = await bcrypt.compare(
      password,
      existingUser.hashedPassword
    );
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Usuario no encontrado o credenciales incorrectas" });
    } // datos del user menos la contraseña hasheada
    //! alvaro descomenta cuando metas el id-photo al crear user
    let userData = {
      // id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      // photo: existingUser.photo
    };
    // Si las credenciales son correctas, devolver los datos del usuario.
    // Se envia en forma de token que tendra que ser descifrado con
    // payload = jwt.decode(token);
    // En payload estan los datos del usuario de esta forma
    // const { email, nombre, rol } = payload;console.log(userData);
    const token = jwt.sign({ userData }, "admin "); //! esto se tiene que sacar de .env y ser algo así jajnswefasd.BDSA153fmeskmfsjnlngrsnrgo123.1ia
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}); // Ruta logout
router.post("/logout", async (req, res) => {
  try {
    // Limpiar el token de autenticación del cliente
    res.clearCookie("jwt");
    res.status(200).json({ message: "Sesión cerrada" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});
module.exports = router;
