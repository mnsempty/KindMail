const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../Database/RedisClient");
const upload = require("../upload");
const multer = require("multer");
// #region createUser
async function createUser(req, res) {
  try {
    const { name, surname, email, birthday, role, password, state } = req.body; // Verificar si el usuario existe antes de crearlo
    const existingUser = await findUser(email);
    if (existingUser) {
      return res.status(404).json({ message: "Usuario ya existente" });
    }

    //Imagen
    // const image = req.file;

    // Establecer valores predeterminados
    const userRole = role || "user";
    const userState = state || "online";

    function validateName(name) {
      const regex = /^[a-zA-Z\s]+$/;
      return regex.test(name);
    }

    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    function validatePassword(password) {
      return password.length >= 8;
    }

    // Realizar las validaciones
    if (!validateName(name)) {
      return res.status(400).json({ message: "Nombre inválido" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Correo electrónico inválido" });
    }
    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ message: "La contraseña debe tener al menos 8 caracteres" });
    }

    const userData2 = {
      name,
      surname,
      email,
      birthday,
      role: userRole,
      password,
      state: userState,
      // image: req.file ? req.file.filename : undefined
    };
    await saveUser(userData2);
    //overwrite de userData para no pasar password
    let userData = {
      name: userData2.name,
      role: userData2.role,
      email: userData2.email,
      state: userData2.state,
    };
    // console.log("back user data"+JSON.stringify(userData));
    // const token = jwt.sign({ userDataFiltered }, "admin "); //! esto se tiene que sacar de .env y ser algo así jajnswefasd.BDSA153fmeskmfsjnlngrsnrgo123.1ia
    // res.status(200).json({ token });
    const token = jwt.sign({ userData }, "admin ");
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

// #region deleteUser
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
// #region delUser
async function delUser(email) {
  try {
    // Eliminar el usuario de la base de datos 
    return await client.hDel("users", email);
  } catch (err) {
    console.log("Error al eliminar el usuario:", err);
  }
}

// #region login
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
    // console.log(passwordMatch);
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
      role: existingUser.role,
      email: existingUser.email,
      state: existingUser.state,
      profilePhoto: existingUser.profilePhoto,
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
  // console.log(userJson)
  if (!userJson) {
    return null; // Devuelve null si no se encuentra el usuario
  }
  const user = JSON.parse(userJson);
  return user;
}

// #region saveUser
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

// #region setBusy
async function setBusy(req, res) {
  try {
    const { busy } = req.body;
    const token = req.headers.authorization.split(" ")[1]; // Obtener el token JWT del encabezado de autorización
    const payload = jwt.decode(token); // Decodificar el token

    const email = payload.userData.email;
    const existingUserString = await client.hGet("users", email);
    const existingUser = JSON.parse(existingUserString);
    if (!existingUserString) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar el estado ocupado del usuario
    existingUser.state = busy;

    // Actualizar el usuario en Redis Cloud
    await client.hSet("users", email, JSON.stringify(existingUser));

    res.status(200).json({
      message: "Estado del usuario actualizado correctamente",
      user: existingUser,
    });
  } catch (error) {
    console.error("Error al actualizar el estado del usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
// #region setOnline
async function setOnline(req, res) {
  try {
    const { online } = req.body;
    const token = req.headers.authorization.split(" ")[1]; // Obtener el token JWT del encabezado de autorización
    const payload = jwt.decode(token); // Decodificar el token

    const email = payload.userData.email;
    const existingUserString = await client.hGet("users", email);
    const existingUser = JSON.parse(existingUserString);
    if (!existingUserString) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar el estado ocupado del usuario
    existingUser.state = online;

    // Actualizar el usuario en Redis Cloud
    await client.hSet("users", email, JSON.stringify(existingUser));

    res.status(200).json({
      message: "Estado del usuario actualizado correctamente",
      user: existingUser,
    });
  } catch (error) {
    console.error("Error al actualizar el estado del usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
// #region getUsers
async function getUsers() {
  const userHashKey = "users";
  const userQuantity = await client.hLen(userHashKey);
  return userQuantity;
}
// #region quantity
async function quantity(req, res) {
  try {
    const userQuantity = await getUsers();
    // console.log("usuarios:", userQuantity);
    res.status(200).json({ userQuantity });
  } catch (error) {
    console.error("Error al obtener la cantidad de usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
// #region profile
async function profile(req, res) {
  try {
    const { userName, password, newPassword } = req.body;

    const auth = req.headers.authorization.split(" ")[1]; // Obtener el token JWT del encabezado de autorización
    const payload = jwt.decode(auth); // Decodificar el token

    // Obtener el correo electrónico del usuario desde la información decodificada
    const email = payload.userData.email;
    let userJSON = await client.hGet("users", email);

    if (!userJSON) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = JSON.parse(userJSON);
    // console.log(user);

    if (password && newPassword) {
      // console.log(user);

      const isMatch = await bcrypt.compare(newPassword, user.hashedPassword);

      if (isMatch) {
        return res.status(400).json({ message: "La contraseña es la misma" });
      }

      user.hashedPassword = await bcrypt.hash(newPassword, 10); // Actualiza la contraseña
    }

    // Actualizar el nombre de usuario si se proporcionó uno nuevo
    if (userName) {
      user.name = userName;
    }

    let userData = {
      // id: existingUser.id,
      name: user.name,
      // surname: existingUser.surname,
      email: user.email,
      state: user.state,
      profilePhoto: user.profilePhoto,
    };

    // Convertir el objeto del usuario a una cadena JSON para guardarlo en Redis
    const updatedUserJSON = JSON.stringify(user);

    // Guardar el usuario actualizado en Redis
    await client.hSet("users", email, updatedUserJSON);

    const token = jwt.sign({ userData }, "admin "); //! esto se tiene que sacar de .env y ser algo así jajnswefasd.BDSA153fmeskmfsjnlngrsnrgo123.1ia
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error al actualizar los datos del usuario", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
// #region profilePhoto
async function profilePhoto(req, res) {
  try {
    // Subir la imagen de perfil si se proporciona un archivo, misma clave que en cliente
    upload.single("profilePhoto")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ message: "Error interno del servidor al subir la imagen" });
      } else if (err) {
        console.error("Error al subir la imagen:", err);
        return res
          .status(500)
          .json({ message: "Error interno del servidor al subir la imagen" });
      }

      // Verificar si se proporcionó un archivo
      if (!req.file) {
        return res
          .status(400)
          .json({ message: "No se proporcionó ninguna imagen" });
      }

      const auth = req.headers.authorization.split(" ")[1]; // Obtener el token JWT del encabezado de autorización
      const payload = jwt.decode(auth); // Decodificar el token

      // Obtener el correo electrónico del usuario desde la información decodificada
      const email = payload.userData.email;

      // Insertar la ruta de la foto en el servidor al usuario
      const imagePath =
        "http://localhost:5000/" + req.file.path.replace(/\\/g, "/");
      const userJSON = await client.hGet("users", email);
      if (!userJSON) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      const user = JSON.parse(userJSON);
      user.profilePhoto = imagePath;

      let userData = {
        // id: existingUser.id,
        name: user.name,
        // surname: existingUser.surname,
        email: user.email,
        state: user.state,
        profilePhoto: user.profilePhoto,
      };

      await client.hSet("users", email, JSON.stringify(user));

      // Devolvemos el token con los datos del user
      const token = jwt.sign({ userData }, "admin "); //! esto se tiene que sacar de .env y ser algo así jajnswefasd.BDSA153fmeskmfsjnlngrsnrgo123.1ia
      res.status(200).json({ token });
    });
  } catch (error) {
    console.log("Error al cambiar la foto de perfil: ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

// #region searchUsers
async function searchUsers(req, res) {
  try {
    let searchTerm = req.query.search;

    // cogemos el hash users
    let allUsers = await client.hGetAll("users");

    // filtramos los usuarios basándose en el término de búsqueda y hacemos un array que envolverá a los objetos
    let filteredUsers = Object.keys(allUsers)
      .filter((email) => {
        // Convierte el valor de cadena JSON a un objeto JavaScript
        const user = JSON.parse(allUsers[email]);
        // quitamos a partir del @ para evitar falsos research
        let filteredEmail = user.email.split('@')[0];
        // check name o email
        return (
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          filteredEmail.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      .map((email) => {
        // pasamos json a un objeto JavaScript
        let user = JSON.parse(allUsers[email]);
        return { ...user };
      });

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function getAllUsers(req, res) {
  try {
    // Consulta todos los usuarios en Redis
    const allUsers = await client.hGetAll("users");

    // Convierte los usuarios en un array
    const usersArray = Object.keys(allUsers).map(email => JSON.parse(allUsers[email]));

    res.status(200).json(usersArray);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  createUser,
  deleteUser,
  login,
  logout,
  setBusy,
  setOnline,
  profile,
  quantity,
  profilePhoto,
  getUsers,
  getAllUsers,
  searchUsers,
};
