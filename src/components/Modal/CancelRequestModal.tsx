import { Modal, ModalContent, ModalHeader, ModalFooter, Button, addToast } from "@heroui/react";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import { useState } from "react";
import { Spinner } from "@heroui/spinner";
import { cancel_matching_request } from "@/apis/startup-matching";

interface CancelRequestModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    startupId: string;
    connectRequestCode: string;
}

const CancelRequestModal: React.FC<CancelRequestModalProps> = ({ isOpen, onOpenChange, startupId, connectRequestCode }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCancelRequest = async () => {
        setIsLoading(true);
        try {
            const response = await cancel_matching_request(startupId, connectRequestCode);
            if (response.code === "MATCHING_CANCEL_SUCCESS") {
                addToast({
                    title: 'Cancel Request Success',
                    color: 'success',
                    timeout: 5000,
                });
            }
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error("Failed to cancel request:", error);
            addToast({
                title: 'Cancel Request failed',
                color: 'danger',
                timeout: 5000,
            });
            setIsLoading(false);
        }
        onOpenChange();
    }
    return (
        <Modal
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
                                    <div className="text-lg text-black mb-1">Are you sure you want to cancel Request?</div>
                                    <div className="font-normal text-gray-400 text-sm">This action cannot be undone. Your matching request will be permanently cancelled..</div>

                                </div>
                            </div>
                        </ModalHeader>
                        <ModalFooter className="flex justify-end">
                            <Button className="bg-empacts text-white" onPress={handleCancelRequest} isDisabled={isLoading}>
                                {isLoading ? <Spinner size="sm" color="white" /> : "Cancel Request"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CancelRequestModal;
