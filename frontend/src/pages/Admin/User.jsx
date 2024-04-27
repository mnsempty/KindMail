import { useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/outline"; // Importar el ícono de la papelera de Heroicons en 24 píxeles y variante "outline"
import useData from "../../hooks/useData";
import useDelete from "../../hooks/useDelete";
import toast from "react-hot-toast";

const App = () => {
    const { data, reportData, fetchData } = useData();
    const { deletedUser, deleteUser } = useDelete();

    useEffect(() => {
        fetchData();
        deleteUser();
    }, []);

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

    // Función para manejar la eliminación de un usuario
    const handleDeleteUser = async (email) => {
        try {
            await deletedUser(email); 
        } catch (error) {
            toast.error(error.message);
        }
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
                            <TrashIcon className="h-6 w-6" onClick={() => handleDeleteUser(user.email)} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default App;
