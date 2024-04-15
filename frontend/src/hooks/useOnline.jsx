import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useOnline = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();
    console.log("authUser:", authUser);

    const online = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/user/set-online", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authUser.token}`
                },
                body: JSON.stringify({ email: authUser.email, online: "online" })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            // Actualiza el usuario autenticado en el contexto de autenticación
            setAuthUser(data.user);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { online };
};


export default useOnline;
