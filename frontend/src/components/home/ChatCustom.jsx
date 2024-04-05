import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { motion } from 'framer-motion';
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
  const { ChatIds } = useContext(GlobalStateContext);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  useEffect(() => {
    setMessages([]);

    // si hay chat/id seleccionado
    if (ChatIds.current) {
      //iniciamos el socket
      iniciateSocket(ChatIds.current);
      //recibimos los mensajes del servidor, manejando los errores
      startChat((err, msg) => {
        if (err) {
          console.error(err);
          return;
        }
        // console.log("msg front" + JSON.stringify(msg));
        setMessages((prevMessages) => {
          // Verifica si el mensaje ya existe en la lista de mensajes previos checking message_ID
          const messageExists = prevMessages.some(m => m.message_ID === msg.message_ID);
          if (!messageExists) {
            return [...prevMessages, { msg: msg.content, sender: msg.sender, message_ID: msg.message_ID }];
          } else {
            return prevMessages;
          }
        });
        setShouldScrollToBottom(true); // Indicamos que se debe desplazar al final
      });
    }
  }, [ChatIds]);// useEffect se activa de nuevo si el valor cambia

  useLayoutEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
      setShouldScrollToBottom(false);
    }
  }, [shouldScrollToBottom]);
  //useLayout idem que useEffect pero se realiza más tarde, justo antes de renderizar todo, de forma sincrona,evitando
  //errores de actualización con el scroll
  const scrollToBottom = () => {
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer) {
      //hacemos scroll hasta X punto de forma smooth(la forma mas facil sin tocar css)
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleSendMessage = () => {
    // Actualizar el estado newMessage con el valor actual del campo de entrada
    const currentMessage = document.getElementById('messageInput').value;
    // dejamos en el state el mensaje que luego cogemos "sin espacios" y lo enviamos al socket
    // junto con el nombre de usuario,despues dejamos el username en blanco
    if (currentMessage.trim() && ChatIds.current) {
      sendMessage(ChatIds.current, { content: currentMessage, sender: senderId });
      document.getElementById('messageInput').value = '';
      console.log("scrollToBottom pre enviar" + shouldScrollToBottom);
      setShouldScrollToBottom(true);
      console.log("scrollToBottom post enviar" + shouldScrollToBottom);

    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isSameSender = (currentMessage, previousMessage) => {
    if (!previousMessage) return false; // si no hay mensaje anterior es de "otro"
    return previousMessage.sender === currentMessage.sender;
  };

  let messageVariants = {
    sent: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    received: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };


  return (
    <div className={`flex flex-col w-full rounded-lg border-2 border-azul justify-end h-[calc(90vh-2.7rem)]`}>
      {ChatIds.current ? (
        <>
          <div id="chatContainer" className="overflow-y-auto p-4">
            {messages.map((message, index) => {
              let isSentByUser = message.sender === senderId;
              // msg prev del mismo sender true/false
              let sameSender = isSameSender(message, messages[index - 1]);
              // Segun quien envia el mensaje y si el anterior mensaje es del mismo user modificamos las clases
              let messageClass = isSentByUser ? 'bg-azulclaro-200 text-azulclaro-950 ml-auto' : 'bg-rosa text-rosa-950';
              let borderClass = sameSender ? '' : isSentByUser ? 'rounded-br-none' : 'rounded-tl-none';
              // mt distinto segun el mensaje anterior
              let marginTopClass = sameSender ? 'mt-2' : 'mt-4';

              const animationVariant = isSentByUser ? 'sent' : 'received';

              return (
                <motion.div
                  key={index}
                  className={`p-2 w-6/12 rounded-lg ${messageClass} ${borderClass} ${marginTopClass}`}
                  variants={messageVariants}
                  initial={{ opacity: 0, x: isSentByUser ? -300 : 300 }} // Inicialmente fuera de la vista
                  animate={animationVariant}
                >
                  <strong>{message.sender}: </strong>
                  <span>{message.msg}</span>
                </motion.div>
              );
            })}
          </div>
          <div className="border-t border-gray-200 p-4 flex">
            <input
              id="messageInput"
              type="text"
              className="w-full md:w-90 p-2 rounded border-2 border-gray-300 focus:outline-azul caret-azul flex-auto"
              placeholder="Escribe un mensaje..."
              onKeyDown={handleKeyDown}
              disabled={!ChatIds.current}
            />
            <button
              onClick={handleSendMessage}
              className="ms-2.5 p-2 rounded bg-blue-500 text-white "
              disabled={!ChatIds.current}
            >
              Enviar
            </button>
          </div>
        </>
      ) :
        <div className="p-4 h-full bg-gray-800 flex justify-center items-center">
          <div className="text-white">
            <h5>Selecciona un chat</h5>
          </div>
        </div>}
    </div>
  );

}