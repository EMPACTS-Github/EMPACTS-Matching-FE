import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import Image from "next/image";
import AvatarPlaceholder from "/public/assets/avatar-placeholder.png";
import { useState } from "react";
import { Textarea } from "@heroui/input";


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
            classNames={{
                body: "h-6",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex gap-1 items-center ">
                            <Image src={AvatarPlaceholder} alt={mentorName} width={80} height={80} className="rounded-full" />
                            <div className="ml-4">
                                <h3 className="text-lg text-black font-semibold">Connect with <span className="text-[#9200FE]">{mentorName}</span></h3>
                                <p className="text-sm text-gray-500"><span className="text-[#9200FE]">{mentorName}</span> will be able to view your advanced information and documentation when you request to connect</p>
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Time</label>
                                    <Input type="text" value="10:00 - 11:00 Thursday" readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Note</label>
                                    <Textarea 
                                        classNames={{
                                            input: "min-h-[40px]",
                                        }} 
                                        radius='none'
                                        variant="underlined" 
                                        placeholder="Leave a note for mentor"
                                        onHeightChange={(height) => console.log(height)}
                                        value={note}
                                     />;
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex justify-between mt-20">
                            <Button className="w-1/2 border-2" variant="light" onPress={onClose}>Cancel</Button>
                            <Button className="bg-[#9200FE] text-white w-1/2" onPress={onClose}>Connect</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ConnectModal;
