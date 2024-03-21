// serverSocket.js

const setupSocket = (io) => {
  // al crearse la conexión
  io.on('connection', (socket) => {
     console.log(`Connected: ${socket.id}`);
     // en caso de desconexión 
     socket.on('disconnect', () =>
        console.log(`Disconnected: ${socket.id}`));
      // unirse a un space/chat
     socket.on('join chat', (space) => {
        console.log(`Socket ${socket.id} joining ${space}`);
        socket.join(space);
     });
     // "chat como tal, que contiene mensajes y el space en que se encuentra"
     socket.on('chat', (data) => {
        const { message, space } = data;
        console.log(`msg: ${message}, space: ${space}`);
        io.to(space).emit('chat', message);
     });
  });
 };
 
 module.exports = setupSocket;
 