import { io } from "socket.io-client";

const URL = "http://localhost:5000";

export const socket = io(URL);
/*
    const socket = io({
      auth: {
        username: await getUsername(),
        serverOffset: 0
      }
    })

        socket.on('chat message', (msg, username, serverOffset) => {
      console.log("usuario mostrado cliente: " + username);
      console.log("serverOffset: " + serverOffset);
      const item = `<li>
        <p>${msg}</p>
        <small>${username}</small>
      </li>`
      console.log("item: " + item);
      messages.insertAdjacentHTML('beforeend', item)
      socket.auth.serverOffset = serverOffset
      // scroll to bottom of messages
      messages.scrollTop = messages.scrollHeight
    })
*/
//*docs https://tincode.es/blog/manejo-de-salas-con-socket-io-y-react-hooks
// space = chatID, lo metemos con global context
export const iniciateSocket = (space) => {
  console.log("id de chat seleccionado (iniciateSocket)" + space);
  if (socket && space) socket.emit("join chat", space);
  console.log("Socket conectado");
};
// cuando se actualiza cada vez que recibe un mensaje (useEffect)
export const startChat = (cb) => {
  socket.on("chat", (msg) => {
    console.log("msg recibido");
    return cb(null, msg);
  });
};
// enviar mensajes como tal
export const sendMessage = (space, message) => {
  socket
    ? socket.emit("chat", { message, space })
    : console.log("error en (sendMessage)");
};
//? not sure if needed cambiar de un chat a otro
export const switchChat = (prevChat, nextChat) => {
  socket
    ? socket.emit("switch chat", { prevChat, nextChat })
    : console.log("error en (switchChat)");
};
