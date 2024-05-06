import { useAuthContext } from "../context/AuthContext";
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';


const useGetEmails = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false); 

    const getEmail = async () => {
        setIsLoading(true); // Inicia el estado de carga

        try {
            console.log("Localstorage: " + localStorage.getItem("chat-user"));
            // console.log(authUser);
            const decodedAuthUser = jwtDecode(authUser.token);
            // console.log(decodedAuthUser.userData.email);

            const res = await fetch("http://localhost:5000/api/chats/getEmails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authUser.token}`
                },
                body: JSON.stringify({ receiverEmail:decodedAuthUser.userData.email })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error en inicio de sesión");
            }

            const data = await res.json();

            return data.emails;

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); 
        }
    };

    return { getEmail, isLoading }; 
};

export default useGetEmails;
