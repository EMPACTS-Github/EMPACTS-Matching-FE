import { Modal, ModalContent, ModalHeader, ModalFooter, Button } from "@heroui/react";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import { Member } from "@/interfaces/StartupProfile";

interface DeleteMemberModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    member: Member | null;
}

const DeleteMemberModal: React.FC<DeleteMemberModalProps> = ({ isOpen, onOpenChange, member }) => {
    return (
        <Modal
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            size="xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent className="pt-1">
                {(onOpenChange) => (
                    <>
                        <ModalHeader className="items-center ">
                            <div className="flex">
                                <DeleteIcon className="w-16 h-16 text-danger mr-6" />
                                <div>
                                    <h3 className="text-lg text-black mb-1">Are you sure you want to delete?</h3>
                                    <div className="font-normal text-gray-400 text-sm"><span className="text-[#9200FE]">{member?.user_id.name}</span> account will automatically be deleted and will not be able to access to this startup profile anymore.</div>
                                </div>
                            </div>
                        </ModalHeader>
                        <ModalFooter className="flex justify-between">
                            <Button className="w-1/2 border-2" variant="light" onPress={onOpenChange}>Cancel</Button>
                            <Button className="bg-[#9200FE] text-white w-1/2" onPress={onOpenChange}>Accept</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default DeleteMemberModal;
