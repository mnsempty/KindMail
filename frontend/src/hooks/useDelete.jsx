import { useState } from "react";
import toast from "react-hot-toast";

const useDelete = () => {
    const [loading, setLoading] = useState(false);

    const delUser = async (email) => {
        try {
            console.log("Eliminando usuario:", email);

            const res = await fetch(`http://localhost:5000/api/user/${email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            
            if (!res.ok) {
                throw new Error(res);
            }

            return { email };
        } catch (error) {
            throw new Error("Error al eliminar usuario");
        }
    };

    const deleteUser = async (email) => {
        try {
            setLoading(true);
            const deletedUser = await delUser(email);
            return deletedUser;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, deleteUser };
};

export default useDelete;
