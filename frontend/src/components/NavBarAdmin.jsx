import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { ChatBubbleLeftRightIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logoblanco.png";
import useLogOut from '../hooks/useLogOut.jsx';

export default function App() {

    const { loading, logout } = useLogOut();

    return (
        <Navbar className="bg-azul-600">
            <NavbarBrand>
                <a href="/home" className="block">
                    <img className="h-8 w-auto m-2" src={Logo} alt="KindMail" />
                </a>
            </NavbarBrand>

            <NavbarContent as="div" justify="end">
                {/* Mensajes denunciados */}
                <NavbarItem className="relative text-blanco hover:bg-azulclaro-100 hover:text-azul-600 rounded-md px-3 py-2 text-sm font-medium">
                    <a href="#">Denuncias</a>
                </NavbarItem>
                {/* Usuarios */}
                <NavbarItem className="relative text-blanco hover:bg-azulclaro-100 hover:text-azul-600 rounded-md px-3 py-2 text-sm font-medium">
                    <a href="#">Usuarios</a>
                </NavbarItem>
                <NavbarItem className="relative text-blanco hover:bg-azulclaro-100 hover:text-azul-600 rounded-md px-3 py-2 text-sm font-medium">
                    <a href="/home">
                        <ChatBubbleLeftRightIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                </NavbarItem>
                <NavbarItem className="relative text-blanco hover:bg-azulclaro-100 hover:text-azul-600 rounded-md px-3 py-2 text-sm font-medium">
                    <a href="/profile">
                        <UserCircleIcon className="h-7 w-7" aria-hidden="true" />
                    </a>
                </NavbarItem>
                <Dropdown placement="bottom-end" >
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
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="logout" color="danger" onClick={logout}>Cerrar Sesión</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
