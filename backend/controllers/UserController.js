const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const client = require("../Database/RedisClient");

async function createUser(req, res) {
  try {
    const { name, surname, email, birthday, role, password, state } = req.body; // Verificar si el usuario existe antes de crearlo
    const existingUser = await findUser(email);
    if (existingUser) {
      return res.status(404).json({ message: "Usuario ya existente" });
    }
    //no funca because mongoose
    const userData = new User({
      name,
      surname,
      email,
      birthday,
      role,
      password,
      state
    });

    await saveUser(userData);
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function deleteUser(req, res) {
  try {
    const { email } = req.body;
    // Verificar si el usuario existe antes de eliminarlo
    const existingUser = await findUser(email);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } // Eliminar el usuario de la base de datos
    await delUser(email);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}


async function login(req, res) {
  try {
    let { email, password } = req.body; // Verificar si el usuario existe en la base de datos
    const existingUser = await findUser(email);
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
      // surname: existingUser.surname,
      email: existingUser.email,
      // state: existingUser.state
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
}

async function logout(req, res) {
  try {
    // Limpiar el token de autenticación del cliente
    res.clearCookie("jwt");
    res.status(200).json({ message: "Sesión cerrada" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function findUser(email) {
  const userJson = await client.hGet("users", email); // Verificar si se encontró un usuario
  if (!userJson) {
    return null; // Devuelve null si no se encuentra el usuario
  }
  const user = JSON.parse(userJson);
  return user;
}


async function saveUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  // Almacenar el nuevo usuario en Redis Cloud
  await client.hSet(
    "users",
    userData.email,
    JSON.stringify({
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      role: userData.role,
      state: userData.state,
      birthday: userData.birthday,
      role: userData.role,
      hashedPassword: hashedPassword,
    })
  );

  return true;
}

async function delUser(email) {
  try {
    // Eliminar el usuario de la base de datos
    return await client.hDel("users", email);
  } catch (err) {
    console.log("Error al eliminar el usuario:", err);
  }
}

async function setBusy(req, res) {
  try {
    const { busy } = req.body;
    const token = req.headers.authorization.split(" ")[1]; // Obtener el token JWT del encabezado de autorización
    const payload = jwt.decode(token); // Decodificar el token

    // Obtener el correo electrónico del usuario desde la información decodificada
    const email = payload.userData.email;

    // Obtener el usuario existente de Redis Cloud utilizando el correo electrónico
    const existingUserString = await client.hGet("users", email);
    const existingUser = JSON.parse(existingUserString);

    if (!existingUserString) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar el estado ocupado del usuario
    existingUser.state = busy;

    // Actualizar el usuario en Redis Cloud
    await client.hSet(
      "users",
      email,
      JSON.stringify(existingUser) // Convertir a JSON antes de almacenar en Redis
    );

    res.status(200).json({ message: "Estado del usuario actualizado correctamente", user: existingUser });
  } catch (error) {
    console.error("Error al actualizar el estado del usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}



module.exports = {
  createUser, deleteUser, login, logout, setBusy
};
