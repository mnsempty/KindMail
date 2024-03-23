const client = require("../Database/RedisClient");

async function findChatByUserIDs(user1_ID, user2_ID) {
  // Obtener todas las salas de chat
  const allChats = await client.lRange("chats_list", 0, -1);

  // Buscar si hay una sala de chat que contenga los mismos IDs de usuario
  for (const chatJSON of allChats) {
    const chat = JSON.parse(chatJSON);
    if (
      (chat.user1_ID === user1_ID && chat.user2_ID === user2_ID) ||
      (chat.user1_ID === user2_ID && chat.user2_ID === user1_ID)
    ) {
      return chat; // Se encontró una sala de chat
    }
  }

  return null; // No se encontró ninguna sala de chat
}

// Función para agregar un chat a una lista
async function addChatToList(chat) {
  const chatJSON = JSON.stringify(chat);

  // Agregar el chat al final de la lista
  await client.rPush("chats_list", chatJSON, (err, reply) => {
    if (err) {
      reject(err);
    } else {
      resolve(reply);
    }
  });
}

async function getUserChats(user_ID) {
  // Obtener todas las salas de chat
  const allChats = await client.lRange("chats_list", 0, -1);

  let allUserChats = [];

  // Buscar si hay una sala de chat que contenga los mismos IDs de usuario
  for (let i = 0; i < allChats.length; i++) {
    const chat = JSON.parse(allChats[i]);

    if (chat.user1_ID === user_ID || chat.user2_ID === user_ID) {
      chat.index = i;
      allUserChats.push(chat);
    }
  }

  return allUserChats.length !== 0 ? allUserChats : null;

}


// Función para guardar mensajes
async function sendMessage(message) {
  const messageJSON = JSON.stringify(message);

  // Agregar el chat al final de la lista
  await client.rPush("messages_list", messageJSON, (err, reply) => {
    if (err) {
      reject(err);
    } else {
      resolve(reply);
    }
  });
}

module.exports = { findChatByUserIDs, addChatToList, getUserChats,sendMessage };
