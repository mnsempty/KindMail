import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from '../assets/logoblanco.png';

//Links
import { Link, NavLink } from "react-router-dom";

export default function NavBarUser() {

    const btnNavBarLink = "text-white hover:bg-azulclaro hover:text-azul px-3 rounded-md py-2 text-sm mt-2 font-medium";
    const btnNavBarLinkCollapse = "text-gray-300 hover:bg-azulclaro hover:text-azul block px-3 py-2 text-base font-medium";

    return (
        <Disclosure as="nav" className="bg-azul">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0">
                                    {/* Logo */}
                                    <Link to="/" className="block">
                                        <img className="h-8 w-auto m-2" src={Logo} alt="KindMail" />
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {/* <Link to="/messages-admin" className={btnNavBarLink}>Mensajes</Link>
                                        <Link to="/user-admin" className={btnNavBarLink}>Usuarios</Link>
                                        <Link to="/chat-admin" className={btnNavBarLink}>Chat</Link> */}
                                    </div>
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
                                <button
                                    type="button"
                                    className="relative text-blanco hover:bg-azulclaro hover:text-azul rounded-md px-3 py-2 text-sm font-medium">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Ver notificaciones</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
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
                                                {({ active }) => (
                                                    <a href="#" className={(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-negro')}>
                                                        Perfil</a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a href="#" className={(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-negro')}>
                                                        Cerrar Sesión</a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {/* <Link to="/messages-admin" className={btnNavBarLinkCollapse}>Mensajes</Link>
                            <Link to="/user-admin" className={btnNavBarLinkCollapse}>Usuarios</Link>
                            <Link to="/chat-admin" className={btnNavBarLinkCollapse}>Chat</Link> */}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
