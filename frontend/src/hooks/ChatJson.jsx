import { useState } from 'react';

const useGetChatMessages = () => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const getChatMessages = async (chat_ID) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/openChat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_ID })
            });

            if (!res.ok) {
                // Si la respuesta no es exitosa, lanzar un error con el mensaje del backend
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al obtener los mensajes del chat");
            }

            const data = await res.json();
            // Si la respuesta es exitosa, almacenar los mensajes del chat
            setMessages(data.messagesFromChat);
        } catch (error) {
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error al usuario
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, messages, getChatMessages };
}

export default useGetChatMessages;
