import { useContext, useEffect, useState } from "react";
import { socket } from "../../socket";
import GlobalStateContext from "./GlobalStateContext";

import {jwtDecode} from 'jwt-decode';


export default function ChatCustom() {
  const { selectedChatId } = useContext(GlobalStateContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Recoger el ID del usuario que envía el mensaje del almacenamiento local

  let senderId = localStorage.getItem("chat-user");
  senderId=JSON.parse(senderId)
  senderId = jwtDecode(senderId.token);
  console.log(senderId.userData.email);
  useEffect(() => {
    console.log("chat selected:" + selectedChatId);
    if (selectedChatId) {
      // Escuchar mensajes del servidor
      socket.on("chat message", (msg, username) => {
        setMessages((prevMessages) => [...prevMessages, { msg, username }]);
      });

      // Limpiar al desmontar el componente
      return () => {
        
        console.log("disconnect");
        socket.disconnect(); // Desconectar el listener para evitar fugas de memoria
      };
    }
  }, [selectedChatId]); // se recarga el use effect cada vez que se modifica la variable/se escoge otro user to chat
  
  // al "enviar un mensaje"
  const handleSendMessage = () => {
    console.log("click!");
    console.log("msg: " + newMessage);
    console.log("user selected: " + selectedChatId);
    // cogemos el input para vaciarlo al enviarlo
    let inputText = document.querySelector("#msgInput");
    console.log("input: " + inputText.value);
    if (newMessage.trim() && selectedChatId) {
      console.log(
        `Sending message: ${newMessage} from ${senderId} to ${selectedChatId}`
      );
      socket.emit("chat message", newMessage, senderId, selectedChatId);
      setNewMessage("");
    }
    inputText.value = "";
  };

  return (
    <div className="flex flex-col w-full rounded-lg bg-slate-950	 m-4 justify-end min-h-100 max-h-100">
      <div className="overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="p-2 rounded bg-gray-200">
            <strong>{message.username}: </strong>
            <span>{message.msg}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 p-4 ">
        <input
          id="msgInput"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="p-2 rounded border border-gray-300"
          placeholder="Escribe un mensaje..."
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 ms-2 p-2 rounded bg-blue-500 text-white"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
