import { useState } from "react";
import toast from "react-hot-toast";

const useUser = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(0);

    const getUser = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/user/quantity");
            const data = await res.json();
            setUser(data.userQuantity);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, user, getUser };

}

export default useUser;
