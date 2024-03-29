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
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false); // Nuevo estado

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
        setMessages((prevMessages) => {
          // Verifica si el mensaje ya existe en la lista de mensajesprevios
          const messageExists = prevMessages.some(m => m.msg === msg.content);
          if (!messageExists) {
            return [...prevMessages, { msg: msg.content, sender: msg.sender }];
          } else {
            return prevMessages;
          }
        });
        setShouldScrollToBottom(true); // Indicamos que se debe desplazar al final
      });
    }
  }, [selectedChatId]);// useEffect se activa de nuevo si el valor cambia

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
      console.log("scrolledd");
      setShouldScrollToBottom(false); // Reseteamos el estado para evitar desplazamientos innecesarios
    }
  }, [shouldScrollToBottom]);

  const scrollToBottom = () => {
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    // Actualizar el estado newMessage con el valor actual del campo de entrada
    const currentMessage = document.getElementById('messageInput').value;
    // dejamos en el state el mensaje que luego cogemos "sin espacios" y lo enviamos al socket
    // junto con el nombre de usuario,despues dejamos el username en blanco
    if (currentMessage.trim() && selectedChatId) {
      sendMessage(selectedChatId, { content: currentMessage, sender: senderId });
      document.getElementById('messageInput').value = '';
      setShouldScrollToBottom(true); // Indicamos que se debe desplazar al final después de enviar un mensaje
    }
  };

  return (
    <div className={`flex flex-col w-full rounded-lg bg-gray-500 justify-end h-[calc(90vh-2.7rem)]`}>
      {selectedChatId ? (
        <>
          <div id="chatContainer" className="overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className="p-2 rounded bg-gray-200 pb-4">
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
