import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider } from '@nextui-org/react';

const EmailModal = ({ email, isOpen, onClose }) => {
    return (
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onClose} placement="center" className='dark:text-negro'>
            <ModalContent>
                <ModalHeader>{email && email.name}</ModalHeader>
                <ModalBody>
                    <p>{email && email.header}</p>
                    <Divider/>
                    <p>{email && email.content}</p>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-4 py-2' variant="ghost" onPress={onClose}>Cerrar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EmailModal;
