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
      // Obtener los detalles de los usuarios
      const user1Details = await client.hGet("users", chat.user1_ID);
      const user2Details = await client.hGet("users", chat.user2_ID);
      // Eliminar el campo hashedPassword de los detalles de los usuarios
      const user1DetailsClean = {
        ...JSON.parse(user1Details),
        hashedPassword: undefined,
      };
      const user2DetailsClean = {
        ...JSON.parse(user2Details),
        hashedPassword: undefined,
      };

      // Añadir los detalles de los usuarios al objeto chat
      chat.user1Details = user1DetailsClean;
      chat.user2Details = user2DetailsClean;

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

//Funcion para recoger los mensajes de un chat
async function getMessagesFromChat(chat_ID) {
  const allMessages = await client.lRange("messages_list", 0, -1);
  console.log(allMessages);

  const messagesFromChat = [];

  for (const messageJSON of allMessages) {
    console.log(messageJSON);
    const message = JSON.parse(messageJSON);
    console.log(message);

    console.log(message.chat_ID + " " + chat_ID);
    if (message.chat_ID == chat_ID) {
      messagesFromChat.push(message);
    }
  }

  return messagesFromChat.length !== 0 ? messagesFromChat : null;
}

module.exports = {
  findChatByUserIDs,
  addChatToList,
  getUserChats,
  sendMessage,
  getMessagesFromChat,
};
