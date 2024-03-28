const setupSocket = (io) => {
  // al crearse la conexión
  let socketSpace;
  io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);
    // en caso de desconexión
    socket.on("disconnect", () => console.log(`Disconnected: ${socket.id}`));
    // unirse a un space/chat
    socket.on("join chat", (space) => {
      console.log(`Socket ${socket.id} joining ${space}`);
      socket.join(space);
      socketSpace = space;
      
      getMessageFromChat(space)
        .then((data) => {
          console.log("message from chat:" + data);
          // Accede al array messagesFromChat dentro del objeto data
          const messages = data.messagesFromChat;
          messages.forEach((message) => {
            console.log(message);
            // Emite el evento "chat" para cada mensaje
            io.to(space).emit("chat", message);
          });
        })
        .catch(console.error);
    });
    // "chat como tal, que contiene mensajes y el space en que se encuentra"
    socket.on("chat", (data) => {
      console.log(data);
      const { space, message } = data;
      console.log(`msg: ${message}, space: ${space}`);
      io.to(space).emit("chat", message);

      //data a enviar
      const requestBody = {
        sender: message.senderName,
        content: message.content,
        chat_ID: space,
      };
      // Llamar a la función asíncrona "/api/chats/sendMessage"
      sendMessageToAPI(requestBody);
    });
    //  en caso de que vuelvan a conectarse al socket enviamos los mensajes
    // if (!socket.recovered && socketSpace) {
    //   try {
    //      getMessageFromChat(socketSpace)
    //        .then(data => {
    //          console.log("message from chat:" + data);
    //          // Accede al array messagesFromChat dentro del objeto data
    //          const messages = data.messagesFromChat;
    //          messages.forEach((message) => {
    //           console.log(message);
    //            // Emite el evento "chat message" para cada mensaje
    //            io.to(socketSpace).emit("chat", message);
    //          });
    //        })
    //        .catch(console.error);
    //   } catch (e) {
    //      console.error(e);
    //   }
    //  }
  });
};

async function sendMessageToAPI(requestBody) {
  try {
    const response = await fetch(
      "http://localhost:5000/api/chats/sendMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}
async function getMessageFromChat(chat_ID) {
  try {
    const requestBody = {
      chat_ID: chat_ID,
    };

    const response = await fetch("http://localhost:5000/api/chats/openChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
module.exports = setupSocket;
