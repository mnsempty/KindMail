import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from '../assets/logoblanco.png';

//Links
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {

    const btnNavBarLink = "text-white hover:bg-azulclaro hover:text-azul px-3 rounded-md py-2 text-sm font-medium";
    const btnNavBarLinkCollapse = "text-gray-300 hover:bg-azulclaro hover:text-azul block px-3 py-2 text-base font-medium";

    return (
        <Disclosure as="nav" className="bg-azul">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex-shrink-0">
                                {/* Logo */}
                                <Link to="/" className="block">
                                    <img className="h-8 w-auto m-2" src={Logo} alt="KindMail" />
                                </Link>
                            </div>
                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                {/* Opciones */}
                                <div className="flex space-x-4">
                                    <Link to="/login" className={btnNavBarLink}>Login</Link>
                                    <Link to="/register" className={btnNavBarLink}>Sing Up</Link>
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
                        </div>
                    </div>

                    {/* Panel de Collapse para móvil */}
                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link to="/login" className={btnNavBarLinkCollapse}>Login</Link>
                            <Link to="/register" className={btnNavBarLinkCollapse}>Sing Up</Link>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
