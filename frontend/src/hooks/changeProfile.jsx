import { useAuthContext } from "../context/AuthContext";
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const useChangeProfile = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async ({ userName, password, newPassword }) => {
        setIsLoading(true);

        try {
            console.log("Localstorage: " + localStorage.getItem("chat-user"));
            // console.log(authUser);
            const decodedAuthUser = jwtDecode(authUser.token);
            // console.log(decodedAuthUser.userData.email);

            const res = await fetch("http://localhost:5000/api/user/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authUser.token}`
                },
                body: JSON.stringify({ email: decodedAuthUser.userData.email, userName, password, newPassword })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error en inicio de sesión");
            }

            const data = await res.json();



            await setAuthUser(data);
            localStorage.setItem("chat-user", JSON.stringify(data));

            return data;

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const changeProfileImage = async (imageFile) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("profilePhoto", imageFile);

            const res = await fetch("http://localhost:5000/api/user/profile/image", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${authUser.token}`
                },
                body: formData
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al cambiar la imagen de perfil");
            }

            const data = await res.json();
            setAuthUser(data);
            localStorage.setItem("chat-user", JSON.stringify(data));
            
            return data;
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };




    return { fetchData, changeProfileImage, isLoading };
};

export default useChangeProfile;
