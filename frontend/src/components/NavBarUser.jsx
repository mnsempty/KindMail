import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { ChatBubbleLeftRightIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logoblanco.png";
import useLogOut from '../hooks/useLogOut.jsx';
import useBusy from '../hooks/useBusy.jsx';
import useOnline from '../hooks/useOnline.jsx';
import { Badge } from "@nextui-org/react";

export default function App() {

    const { loading, logout } = useLogOut();
    const { busy } = useBusy();
    const { online } = useOnline();

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
                    {/* TO DO: poner cantidad de mensajes total */}
                    <Badge content="5" className="bg-rosa-400" placement="bottom-right">
                        <a href="/home">
                            <ChatBubbleLeftRightIcon className="h-7 w-7" aria-hidden="true" />
                        </a>
                    </Badge>
                </NavbarItem>
                <NavbarItem className="relative text-blanco px-3 py-2 text-sm font-medium">
                    <a href="/profile">
                        <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
                    </a>
                </NavbarItem>
                <Dropdown placement="bottom-end" >
                    {/* TO DO: condición de que cuando este online salga verde y cuando este ocupado salga amarillo */}
                    <Badge content="" color="success" shape="circle" placement="bottom-right">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                name="Jason Hughes"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                    </Badge>
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
