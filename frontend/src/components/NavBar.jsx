import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, } from "@nextui-org/react";
import Logo from "../assets/logoblanco.png";

export default function App() {

    return (
        <Navbar shouldHideOnScroll className="bg-azul-600">
            <NavbarBrand>
                <a href="/home" className="block">
                    <img className="h-8 w-auto m-2" src={Logo} alt="KindMail" />
                </a>
            </NavbarBrand>

            <NavbarContent justify="end">
                <NavbarItem>
                    <a href="/login" className="text-blanco px-3 py-2">Login</a>
                </NavbarItem>
                <NavbarItem>
                    <a href="/register" className="text-blanco hover:bg-azulclaro-100 hover:text-azul-600 px-3 border rounded-md py-2">Sing Up</a>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
