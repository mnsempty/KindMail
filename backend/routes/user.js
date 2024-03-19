const express = require("express");
const router = express.Router();
const  {createClient}  = require("redis");
// Token de seguridad.
const jwt = require('jsonwebtoken');

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

// Ruta para crear un usuario
router.post("/", async (req, res) => {
  try {
    const { name,surname, email,birthday,role, password } = req.body;
    // Verificar si el usuario existe antes de crearlo
    const existingUser = await client.hGet("users", email);
    if (existingUser) {
      return res.status(404).json({ message: "Usuario ya existente" });
    }

    // Almacenar el nuevo usuario en Redis Cloud
    await client.hSet(
      "users",
      email,
      JSON.stringify({name,surname, email,birthday,role, password })
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

    // Verificar si el usuario existe antes de eliminarlo
    const existingUser = await client.hGet("users", email);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Eliminar el usuario de la base de datos
    await client.hDel("users", email);

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Ruta login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe en la base de datos
    const existingUser = await client.hGet('users', email);
    if (!existingUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Convertir a objeto
    const user = JSON.parse(existingUser);

    // Verificar si la contraseña coincide
    if (user.password !== password) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Si las credenciales son correctas, devolver los datos del usuario.
    // Se envia en forma de token que tendra que ser descifrado con
    // payload = jwt.decode(token);
    // En payload estan los datos del usuario de esta forma
    // const { email, nombre, rol } = payload;
    const token = jwt.sign({ email });
    res.status(200).json({token});
  } catch (error) {
    console.error('Error en inicio de sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


module.exports = router;