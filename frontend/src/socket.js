import { io } from "socket.io-client";

const URL = 'http://localhost:5000';

export const socket = io(URL);

//*docs https://tincode.es/blog/manejo-de-salas-con-socket-io-y-react-hooks
// room = chatID, lo metemos con global context
export const iniciateSocket = (room) =>{
    console.log("id de chat seleccionado (iniciateSocket)" + room);
    if (socket && room) socket.emit('join chat', room);
    console.log("Socket conectado");
}
// cuando se actualiza cada vez que recibe un mensaje (useEffect)
export const startChat = (cb) =>{
    socket.on('chat', msg =>{
        console.log("msg recibido");
        return cb(null, msg);
    })
}
// enviar mensajes como tal
export const sendMessage = (room, message) =>{
    socket ? socket.emit('chat', { message, room }):console.log("error en (sendMessage)");
}
//? not sure if needed cambiar de un chat a otro
export const switchChat = (prevChat,nextChat)=> {
    socket ? socket.emit('switch chat', {prevChat,nextChat}) : console.log("error en (switchChat)");
}