import { useState } from "react";
import toast from "react-hot-toast";

const useDelete = () => {
    const [loading, setLoading] = useState(false);
    const [deletedUser, setDeletedUser] = useState(null); 

    const deleteUser = async () => {
        try {
            setLoading(true);

            // Llamada para eliminar el usuario
            const res = await fetch("http://localhost:5000/api/user", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Verificar si la eliminación fue exitosa
            if (!res.ok) {
                throw new Error("Fallo al eliminar el usuario");
            }

            // Obtener el usuario eliminado
            const deletedUserData = await res.json();
            setDeletedUser(deletedUserData);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, deletedUser, deleteUser }; 
};

export default useDelete;
