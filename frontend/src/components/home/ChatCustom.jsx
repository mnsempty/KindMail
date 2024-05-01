import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { motion } from 'framer-motion';
import { iniciateSocket, startChat, sendMessage } from "../../socket";
import GlobalStateContext from "./GlobalStateContext";
import VisibilityGlobalStateContext from "./VisibilityGlobalStateContext";
import toast from "react-hot-toast";
import useReport from "../../hooks/useReport";

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
  const { isChatVisible, toggleVisibility } = useContext(VisibilityGlobalStateContext)
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const { report } = useReport();

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
    let currentMessage = document.getElementById('messageInput').value;

    //si enviamos una palabra de más de 13 letras la troceamos
    let spacesNeeded = Math.floor(currentMessage.length / 13);

    for (let i = 0; i < spacesNeeded; i++) {
        let insertIndex = (i + 1) * 13;
        currentMessage = currentMessage.slice(0, insertIndex) + ' ' + currentMessage.slice(insertIndex);
    }

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

  const handleReport = async () => {
    try {
      await report();
    } catch (error) {
      toast.error(error.message);
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

  const handleHideAside = () => {
    if (window.innerWidth <= 768) {
      toggleVisibility();
    }
  };

  useEffect(() => {
    // actualizar useState según tamaño
    const updateButtonVisibility = () => {
      setIsButtonVisible(window.innerWidth <= 768);
    };

    updateButtonVisibility();
    window.addEventListener('resize', updateButtonVisibility);

    return () => window.removeEventListener('resize', updateButtonVisibility);
  }, []);

  return (
    <div className={`${isChatVisible ? 'flex flex-col' : 'hidden'} w-full rounded-lg border-2 border-azul justify-end h-[calc(90vh-2.7rem)] mb-5`}>
      {ChatIds.current ? (

        <>

          <div id="chatContainer" className="relative overflow-y-auto p-4">
          {isButtonVisible && (
            <button
              aria-label="Toggle sidebar"
              onClick={handleHideAside}
              className='sticky top-0 ms-2 mt-2 px-3 py-2  w-1/12 inset-0 backdrop-blur-sm bg-transparent  text-negro dark:text-negro transition-colors duration-200 hover:bg-blanco hover:border-azul dark:hover:bg-azul-950 border rounded-lg gap-x-2'>
              <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
            </button>
          )}
          
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
                  className={`p-2 w-6/12 max-w-6/12 rounded-lg ${messageClass} ${borderClass} ${marginTopClass} text-pretty`}
                  variants={messageVariants}
                  initial={{ opacity: 0, x: isSentByUser ? -300 : 300 }} // Inicialmente fuera de la vista
                  animate={animationVariant}
                >
                  <ul className="truncate font-semibold">{message.sender}: </ul>
                  <p>{message.msg}</p>
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
              onClick={handleReport}
              className="ms-2.5 p-2 rounded bg-red-600 text-white"
              disabled={!ChatIds.current}
            >
              Denunciar
            </button>
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