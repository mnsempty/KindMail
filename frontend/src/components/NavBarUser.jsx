import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Logo from '../assets/logoblanco.png';
import { Link } from "react-router-dom";
import useLogOut from '../hooks/useLogOut.jsx';
import useBusy from '../hooks/useBusy.jsx';

export default function NavBarUser() {

    const { loading, logout } = useLogOut();
    const { busy } = useBusy();
    const handleBusy = async () => {
        try {
            // Llama a la función busy para actualizar el estado del usuario a "busy"
            await busy();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Disclosure as="nav" className="bg-azul">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0">
                                    {/* Logo */}
                                    <Link to="/home" className="block">
                                        <img className="h-8 w-auto m-2" src={Logo} alt="KindMail" />
                                    </Link>
                                </div>
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                {/* Líneas de Collapse para móvil */}
                                <Disclosure.Button className="inline-flex items-center m-2 justify-center rounded-md p-2 text-white hover:bg-azulclaro hover:text-negro focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Abrir menú principal</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Estado dropdown */}

                                <Link to="/home"><button
                                    type="button"
                                    className="relative text-blanco hover:bg-azulclaro hover:text-azul rounded-md px-3 py-2 text-sm font-medium">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Ver notificaciones</span>
                                    <ChatBubbleLeftRightIcon className="h-6 w-6" aria-hidden="true" />
                                </button></Link>

                                {/* Perfil dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Abrir menú del usuario</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src=""
                                                alt="Imagen Perfil Usuario" />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                <Link to="/profile" className="block px-4 py-2 text-sm text-negro">
                                                    Perfil
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <p className="block px-4 py-2 text-sm text-negro cursor-pointer" onClick={handleBusy}>
                                                    Ocupado
                                                </p>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <p className="block px-4 py-2 text-sm text-negro cursor-pointer" onClick={logout}>
                                                    Cerrar Sesión
                                                </p>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    )
}
