import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import Image from "next/image";
import AvatarPlaceholder from "/public/assets/avatar-placeholder.png";
import { useState } from "react";
import LabelWithTextarea from '@/components/FormInput/LabelWithTextarea';

interface ConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    mentorName: string;
}

const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose, mentorName }) => {
    const [note, setNote] = useState("");

    return (
        <Modal
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={isOpen}
            onOpenChange={onClose}
            size="2xl"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex gap-1 items-center ">
                            <Image src={AvatarPlaceholder} alt={mentorName} width={80} height={80} className="rounded-full" />
                            <div className="ml-4">
                                <h3 className="text-lg text-black font-semibold">Connect with <span className="text-empacts">{mentorName}</span></h3>
                                <p className="text-sm text-gray-500"><span className="text-empacts">{mentorName}</span> will be able to view your advanced information and documentation when you request to connect</p>
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <LabelWithTextarea
                                label="Note"
                                content={note}
                                setContent={setNote}
                                minRows={3}
                                placeholder="Leave a note for mentor"
                            />
                        </ModalBody>
                        <ModalFooter className="flex justify-between mt-20">
                            <Button className="w-1/2 border-2" variant="light" onPress={onClose}>Cancel</Button>
                            <Button className="bg-empacts text-white w-1/2" onPress={onClose}>Connect</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ConnectModal;
