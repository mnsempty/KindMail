import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import Logo from "../assets/logoblanco.png";

export default function App() {

    const btnNavBarLink = "text-white hover:bg-azulclaro hover:text-azul px-3 rounded-md py-2 text-sm font-medium";

    return (
        <Navbar shouldHideOnScroll className="bg-azul">
            <NavbarBrand>
                <a href="/home" className="block">
                    <img className="h-8 w-auto m-2" src={Logo} alt="KindMail" />
                </a>
            </NavbarBrand>

            <NavbarContent justify="end">
                <NavbarItem>
                    <a href="/login" className={btnNavBarLink}>Login</a>
                </NavbarItem>
                <NavbarItem>
                    <a href="/register" className={btnNavBarLink}>Sing Up</a>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
