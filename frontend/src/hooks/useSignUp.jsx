import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = (redirect) => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ name, password, email }) => {
        // console.log("name" + name + "password" + password + "email" + email);
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/create_user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password, email })
            })
            if (!res.ok) {
                // Si la respuesta no es exitosa, lanza un error con el mensaje de error del servidor
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al crear usuario");
            }
            const data = await res.json();
            //localstorage
            localStorage.setItem("chat-user", JSON.stringify(data));
            //context
            setAuthUser(data);
            redirect("/home");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, signup };

}

export default useSignUp;

function handleInputErrors({ name, password, email }) {
    if (!name || !password || !email) {
        toast.error("Por favor, completa todos los campos.");
        return false;
    }

    if (password.length < 8) {
        toast.error("La contraseña debe tener al menos 8 caracteres.")
        return false;
    }

    if (!/^[a-zA-Z]+$/.test(name)) {
        toast.error("Introduce correctamente tu nombre.");
        return false;
    }

    return true;

}