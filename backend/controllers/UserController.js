const client = require("../Database/RedisClient");
const bcrypt = require("bcrypt");

async function findUser(email) {
  const userData = await client.hGet("users", email);
  if (userData) {
    return JSON.parse(userData);
  } else {
    return null; // Usuario no encontrado
  }
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

module.exports = {
  findUser,
  saveUser, delUser
};
