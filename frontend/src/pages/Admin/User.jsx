import { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import useData from "../../hooks/useData";
import useDelete from "../../hooks/useDelete";
import toast from "react-hot-toast";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const App = () => {
    const { data, reportData, fetchData } = useData();
    const { loading, deleteUser } = useDelete();

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteUser = async (email) => {
        try {
            await deleteUser(email);
            toast.success("Usuario eliminado correctamente");
            fetchData();
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Función para contar las denuncias de un usuario específico
    const getReportCount = (email) => {
        if (!reportData || !Array.isArray(reportData.allReports)) return 0; // Verificar si hay datos de denuncias

        // Filtrar y parsear los informes válidos
        const validReports = reportData.allReports.filter(report => {
            try {
                const parsedReport = JSON.parse(report);
                return typeof parsedReport === "object" && parsedReport !== null; // Verificar si es un objeto JSON válido
            } catch (error) {
                return false; // Ignorar los informes que no se pueden analizar
            }
        });

        // Contar las denuncias para el correo electrónico dado en los campos email1 y email2 de los informes válidos
        const count = validReports.reduce((acc, reportJSON) => {
            const { email1, email2 } = JSON.parse(reportJSON);
            if (email1 === email || email2 === email) {
                return acc + 1; // Incrementar el contador si el correo electrónico aparece en el informe
            }
            return acc;
        }, 0);

        return count; // Devolver el recuento de denuncias
    };

    // Función para determinar si se debe mostrar el ícono de advertencia
    const showWarningIcon = (email) => {
        const reportCount = getReportCount(email);
        return reportCount > 3;
    };

    return (
        <Table aria-label="Tabla de usuarios con opciones de eliminar">
            <TableHeader>
                <TableColumn align="start">Nombre</TableColumn>
                <TableColumn align="start">Email</TableColumn>
                <TableColumn align="start">Estado</TableColumn>
                <TableColumn align="start">Denuncias</TableColumn>
                <TableColumn align="start">Eliminar</TableColumn> {/* Encabezado para la columna de eliminar */}
            </TableHeader>
            <TableBody>
                {data.map((user) => (
                    <TableRow key={user.email}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            <Chip
                                size="sm"
                                variant="flat"
                                className={`${user.state === "online" ? "bg-lime-400" :
                                    user.state === "offline" ? "bg-red-500" :
                                        user.state === "busy" ? "bg-yellow-300" :
                                            "bg-stone-300"
                                    }`}
                            >
                                {user.state}
                            </Chip>
                        </TableCell>
                        <TableCell>{getReportCount(user.email)}</TableCell>
                        <TableCell>
                            <div className="flex items-center">
                                <TrashIcon className="h-6 w-6 cursor-pointer" onClick={() => handleDeleteUser(user.email)} />
                                {showWarningIcon(user.email) && (
                                    <div className="flex items-center">
                                        <ExclamationCircleIcon className="h-6 w-6 text-yellow-500 mr-2 cursor-pointer" />
                                        <p className="text-yellow-500">{user.name} tiene más de 3 denuncias</p>
                                    </div>
                                )}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default App;
