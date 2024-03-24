import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = (redirect) => {

    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();

    const login = async ({ email, password }) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                // Si la respuesta no es exitosa, lanzar un error con el mensaje del backend
                const errorData = await res.json();
                throw new Error(errorData.message || "Error en inicio de sesión");
            }

            const data = await res.json();
            console.log(email, password);
            // Si la respuesta es exitosa, almacenar los datos del usuario y redirigir al usuario
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            redirect("/home");
        } catch (error) {
            // Si hay un error, mostrar un mensaje de error al usuario
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


    return { loading, login };

}

export default useLogin;

function handleInputErrors({ password, email }) {
    if (!password || !email) {
        toast.error("Por favor, completa todos los campos.");
        return false;
    }

    return true;

}