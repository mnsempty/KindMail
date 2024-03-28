import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importa la librería para decodificar JWT
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Image } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import useChangeProfile from '../hooks/changeProfile'; // Importa el hook personalizado



const Profile = () => {
    const { fetchData } = useChangeProfile(); // Usa el hook personalizado para obtener fetchData

    const [userInfo, setUserInfo] = useState(null); // Estado para almacenar la información del usuario actual
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Función para obtener la información del usuario del localStorage
    const getUserDataLocalStorage = () => {
        const userInfo = localStorage.getItem('chat-user');
        if (!userInfo) return null;

        const decodedUserInfo = jwtDecode(userInfo);
        return decodedUserInfo.userData;
    };

    useEffect(() => {
        // Obtén la información del usuario del localStorage
        const userData = getUserDataLocalStorage();
        // Actualiza el estado con la información del usuario
        setUserInfo(userData);
    }, []); // Este useEffect se ejecuta una vez al cargar el componente


    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSubmit = async () => {
        try {
            await fetchData({ userName, password, newPassword });
        } catch (error) {
            console.error(error);
        }
    }
        return (
            <div className="flex justify-center items-center">
                <Card className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3">
                    <CardHeader className="flex gap-3">
                        <Image
                            alt="nextui logo"
                            height={80}
                            radius="sm"
                            // src={userInfo.profilePhoto}
                            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                            width={80}
                        />
                        <div className="flex flex-col">
                            {/* Renderiza los datos del usuario si están disponibles */}
                            {userInfo && (
                                <>
                                    <p className="text-xl">{userInfo.name}</p>
                                    <p className="text-md text-default-500">{userInfo.email}</p>
                                </>
                            )}
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p>Estado</p>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Button onPress={onOpen} color="primary">Open Modal</Button>
                        <Modal
                            backdrop="blur"
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            placement="top-center"
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Cambiar datos</ModalHeader>
                                        <ModalBody>
                                            <Input
                                                autoFocus
                                                label="Nuevo nombre de usuario"
                                                placeholder={userInfo.name}
                                                variant="bordered"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                            <Input

                                                label="Contraseña"
                                                placeholder="Introduce tu contraseña actual"
                                                type="password"
                                                variant="bordered"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <Input

                                                label="Nueva contraseña"
                                                placeholder="Introduce la nueva contraseña"
                                                type="password"
                                                variant="bordered"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />

                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="flat" onPress={onClose}>
                                                Cerrar
                                            </Button>
                                            <Button color="primary" onPress={handleSubmit}>
                                                Confirmar
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </CardFooter>
                </Card>
            </div>
        )
    }

export default Profile;
