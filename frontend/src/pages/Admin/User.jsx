import React, { useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import getData from "../../hooks/getData";

const App = () => {
    const { loading, data, fetchData } = getData();

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader>
                <TableColumn align="start">Name</TableColumn>
                <TableColumn align="start">Email</TableColumn>
                <TableColumn align="start">Status</TableColumn>
            </TableHeader>
            <TableBody>
                {data.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            <Chip color={statusColorMap[user.status]} size="sm" variant="flat">
                                {user.status}
                            </Chip>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default App;
