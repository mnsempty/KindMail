import { useContext, useEffect, useState } from "react";
import { iniciateSocket, startChat, sendMessage } from "../../socket";
import GlobalStateContext from "./GlobalStateContext";

import { jwtDecode } from 'jwt-decode';

export default function ChatCustom() {
  let senderId = localStorage.getItem("chat-user");
  senderId = JSON.parse(senderId);
  senderId = jwtDecode(senderId.token);
  senderId = senderId.userData.email;
  //guardamos los mensajes del socket que luego mostramos
  const [messages, setMessages] = useState([]);
  // Obtener el chatId del contexto global en lugar de localStorage
  const { selectedChatId } = useContext(GlobalStateContext);

  useEffect(() => {
    // si hay chat/id seleccionado
    if (selectedChatId) {
      //iniciamos el socket
      iniciateSocket(selectedChatId);
      //recibimos los mensajes del servidor, manejando los errores
      startChat((err, msg) => {
        if (err) {
          console.error(err);
          return;
        }
        // guardamos el mensaje y el sender en la base de datos
        setMessages((prevMessages) => [...prevMessages, { msg: msg.message, sender: msg.senderName }]);
      });
    }
  }, [selectedChatId]); // Asegúrate de que el efecto dependa de selectedChatId

  const handleSendMessage = () => {
    // Actualizar el estado newMessage con el valor actual del campo de entrada
    const currentMessage = document.getElementById('messageInput').value;
    // dejamos en el state el mensaje que luego cogemos "sin espacios" y lo enviamos al socket
    // junto con el nombre de usuario,despues dejamos el username en blanco
    if (currentMessage.trim() && selectedChatId) {
      sendMessage(selectedChatId, { message: currentMessage, senderName: senderId });
      document.getElementById('messageInput').value = '';
      // Actualizar el estado newMessage para reflejar el cambio en la UI
    }
  };
  console.log("sci: " + selectedChatId);
  return (
    <div className={`flex flex-col w-full rounded-lg bg-gray-500  justify-end max-h-100 min-h-[calc(90vh-2.7rem)]`}>
      {selectedChatId ? (
        <>
          <div className="overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className="p-2 rounded bg-gray-200">
                <strong>{message.sender}: </strong>
                <span>{message.msg}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 p-4 flex">
            <input
              id="messageInput"
              type="text"
              className="w-full md:w-90 p-2 rounded border border-gray-300 flex-auto"
              placeholder="Escribe un mensaje..."
              disabled={!selectedChatId}
            />
            <button
              onClick={handleSendMessage}
              className="ms-2.5 p-2 rounded bg-blue-500 text-white "
              disabled={!selectedChatId}
            >
              Enviar
            </button>
          </div>
        </>
      ) :
        <div className="p-4 h-full bg-gray-800 rounded-lg flex justify-center items-center">
          <div className="text-white">
            <h5>Selecciona un chat</h5>
          </div>
        </div>}

    </div>
  );
}
