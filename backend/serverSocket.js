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
     /*
       if (!socket.recovered) {
    try {
      const messages = await db.lrange("chat_messages", 0, -1);
      const reversedMessages = messages.reverse();
      reversedMessages.forEach((message) => {
        const { msg, senderId, receiverId } = JSON.parse(message);
        socket.emit("chat message", msg, senderId, receiverId);
      });
    } catch (e) {
      console.error(e);
    }
  }
     */
  });
 };
 
 module.exports = setupSocket;
 