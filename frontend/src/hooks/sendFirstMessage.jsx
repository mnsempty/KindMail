import { useAuthContext } from "../context/AuthContext";
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const useSendFirstMessage = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false); 

    const sendMessage = async ({ header, content, receiver }) => {
        setIsLoading(true); // Inicia el estado de carga

        try {
            console.log("Localstorage: " + localStorage.getItem("chat-user"));

            const res = await fetch("http://localhost:5000/api/chats/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authUser.token}`
                },
                body: JSON.stringify({ header, content, sender: authUser.email, receiver })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error en inicio de sesión");
            }

            const data = await res.json();

            return data;

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); 
        }
    };

    return { sendMessage, isLoading }; 
};

export default useSendFirstMessage;
