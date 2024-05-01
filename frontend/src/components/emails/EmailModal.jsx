import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button,Divider } from '@nextui-org/react';

const EmailModal = ({ email, isOpen, onClose }) => {
    return (
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onClose} placement="center">
            <ModalContent>
                <ModalHeader>{email && email.name}</ModalHeader>
                <ModalBody>
                    <p>{email && email.header}</p>
                    <Divider/>
                    <p>{email && email.content}</p>
                    {/* Aquí puedes añadir más información del email, si lo deseas */}
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onPress={onClose}>Cerrar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EmailModal;
