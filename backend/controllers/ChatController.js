const client = require("../Database/RedisClient");
const { randomUUID } = require('crypto');

async function create(req, res) {
  try {
    const { user1_ID, user2_ID } = req.body;

    // Verificar si los usuarios ya están en una sala de chat juntos
    const existingChatID = await findChatByUserIDs(user1_ID, user2_ID);
    if (existingChatID) {
      return res
        .status(400)
        .json({ message: "Los usuarios ya están en una sala de chat juntos" });
    }

    if (!user1_ID || !user2_ID) {
      return res
        .status(400)
        .json({ message: "user1_ID y user2_ID son obligatorios" });
    }

    // Crear la sala de chat
    //generamos un id aleatorio con RandomUUID de node, deberiamos comprobar que no existe ya en la base de 
    // datos el id generado pero al ser una app tan pequeña no es necesario
    let chat_ID = randomUUID();
    const chatData = { user1_ID, user2_ID, chat_ID};
    await addChatToList(chatData); // Llamar a la función para agregar chat a la lista

    res.status(201).json({ message: "Chat creado correctamente" });
  } catch (error) {
    console.error("Error al crear chat:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function getChatsFromUser(req, res) {
  try {
    const { user_ID } = req.body;

    const userChats = await getUserChats(user_ID);

    res.status(200).json({ userChats });
  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.log("Error al traer los chats del usuario:", err);
  }
}

async function openChat(req, res) {
  try {
    const { chat_ID } = req.body;
    console.log("chat id func sad"+chat_ID);
    const messagesFromChat = await getMessagesFromChat(chat_ID);

    res.status(200).json({ messagesFromChat });
  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.log("Error al traer el chat del usuario:", err);
  }
}

async function sendMessage(req, res) {
  try {
    const { sender, content, chat_ID, message_ID } = req.body;

    console.log(req.body);
    const messageData = { sender, content, chat_ID, message_ID };

    const messageJSON = JSON.stringify(messageData);

    // Agregar el chat al final de la lista
    await client.rPush("messages_list", messageJSON, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });

    res.status(201).json({ message: "Mensaje enviado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.log("Error al enviar mensaje:", err);
  }
}

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

// añadir un chat a una lista
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

//Funcion para recoger los mensajes de un chat
async function getMessagesFromChat(chat_ID) {
  const allMessages = await client.lRange("messages_list", 0, -1);
  const messagesFromChat = [];

  for (const messageJSON of allMessages) {
    const message = JSON.parse(messageJSON);
    if (message.chat_ID == chat_ID) {
      messagesFromChat.push(message);
    }
  }
  return messagesFromChat.length !== 0 ? messagesFromChat : null;
}

async function getUsers(User_ID) {
  // coger todos los usuarios de la app menos el dado +
  // comparar con chats para saber si tiene un chat abierto con el user
  try {
    let data = await client.hGetAll("users");
    console.log("Sucess:" + data);

  } catch (e) {
    console.log("Error alobtener los datos de los usuarios" + e);
  }


}

module.exports = {
  create,
  getChatsFromUser,
  openChat,
  sendMessage
};
