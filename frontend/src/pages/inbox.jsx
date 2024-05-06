import { useEffect, useState } from 'react';
import { User } from '@nextui-org/react';
import useGetEmails from '../hooks/getEmails';
import EmailModal from '../components/emails/EmailModal';

const Inbox = () => {
    const [emails, setEmails] = useState([]);
    const { getEmail } = useGetEmails();
    const [selectedEmail, setSelectedEmail] = useState(null); // Agregar estado para el email seleccionado
    const [modalOpen, setModalOpen] = useState(false); // Agregar estado para controlar la apertura/cierre del modal

    useEffect(() => {
        getEmail()
            .then(emails => {
                setEmails(emails);
            })
            .catch(error => {
                console.error("Error al obtener los correos electrónicos:", error);
            });
    }, []);

    const openModal = (email) => {
        setSelectedEmail(email);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEmail(null);
        setModalOpen(false);
    };

    return (
        <>
            <h2 className='text-4xl font-light mb-5 dark:text-negro flex justify-center'>Bandeja de entrada</h2>
            {emails && emails.map((email, index) => (
                <div key={index} className="border-2 border-azul-600 p-5 shadow rounded flex mb-3 dark:text-negro cursor-pointer dark:hover:bg-slate-600 hover:bg-slate-100" onClick={() => openModal(email)}>
                    <User
                        name={email ? email.name : 'Remitente'}
                        avatarProps={{
                            src: email ? email.profilePhoto : "https://avatars.githubusercontent.com/u/30373425?v=4"
                        }}
                    />
                    <div className="ml-3 flex items-center font-bold">
                        <p className="mb-1">{email.header}</p>
                    </div>
                </div>
            ))}
            <EmailModal email={selectedEmail} isOpen={modalOpen} onClose={closeModal} />
        </>
    );
};

export default Inbox;
