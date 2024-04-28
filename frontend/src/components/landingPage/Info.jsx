import React, { useEffect } from "react";
import { UserCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import useChats from "../../hooks/quantityChat";
import useUser from "../../hooks/quantityUser";

const Cart = () => {

    const btn = "w-20 py-3 flex justify-center text-azul bg-azulclaro rounded-md mb-4";
    const { loading, chats, getChat } = useChats();
    const { user, getUser } = useUser();

    useEffect(() => {
        getChat();
        getUser();
    }, []);

    return (
        <div>
            <div className="container max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-50 px-8 py-10 border rounded-md">
                        <div className={btn}>
                            <UserCircleIcon className="w-8 h-8" />
                        </div>
                        <h4 className="font-medium text-gray-700 text-lg mb-4">Usuarios</h4>
                        <p className="font-normal text-gray-500 text-md">Únete a nuestra comunidad de {user} usuarios y descubre todo lo que tenemos para ofrecerte. ¡<a className="text-azul" href="/register">Regístrate</a> ahora y sé parte de nuestra familia!</p>
                    </div>
                    <a href="/register">
                        <div className="bg-gray-50 px-8 py-10 border rounded-md">
                            <div className={btn}>
                                <ChatBubbleLeftRightIcon className="w-8 h-8" />
                            </div>
                            <h4 className="font-medium text-gray-700 text-lg mb-4">Chats</h4>
                            {/* Verifica si los chats están cargando */}
                            {loading ? (
                                <p>Cargando...</p>
                            ) : (
                                <p className="font-normal text-gray-500 text-md">¡Conéctate con {chats} conversaciones activas y sumérgete en nuevas experiencias! ¿Quieres unirte a la charla? ¡Haz clic aquí para participar!</p>
                            )}
                        </div>
                    </a>
                </div>
            </div >
        </div >
    );
};

export default Cart;
