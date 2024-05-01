import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Divider, Textarea, Input, Button } from "@nextui-org/react";
import { SendIcon } from "../assets/icons/SendIcon";
import useSendFirstMessage from '../hooks/sendFirstMessage';

const Inbox = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [message, setMessage] = useState('');
    const [messageHeader, setMessageHeader] = useState('');
    const navigate = useNavigate();
    const { sendMessage, isLoading } = useSendFirstMessage();

    useEffect(() => {
        const userData = getUserDataLocalStorage();
        setUserInfo(userData);
    }, []);

    const getUserDataLocalStorage = () => {
        const userInfo = localStorage.getItem('selectedUser');
        if (!userInfo) return null;
        const decodedUserInfo = JSON.parse(userInfo);
        return decodedUserInfo;
    };

    const handleSendMessage = async () => {
        if (!userInfo || !message) return;
        try {
            await sendMessage({ header: messageHeader, content: message, receiver: userInfo.email });
            setMessage('');
            setMessageHeader('');
            navigate('/');
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    };

    return (
        <>
            <h2 className='text-4xl font-light mb-5'>Bandeja de entrada</h2>
            <div className="border p-5 shadow rounded flex">
                <User></User>
                <p>Asunto</p>
            </div>
        </>
    );
};

export default Inbox;