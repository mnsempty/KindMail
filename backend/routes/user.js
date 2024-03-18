const express = require("express");
const router = express.Router();
const { createClient } = require("redis");

const client = createClient({
  password: "admin",
  socket: {
    host: "redis-19192.c322.us-east-1-2.ec2.cloud.redislabs.com",
    port: 19192,
  },
});

client.on("error", (error) => {
  console.error("Error en el cliente Redis:", error);
});

async function connectDB() {
  await client.connect();
}
connectDB();

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // // Verificar si el usuario existe antes de crearlo
    // const existingUser = await client.hGet("users", email);
    // if (!existingUser) {
    //   return res.status(404).json({ message: "Usuario no encontrado" });
    // }

    // Almacenar el nuevo usuario en Redis Cloud
    await client.hSet(
      "users",
      email,
      JSON.stringify({ username, email, password })
    );

    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Ruta para eliminar un usuario
router.delete("/", async (req, res) => {
  try {
    const { email } = req.body;

    // // Verificar si el usuario existe antes de eliminarlo
    // const existingUser = await client.hGet("users", email);
    // if (!existingUser) {
    //   return res.status(404).json({ message: "Usuario no encontrado" });
    // }

    // Eliminar el usuario de la base de datos
    await client.hDel("users", email);

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
