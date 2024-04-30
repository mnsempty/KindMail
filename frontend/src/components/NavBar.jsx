import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Logo from "../assets/logoblanco.png";
import { useEffect, useState } from "react";

import { SunIcon } from "../assets/icons/sunIcon";
import { MoonIcon } from "../assets/icons/moonIcon";

export default function App() {

    let [isDarkMode, setIsDarkMode] = useState(false);

    // toggle darkmode
    let toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        let rootDiv = document.body;
        if (rootDiv) {
            rootDiv.className = isDarkMode ? 'dark' : 'light';
        }
    }, [isDarkMode]);
    return (
        <Navbar shouldHideOnScroll className="bg-azul-600">
            <NavbarBrand>
                <a href="/home" className="block">
                    <img className="h-8 w-auto m-2" src={Logo} alt="KindMail" />
                </a>
            </NavbarBrand>

            <NavbarContent justify="end">

                <button
                    onClick={toggleDarkMode}
                    className="flex items-center justify-center p-2 rounded-lg transition duration-200 "
                >
                    {isDarkMode ? (<SunIcon/>):(<MoonIcon/>)}
                </button>
                <NavbarItem>
                    <a href="/login" className="text-blanco px-3 py-2 dark:text-negro">Login</a>
                </NavbarItem>
                <NavbarItem>
                    <a href="/register" className="text-blanco hover:bg-azulclaro-100 hover:text-azul-600 dark:hover:text-azul-700 px-3 border rounded-md py-2 dark:text-negro">Sing Up</a>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
