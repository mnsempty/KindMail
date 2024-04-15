import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = (redirect) => {

    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();

    const signup = async ({ name, password, email }) => {

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password, email })
            })
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            //localstorage
            localStorage.setItem("chat-user", JSON.stringify(data));
            //context
            setAuthUser(data);
            console.log("entro");
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