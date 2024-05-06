import { io } from "socket.io-client";

let URL = "http://localhost:5000";

export const socket = io(URL);
//*docs https://tincode.es/blog/manejo-de-salas-con-socket-io-y-react-hooks
// space = chatID, lo metemos con global context
export const iniciateSocket = (space) => {
  // console.log("id de chat seleccionado (iniciateSocket)" + space);
  if (socket && space) socket.emit("join chat", space);
  // console.log("Socket conectado");
};
// se actualiza cada vez que recibe un mensaje (useEffect)
export const startChat = (cb) => {
  socket.on("chat", (msg) => {
    // console.log("msg recibido:========================= " +JSON.stringify(msg));
    return cb(null, msg);
  });
};
// enviar mensajes como tal, pasamos space y message(message,sender)
export const sendMessage = (space, message) => {
  // console.log("space " + space + "" +JSON.stringify(message));
  socket
    ? socket.emit("chat", { message, space }) 
    : console.log("error en (sendMessage)");
};
// para cambiar entre un chat y otro, leave-join
export const switchChat = (prevChat, nextChat) => {
  socket
    ? socket.emit("switch chat", { prevSpace: prevChat, nextSpace: nextChat })
    : console.log("error en (switchChat)");
};
