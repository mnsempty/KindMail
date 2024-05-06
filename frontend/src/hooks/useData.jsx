import { useState } from "react";
import toast from "react-hot-toast";

const useData = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [reportData, setReportData] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Datos de usuarios
            const userRes = await fetch("http://localhost:5000/api/user/get-users");
            if (!userRes.ok) {
                throw new Error("Failed to fetch users");
            }
            const userData = await userRes.json();
            setData(userData);

            // Denuncias
            const reportRes = await fetch("http://localhost:5000/api/user/get-reports");
            if (!reportRes.ok) {
                throw new Error("Failed to fetch reports");
            }
            const reportData = await reportRes.json();
            setReportData(reportData);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, data, reportData, fetchData };
};

export default useData;
