import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { ChatBubbleLeftRightIcon} from "@heroicons/react/24/outline";
import Logo from "../assets/logoblanco.png";
import useLogOut from '../hooks/useLogOut.jsx';
import useBusy from '../hooks/useBusy.jsx';
import useOnline from '../hooks/useOnline.jsx';
import toast from "react-hot-toast";
// import { Badge } from "@nextui-org/react";

import { SunIcon } from "../assets/icons/sunIcon";
import { MoonIcon } from "../assets/icons/moonIcon";
import EnvelopeIcon from "../assets/icons/envelop.jsx";
import { useNavigate } from 'react-router-dom';

export default function App() {
    const navigate = useNavigate();

    const { logout } = useLogOut();
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

    let isProfilePage = location.pathname === '/profile';
    let navPath = isProfilePage ? '/home' : '/profile';
    let navText = isProfilePage ? 'Home' : 'Perfíl';

    return (
        <Navbar className="bg-azul-600">
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
                    {isDarkMode ? (<SunIcon />) : (<MoonIcon />)}
                </button>

                {location.pathname === '/inbox' ? (
                    <NavbarItem className="relative text-blanco px-3 py-2 text-sm font-medium dark:text-negro">
                        <a href="/home">
                            <ChatBubbleLeftRightIcon className="h-7 w-7" aria-hidden="true" />
                        </a>
                    </NavbarItem>
                ) : (
                    <NavbarItem className="relative text-blanco px-3 py-2 text-sm font-medium dark:text-negro">
                        <a href="/inbox">
                            <EnvelopeIcon />
                        </a>
                    </NavbarItem>
                )}
                <Dropdown placement="bottom-end" >
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            isFocusable
                            className="transition-transform cursor-pointer"
                            name="Jason Hughes"
                            size="sm"
                            src={userInfo ? userInfo.profilePhoto : "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" color="secondary" className="dark:text-negro dark:hover:text-purple-400" onClick={() => navigate(navPath)}
                        >
                            {navText}
                        </DropdownItem>
                        <DropdownItem key="online" color="success" className="dark:text-negro dark:hover:text-emerald-400" onClick={handleOnline}>Online</DropdownItem>
                        <DropdownItem key="busy" color="warning" className="dark:text-negro dark:hover:text-yellow-400" onClick={handleBusy}>Ocupado</DropdownItem>
                        <DropdownItem key="logout" color="danger" className="dark:text-negro dark:hover:text-red-400" onClick={logout}>Cerrar Sesión</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
