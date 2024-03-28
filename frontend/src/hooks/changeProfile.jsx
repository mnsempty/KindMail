import { useAuthContext } from "../context/AuthContext";
import { useState } from 'react';

const useChangeProfile = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async ({ userName, password, newPassword }) => {
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/user/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authUser.token}`
                },
                body: JSON.stringify({ email: authUser.email, userName, password, newPassword })
            });
    
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error en inicio de sesión");
            }
    
            const data = await res.json();
            
            setAuthUser(data.user);
    
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchData, isLoading };
};

export default useChangeProfile;
