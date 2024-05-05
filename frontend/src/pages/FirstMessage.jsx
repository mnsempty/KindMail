import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Divider, Textarea, Input, Button } from "@nextui-org/react";
import { SendIcon } from "../assets/icons/SendIcon";
import useSendFirstMessage from '../hooks/sendFirstMessage';

const FirstMessage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [message, setMessage] = useState('');
    const [messageHeader, setMessageHeader] = useState('');
    const navigate = useNavigate();
    const { sendMessage} = useSendFirstMessage();

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
            <div className="shadow rounded-lg border p-5 dark:text-negro flex flex-col justify-end">
                <div className="mb-2">Para:</div>
                <div className="flex justify-start">
                <User
                    name={userInfo ? userInfo.name : 'Destinatario'}
                    avatarProps={{
                        src: userInfo ? userInfo.profilePhoto : "https://avatars.githubusercontent.com/u/30373425?v=4"
                    }}
                />
                </div>
                <Divider className="m-3" />
                <div className="mb-2">Asunto</div>
                <Input type="text" classNames={{
                    input: [
                        "h-6 ",
                    ],
                }} placeholder="¡Saluda!" value={messageHeader} onChange={(e) => setMessageHeader(e.target.value)} />
                <Input type="text" className="hidden" value={userInfo ? userInfo.email : ""}></Input>
                <Divider className="m-3" />
                <div className="mb-2">Mensaje</div>
                <div className="flex flex-col md:flex-row md:items-end gap-2">
                    <Textarea
                        placeholder="Escribe aqui tus buenas palabras..."
                        className="max-w-full h-20 rounded"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <Button
                    className="bg-azul h-10 w-16 rounded-lg self-end mt-5"
                    onClick={handleSendMessage}
                >
                    <SendIcon />
                </Button>
            </div>
        </>
    );
};

export default FirstMessage;
