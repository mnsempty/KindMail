import { useState } from "react";
import toast from "react-hot-toast";

const useLogin = () => {

    const [loading, setLoading] = useState(false);

    const login = async ({ password, email }) => {

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password, email })
            })
            const data = await res.json();
            //Si hay algún error, se enseña en las notificaciones
            if (data.error) {
                throw new Error(data.error);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, signup };

}

export default useLogin();

function handleInputErrors({ password, email }) {
    if (!password || !email) {
        toast.error("Por favor, completa todos los campos.");
        return false;
    }

    if (password < 8) {
        toast.error("La contraseña debe tener al menos 8 caracteres.")
        return false;
    }

    return true;

}