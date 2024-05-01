import toast from "react-hot-toast";
import { useState, useContext } from "react";
import GlobalStateContext from "../components/home/GlobalStateContext";
import { jwtDecode } from "jwt-decode";

const useReport = () => {
    const { ChatIds } = useContext(GlobalStateContext);
    const [loading, setLoading] = useState(false);

    // Obtener el email del usuario del local storage
    const getUserEmailFromLocalStorage = () => {
        const userInfo = localStorage.getItem('chat-user');
        if (!userInfo) return null;

        const decodedUserInfo = jwtDecode(userInfo); // Corregido aquí
        return decodedUserInfo.userData.email;
    };

    // Función para reportar
    const report = async () => {
        const email1 = getUserEmailFromLocalStorage();

        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/user/report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email1, chatId: ChatIds.current }) 
            });

            const data = await res.json();
        
            if (res.ok) {
                toast.success("Usuario denunciado correctamente");
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { report, loading };
};

export default useReport;


