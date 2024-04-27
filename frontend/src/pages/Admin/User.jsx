import { useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import useData from "../../hooks/useData";

const App = () => {
    const { data, fetchData } = useData();

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader>
                <TableColumn align="start">Name</TableColumn>
                <TableColumn align="start">Email</TableColumn>
                <TableColumn align="start">Status</TableColumn>
                <TableColumn align="start">Reports</TableColumn>
            </TableHeader>
            <TableBody>
                {data.map((user) => (
                    <TableRow key={user.id}>
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
                        <TableCell>{user.name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default App;
