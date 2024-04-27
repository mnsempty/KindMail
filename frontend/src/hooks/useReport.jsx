import toast from "react-hot-toast";
import { useState, useContext } from "react";
import GlobalStateContext from "../components/home/GlobalStateContext";

const useReport = () => {

    const { ChatIds } = useContext(GlobalStateContext);
    const [loading, setLoading] = useState(false);
    const report = async () => {
        let email1 = 1;
        let email2 = 2;

        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/user/report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email1, email2 })
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Usuario denunciado correctamente");
            } else {
                throw new Error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { report };
};

export default useReport;
