import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importa la librería para decodificar JWT
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Image } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from "@nextui-org/react";
import useChangeProfile from '../hooks/changeProfile'; // Importa el hook personalizado

const Profile = () => {
    const { fetchData, changeProfileImage } = useChangeProfile(); // Usa el hook personalizado para obtener fetchData

    const [userInfo, setUserInfo] = useState(null); // Estado para almacenar la información del usuario actual
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false); // Estado para controlar la visibilidad de la ventana modal de la imagen

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
            const updatedUserData = await fetchData({ userName, password, newPassword });

            const updatedDecodedUserData = jwtDecode(updatedUserData.token);

            setUserInfo(updatedDecodedUserData.userData);

            // Limpiar los campos después de una actualización exitosa
            setUserName('');
            setPassword('');
            setNewPassword('');
        } catch (error) {
            console.error(error);
        }
    }

    // Cuando se inserta la imagen se guarda lista para enviar al servidor
    const handleImageChange = (e) => {
        try {
            const file = e.target.files[0];
            console.log("Archivo: ", file)
            setProfilePhoto(file);
        } catch (e) {
            console.error(e);
        }


    };

    // Llama al hook para cambiar la foto de perfil
    const changeProfilePhoto = async () => {
        try {
            if (!profilePhoto) {
                console.error("No se proporcionó ninguna imagen");
                return;
            }

            const updatedUserData = await changeProfileImage(profilePhoto);

            const updatedDecodedUserData = jwtDecode(updatedUserData.token);

            
            setUserInfo(updatedDecodedUserData.userData);
            setProfilePhoto(updatedDecodedUserData.profilePhoto);



            // Limpiar los campos después de una actualización exitosa

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="flex justify-center items-center">
            <Card className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3">
                <CardHeader className="flex gap-3">
                    {/* Boton para el modal de la imagen */}
                    <Button onClick={() => setShowImageModal(true)} className="p-0 bg-transparent border-none w-16 h-16" >
                        <Image
                            alt="nextui logo"
                            radius="sm"
                            //! Cambiar ruta userInfo.profilePhoto, solo es para comprobar
                            src={userInfo ? userInfo.profilePhoto : ""}
                            className='w-16 h-16'
                        />
                    </Button>
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
                    <p>{userInfo ? userInfo.state : ""} </p>
                </CardBody>
                <Divider />
                <CardFooter>
                    {/* Modal del cambio de datos (nombre y contraseña) */}
                    <Button onPress={onOpen} color="primary">Cambiar datos</Button>
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
                                        <Button color="primary" onClick={() => { handleSubmit(); onClose(); }}>
                                            Confirmar
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </CardFooter>
            </Card>
            {/* Modal de la imagen */}
            <Modal
                backdrop="blur"
                isOpen={showImageModal}
                onOpenChange={() => setShowImageModal(false)}
                placement="center"
            >
                <ModalContent>
                    <ModalHeader>Imagen de perfil</ModalHeader>
                    <ModalBody>
                        <Image
                            alt="nextui logo"
                            src={userInfo ? userInfo.profilePhoto : "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"}
                            width="100%"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Input
                            label="Cambiar la foto de perfil"
                            placeholder='Nueva foto de perfil'
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <Button variant="ghost" onClick={() => { changeProfilePhoto(); setShowImageModal(false); }}>Cambiar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Profile;
