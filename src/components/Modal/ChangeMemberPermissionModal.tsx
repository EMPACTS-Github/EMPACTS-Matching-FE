import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, RadioGroup, Radio } from "@heroui/react";
import { Member } from "@/interfaces/StartupProfile";

interface ChangePermissionModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    member: Member | null;
}

const ChangePermissionModal: React.FC<ChangePermissionModalProps> = ({ isOpen, onOpenChange, member }) => {
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
                        <ModalHeader className="items-center pb-0">
                            <div>
                                <h3 className="text-lg text-black mb-1">Choose new role for <span className="text-[#9200FE]">{member?.user_id.name}</span></h3>
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <RadioGroup color="primary" label="Select new role" className="mb-1">
                                <Radio value="OWNER" className="ml-1" description="Has full administrative access to the entire organization, including profile edit and matching request management.">
                                    Owner
                                </Radio>
                                <Radio value="MEMBER" className="ml-1" description="Edit profile permission. Matching request permission is not allowed.">
                                    Member
                                </Radio>
                            </RadioGroup>
                        </ModalBody>
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

export default ChangePermissionModal;
