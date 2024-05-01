import { useState } from "react";
import toast from "react-hot-toast";

const useChats = () => {
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState(0);

    const getChat = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/chats/quantity");
            const data = await res.json();
            setChats(data.chatQuantity);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, chats, getChat };

}

export default useChats;
