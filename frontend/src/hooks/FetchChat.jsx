import { useState } from 'react';

const useGetChatDetails = () => {
    const [loading, setLoading] = useState(false);
    const [chatDetails, setChatDetails] = useState([]);

    const getChatDetails = async (user_ID) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/chats", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_ID })
            });
            
            if (!res.ok) {
                // Si la respuesta no es exitosa, lanzar un error con el mensaje del backend
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al obtener los detalles del chat");
            }

            const data = await res.json();
            console.log("Data fetch"+JSON.stringify(data.userChats));
            // Si la respuesta es exitosa, almacenar los detalles del chat
            setChatDetails(data.userChats);
        } catch (error) {
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error al usuario
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, chatDetails, getChatDetails };
}

export default useGetChatDetails;
