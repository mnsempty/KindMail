import React, { useEffect } from "react";
import { UserCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import useChats from "../../hooks/quantityChat";
import useUser from "../../hooks/quantityUser";

const Cart = () => {

    const btn = "w-20 py-3 flex justify-center text-azul bg-azulclaro rounded-md mb-4 hover:bg-azul hover:text-blanco";
    const { loading, chats, getChat } = useChats();
    const { user, getUser } = useUser();

    useEffect(() => {
        getChat();
        getUser();
    }, []);

    return (
        <div className="py-10 md:py-16">
            <div className="container max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-50 px-8 py-10 rounded-md">
                        <div className={btn}>
                            <UserCircleIcon className="w-8 h-8" />
                        </div>
                        <h4 className="font-medium text-gray-700 text-lg mb-4">Usuarios</h4>
                        <p className="font-normal text-gray-500 text-md">¡Contamos con {user} usuarios! ¿Por qué no te unes POR FAVOR?</p>
                    </div>
                    <div className="bg-gray-50 px-8 py-10 rounded-md">
                        <div className={btn}>
                            <ChatBubbleLeftRightIcon className="w-8 h-8" />
                        </div>
                        <h4 className="font-medium text-gray-700 text-lg mb-4">Chats</h4>
                        {/* Verifica si los chats están cargando */}
                        {loading ? (
                            <p>Cargando...</p>
                        ) : (
                            <p className="font-normal text-gray-500 text-md">¡Ya tenemos {chats} chats activos! Únete tu también y forma parte de nuestra creciente comunidad</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
