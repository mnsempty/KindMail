const { error } = require("console");
const client = require("../Database/RedisClient");
const { randomUUID } = require("crypto");
// #region create
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
    const chatData = { user1_ID, user2_ID, chat_ID };
    await addChatToList(chatData); // Llamar a la función para agregar chat a la lista

    res.status(201).json({ message: "Chat creado correctamente" });
  } catch (error) {
    console.error("Error al crear chat:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
// #region openchat/email
// verificamos si los usuarios ya tienen un chat abierto, en caso de que no lo tengan
// abrimos el email
async function openChatOrEmail(req, res) {
  try {
    let { user1_ID, user2_ID } = req.body;

    // Verificar si los usuarios ya están en una sala de chat juntos
    let existingChatID = await findChatByUserIDs(user1_ID, user2_ID);
    // si los users tienen ya abierto un chat devolvemos el id del chat para abrirlo
    if (existingChatID) {
      return res.status(200).json({ chatID: existingChatID.chat_ID });
    }

    if (!user1_ID || !user2_ID) {
      return res
        .status(400)
        .json({ message: "ID`s de dos usuarios obligatorios" });
    }

    res.status(201).json({ firstEmail: true });
  } catch (error) {
    console.error("Error al crear chat:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

// #region getChatsFromUser
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
// #region openChat
async function openChat(req, res) {
  try {
    const { chat_ID } = req.body;
    // console.log("chat id func sad" + chat_ID);
    const messagesFromChat = await getMessagesFromChat(chat_ID);

    res.status(200).json({ messagesFromChat });
  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.log("Error al traer el chat del usuario:", err);
  }
}
// #region sendMessage
async function sendMessage(req, res) {
  try {
    const { sender, content, chat_ID, message_ID } = req.body;

    // console.log(req.body);
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
// #region findChatByUserIDs
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

// denunciar al usuario
async function reportUsers(req, res) {
  try {
    const { email1, chatID } = req.body;

    // Obtener todos los chats desde Redis
    const allChats = await client.lRange("chats_list", 0, -1);

    // Buscar el chat correspondiente al chatID y email1
    let email2 = null;
    for (const chatJSON of allChats) {
      const chat = JSON.parse(chatJSON);
      if (
        chatID === chat.chatID &&
        (chat.user1_ID === email1 || chat.user2_ID === email1)
      ) {
        email2 = chat.user2_ID === email1 ? chat.user1_ID : chat.user2_ID;
        break;
      }
    }
    //chat.user2_ID=emailmio
    //email1=emailmio

    // Verificar si se encontró el chat
    if (!email2) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }

    // Guardar los IDs de usuario en la base de datos "report" en Redis
    const reportData = JSON.stringify({ email1, email2 });
    await client.rPush("report", reportData);

    res.status(201).json({ message: "Denuncia enviada correctamente" });
  } catch (err) {
    console.error("Error al enviar la denuncia:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

// recoger las denuncias de los usuarios
async function getReports(req, res) {
  try {
    // Obtener todas las denuncias de la lista en Redis
    const allReports = await client.lRange("report", 0, -1);
    res.status(200).json({ allReports });
  } catch (error) {
    console.error("Error al obtener las denuncias:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

// #region addChatToList
async function addChatToList(chat) {
  const chatJSON = JSON.stringify(chat);

  await client.rPush("chats_list", chatJSON, (err, reply) => {
    if (err) {
      reject(err);
    } else {
      resolve(reply);
    }
  });
}
// #region getUserChats
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
// #region getMesgsFromChat
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

// #region getChats,quantity
//Función calcular los chats
async function getChats() {
  const allChats = await client.lRange("chats_list", 0, -1);
  const chats = allChats.map((chatJSON) => JSON.parse(chatJSON));
  return chats;
}
async function quantity(req, res) {
  try {
    const chats = await getChats();
    const chatQuantity = chats.length;
    res.status(200).json({ chatQuantity });
    // console.log("chats:", chatQuantity);
  } catch (error) {
    console.error("Error al obtener la cantidad de chats:", error);
  }
}


//#region SendEmail
async function sendEmail(req, res) {
  try {
    const { header, content, sender, receiver } = req.body;

    // console.log(req.body);
    const messageData = { sender, header, content, receiver };

    const messageJSON = JSON.stringify(messageData);

    // Agregar el chat al final de la lista
    await client.rPush("emails_list", messageJSON, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });

    // Crear la sala de chat
    //generamos un id aleatorio con RandomUUID de node, deberiamos comprobar que no existe ya en la base de
    // datos el id generado pero al ser una app tan pequeña no es necesario
    let chat_ID = randomUUID();
    const chatData = { "user1_ID":sender, "user2_ID":receiver, chat_ID };
    await addChatToList(chatData); // Llamar a la función para agregar chat a la lista

    res.status(201).json({ message: "Email enviado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.log("Error al enviar email:", err);
  }
}

//#region getEmails
async function getEmails(req, res) {
  try {
    const { receiverEmail } = req.body;

    // console.log(req.body);    

    const allEmails = await client.lRange("emails_list", 0, -1);

    // Filtrar los correos electrónicos para el receptor especificado
    const emailsForReceiver = [];
    for (const email of allEmails) {
      const emailObj = JSON.parse(email);
      if (emailObj.receiver === receiverEmail) {
        // Obtener detalles del sender
        const senderDetails = await client.hGet("users", emailObj.sender);
        const senderDetailsJSON = JSON.parse(senderDetails);
       
        // Incluir detalles del sender en el email
        // El operador spread ... se utiliza en JavaScript para copiar las propiedades de un objeto a otro objeto nuevo o para añadir propiedades adicionales a un objeto existente.
        const emailWithSenderDetails = {
          name: senderDetailsJSON.name,
          profilePhoto: senderDetailsJSON.profilePhoto,
          ...emailObj
        };
        
        emailsForReceiver.push(emailWithSenderDetails);
      }
    }

    // console.log("Correos electrónicos recibidos para",receiverEmail + ":",emailsForReceiver);

    res.status(200).json({ emails: emailsForReceiver }); // Envía los correos electrónicos filtrados como respuesta
  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.log("Error al obtener correos electrónicos:", err);
  }
}

module.exports = {
  create,
  openChatOrEmail,
  getChatsFromUser,
  openChat,
  sendMessage,
  quantity,
  getReports,
  reportUsers,
  sendEmail,
  getEmails
};
