import { useContext, useEffect, useState } from 'react';
import { socket } from '../../socket'; // Asegúrate de ajustar la ruta de importación
import GlobalStateContext from './GlobalStateContext';

export default function ChatCustom() {
  const { selectedUserId } = useContext(GlobalStateContext);
  const [messages, setMessages] = useState([]);
 const [newMessage, setNewMessage] = useState('');

 // Recoger el ID del usuario que envía el mensaje del almacenamiento local

 const senderId = localStorage.getItem('userId');

 useEffect(() => {
  console.log("user selected:" + selectedUserId);
    if (selectedUserId) {
      // Escuchar mensajes del servidor
      socket.on('chat message', (msg, username) => {
        setMessages((prevMessages) => [...prevMessages, { msg, username }]);
      });

      // Limpiar al desmontar el componente
      return () => {
        socket.off('chat message'); // Desconectar el listener para evitar fugas de memoria
      };
    }
 }, [selectedUserId]); // Dependencia en selectedUserId para recargar mensajes cuando cambie

 const handleSendMessage = () => {
  console.log("click!");
  console.log("msg: "+newMessage);
  console.log("user selected: "+selectedUserId);
  if (newMessage.trim() && selectedUserId) {
    console.log(`Sending message: ${newMessage} from ${senderId} to ${selectedUserId}`);
    socket.emit('chat message', newMessage, senderId, selectedUserId);
    setNewMessage('');
  }
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
      <div className="border-t border-gray-200 p-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-90 p-2 rounded border border-gray-300"
          placeholder="Escribe un mensaje..."
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 p-2 rounded bg-blue-500 text-white"
        >
          Enviar
        </button>
      </div>
    </div>
 );
}
