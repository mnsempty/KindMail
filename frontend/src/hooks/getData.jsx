import { useState } from "react";
import toast from "react-hot-toast";

const getData = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/users");
            if (!res.ok) {
                throw new Error("Failed to fetch users");
            }
            const userData = await res.json();
            setData(userData);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, data, fetchData };

}

export default getData;
