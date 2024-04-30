import React, { useEffect, useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { UsersIcon, ChatBubbleLeftRightIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logoblanco.png";
import useLogOut from '../hooks/useLogOut.jsx';

import { SunIcon } from "../assets/icons/sunIcon";
import { MoonIcon } from "../assets/icons/moonIcon";

export default function App() {

    const { loading, logout } = useLogOut();
    const [userInfo, setUserInfo] = useState(null); // Estado para almacenar la información del usuario actual

    let [isDarkMode, setIsDarkMode] = useState(() => {
        let savedDarkMode = localStorage.getItem('darkMode');
        return savedDarkMode ? savedDarkMode === 'true' : false;
    });

    // toggle darkmode
    let toggleDarkMode = () => {
        let newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        // Guarda el nuevo estado en localStorage
        localStorage.setItem('darkMode', newDarkMode.toString());
    };

    useEffect(() => {
        let rootDiv = document.body;
        if (rootDiv) {
            rootDiv.className = isDarkMode ? 'dark' : 'light';
        }
    }, [isDarkMode]);

    return (
        <Navbar className="bg-azul-600">
            <NavbarBrand>
                <a href="/home" className="block">
                    <img className="h-8 w-auto m-2" src={Logo} alt="KindMail" />
                </a>
            </NavbarBrand>

            <NavbarContent as="div" justify="end">
                <button
                    onClick={toggleDarkMode}
                    className="flex items-center justify-center p-2 rounded-lg transition duration-200 "
                >
                    {isDarkMode ? (<SunIcon />) : (<MoonIcon />)}
                </button>
                <NavbarItem className="relative text-blanco px-3 py-2 text-sm font-medium dark:text-negro">
                    <a href="/user-admin">
                        <UsersIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                </NavbarItem>
                <NavbarItem className="relative text-blanco px-3 py-2 text-sm font-medium dark:text-negro">
                    <a href="/home">
                        <ChatBubbleLeftRightIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                </NavbarItem>
                <NavbarItem className="relative text-blanco px-3 py-2 text-sm font-medium dark:text-negro">
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
                            src={userInfo ? userInfo.profilePhoto : "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"}
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
