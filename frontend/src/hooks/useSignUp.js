import { useState } from "react";
import toast from "react-hot-toast";

const useSignUp = () => {

    const [loading, setLoading] = useState(false);

    const signup = async ({ name, password, email }) => {
        // if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password, email })
            })
            console.log(res);
            const data = await res.json();
            console.log(data);
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

    if (password < 8) {
        toast.error("La contraseña debe tener al menos 8 caracteres.")
        return false;
    }

    if (!/^[a-zA-Z]+$/.test(name)) {
        toast.error("Introduce correctamente tu nombre.");
        return false;
    }

    return true;

}