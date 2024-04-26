import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { ChatBubbleLeftRightIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logoblanco.png";
import useLogOut from '../hooks/useLogOut.jsx';
import useBusy from '../hooks/useBusy.jsx';
import useOnline from '../hooks/useOnline.jsx';
// import { Badge } from "@nextui-org/react";

export default function App() {

    const { loading, logout } = useLogOut();
    const { busy } = useBusy();
    const { online } = useOnline();
    const [userInfo, setUserInfo] = useState(null); // Estado para almacenar la información del usuario actual

    const handleBusy = async () => {
        try {
            // Llama a la función busy para actualizar el estado del usuario a "busy"
            await busy();
        } catch (error) {
            toast.error(error.message);
        }
    };
    const handleOnline = async () => {
        try {
            // Llama a la función busy para actualizar el estado del usuario a "busy"
            await online();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Navbar className="bg-azul-600">
            <NavbarBrand>
                <a href="/home" className="block">
                    <img className="h-8 w-auto m-2" src={Logo} alt="KindMail" />
                </a>
            </NavbarBrand>

            <NavbarContent as="div" justify="end">
                <NavbarItem className="relative text-blanco px-3 py-2 text-sm font-medium">
                    <a href="/home">
                        <ChatBubbleLeftRightIcon className="h-7 w-7" aria-hidden="true" />
                    </a>
                </NavbarItem>
                <NavbarItem className="relative text-blanco px-3 py-2 text-sm font-medium">
                    <a href="/profile">
                        <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
                    </a>
                </NavbarItem>
                <Dropdown placement="bottom-end" >
                    {/* <Badge content="" color="success" shape="circle" placement="bottom-right"> */}
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            name="Jason Hughes"
                            size="sm"
                            src={userInfo ? userInfo.profilePhoto : "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"}
                        />
                    </DropdownTrigger>
                    {/* </Badge> */}
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="online" color="success" onClick={handleOnline}>Online</DropdownItem>
                        <DropdownItem key="busy" color="warning" onClick={handleBusy}>Ocupado</DropdownItem>
                        <DropdownItem key="logout" color="danger" onClick={logout}>Cerrar Sesión</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
