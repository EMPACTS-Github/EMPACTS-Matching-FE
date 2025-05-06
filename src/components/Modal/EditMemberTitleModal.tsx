import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@heroui/react";
import { startup_member_edit_title } from "@/apis/startup-member"
import { useState, useEffect } from "react";
import LabelWithTextarea from '@/components/FormInput/LabelWithTextarea';
import { Member } from "@/interfaces/StartupProfile";

interface EditMemberTitleModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    member: Member | null;
    startupId: number | undefined;
}

const EditMemberTitleModal: React.FC<EditMemberTitleModalProps> = ({ isOpen, onOpenChange, member, startupId }) => {
    const [titleField, setTitleField] = useState("");
    const [oldTitle, setOldTitle] = useState("");
    const editTitle = async () => {
        if (titleField != oldTitle) {
            const data = {
                startup_id: startupId,
                position_title: titleField,
            }
            console.log("data", data);
            try {
                const res = await startup_member_edit_title(member?.id, data);
                console.log("res", res);
            } catch (err) {
                console.error('Failed to edit position title:', err);
            }
        }
        onOpenChange();
    };

    useEffect(() => {
        if (member) {
            setTitleField(member.position_title);
            setOldTitle(member.position_title);
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
                            <Button className="bg-[#9200FE] text-white w-1/2" onPress={editTitle}>Save</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditMemberTitleModal;
