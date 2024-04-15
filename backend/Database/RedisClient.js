const { createClient } = require("redis");
require("dotenv").config();

function createRedisClient() {
    const client = createClient({
        password: "admin",
        socket: {
          host: `${process.env.HOST}`,
          port: process.env.DBPORT,
        },
      });

  client.on("error", (error) => {
    console.error("Error en el cliente Redis:", error);
  });
  
  
    try {
      client.connect();
      console.log("Conexión exitosa a la base de datos Redis");
    } catch (error) {
      console.error("Error al conectar a la base de datos Redis:", error);
    }


  return client;
}





module.exports = createRedisClient();
