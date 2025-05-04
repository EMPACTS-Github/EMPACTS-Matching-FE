import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@heroui/react";
import Image from "next/image";
import AvatarPlaceholder from "/public/assets/avatar-placeholder.png";
import { useState, useEffect } from "react";
import LabelWithTextarea from '@/components/FormInput/LabelWithTextarea';
import { Member } from "@/interfaces/StartupProfile";

interface EditMemberTitleModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    member: Member | null;
}

const EditMemberTitleModal: React.FC<EditMemberTitleModalProps> = ({ isOpen, onOpenChange, member }) => {
    const [titleField, setTitleField] = useState("");
    useEffect(() => {
        if (member) {
            setTitleField(member.position_title);
        }
    }, [member]);

    return (
        <Modal
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{
                body: "h-6",
            }}
        >
            <ModalContent className="pt-1">
                {(onOpenChange) => (
                    <>
                        <ModalHeader className="items-center ">
                            <div>
                                <h3 className="text-lg text-black mb-1">Edit position title for <span className="text-[#9200FE]">{member?.user_id.name}</span></h3>
                                <div className="font-normal text-gray-400 text-xs">We take certain actions for the safety of our users</div>
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <LabelWithTextarea
                                label="New position title"
                                content={titleField || ""}
                                setContent={setTitleField}
                                minRows={1}
                                placeholder="Enter new title"
                            />
                        </ModalBody>
                        <ModalFooter className="flex justify-between mt-20">
                            <Button className="w-1/2 border-2" variant="light" onPress={onOpenChange}>Cancel</Button>
                            <Button className="bg-[#9200FE] text-white w-1/2" onPress={onOpenChange}>Save</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditMemberTitleModal;
