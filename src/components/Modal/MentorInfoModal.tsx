import { Modal, ModalContent, ModalBody, Button, useDisclosure } from "@heroui/react";
import Image from "next/image";
import TextLine from "@/components/common/TextLine";
import { LANGUAGE_SPOKEN } from "@/constants/common";
import { MATCHING_STATUS } from "@/constants/matching";
import ConnectModal from '@/components/Modal/ConnectModal';
import UserPlusIcon from "@/components/Icons/UserPlusIcon";
import { useStartupIdStore } from "@/stores/startupId-store";

interface MentorInfoModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    mentorName: string;
    location: string | undefined;
    avtUrl: string;
    mentorDescription: string | undefined;
    mentorSdgFocusExpertises: string[] | undefined;
    mentorSkillOffered: string[] | undefined;
    mentorLanguagesSpoken: string[] | undefined;
    matchingStatus?: string;
    mentorId?: string;
}

const MentorInfoModal: React.FC<MentorInfoModalProps> = ({
    isOpen,
    onOpenChange,
    mentorName,
    location,
    avtUrl,
    mentorDescription,
    mentorSdgFocusExpertises,
    mentorSkillOffered,
    mentorLanguagesSpoken,
    matchingStatus,
    mentorId,
}) => {
    const { isOpen: isConnectModalOpen, onOpen: onConnectModalOpen, onOpenChange: onConnectModalOpenChange } = useDisclosure();
    const startupId = useStartupIdStore((state) => state.startupId);
    const formatSDGExpertise = (expertise: string) => {
        return expertise
            .toLowerCase()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    return (
        <Modal
            isKeyboardDismissDisabled={true}
            size="xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent className="py-4">
                {(onOpenChange) => (
                    <ModalBody className="flex flex-col gap-2">
                        <div className="flex justify-between items-end mb-4">
                            <div className="flex flex-row rounded-md py-2 items-center">
                                <Image
                                    src={avtUrl}
                                    alt={`${mentorName}'s avatar`}
                                    width={56}
                                    height={56}
                                    className="rounded-full mb-2"
                                />
                                <div className="flex flex-col justify-start ml-4">
                                    <div className="text-lg font-semibold text-black">{mentorName}</div>
                                    <TextLine text={location} className="text-gray-600 text-sm text-left line-clamp-1" />
                                </div>
                            </div>
                            <div className="flex flex-col items-end mr-2">
                                {matchingStatus && (
                                    <Button
                                        type="submit"
                                        color={matchingStatus !== MATCHING_STATUS.PENDING && matchingStatus !== MATCHING_STATUS.ACCEPTED ? "primary" : "default"}
                                        isDisabled={matchingStatus === MATCHING_STATUS.PENDING || matchingStatus === MATCHING_STATUS.ACCEPTED}
                                        size="md"
                                        variant="solid"
                                        radius="md"
                                        startContent={<UserPlusIcon className="text-white" />}
                                        onPress={onConnectModalOpen}
                                        className={`text-white ${matchingStatus === MATCHING_STATUS.PENDING || matchingStatus === MATCHING_STATUS.ACCEPTED ? "bg-empacts-grey-50" : ""} font-semibold`}
                                    >
                                        {matchingStatus === MATCHING_STATUS.PENDING || matchingStatus === MATCHING_STATUS.ACCEPTED ? "Connected" : "Connect"}
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-start mt-1">
                            <div className="font-semibold">Description:</div>
                            <div className="font-normal text-gray-700">
                                {mentorDescription}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-start mt-1">
                            <div className="font-semibold">Focus Expertises:</div>
                            <div className="font-normal text-gray-700">
                                {mentorSdgFocusExpertises && mentorSdgFocusExpertises.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {mentorSdgFocusExpertises.map((item, idx) => (
                                            <li key={idx}>{formatSDGExpertise(item)}</li>
                                        ))}
                                    </ul>
                                ) : "No data"}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-start mt-1">
                            <div className="font-semibold">Skill Offered:</div>
                            <div className="font-normal text-gray-700">
                                {mentorSkillOffered && mentorSkillOffered.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {mentorSkillOffered.map((skill, idx) => (
                                            <li key={idx}>{skill}</li>
                                        ))}
                                    </ul>
                                ) : "No data"}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-start mt-1">
                            <div className="font-semibold">Languages Spoken:</div>
                            <div className="font-normal text-gray-700">
                                {mentorLanguagesSpoken && mentorLanguagesSpoken.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {mentorLanguagesSpoken.map((code, idx) => (
                                            <li key={idx}>{LANGUAGE_SPOKEN[code as keyof typeof LANGUAGE_SPOKEN]}</li>
                                        ))}
                                    </ul>
                                ) : "No data"}
                            </div>
                        </div>
                        <ConnectModal
                            startupId={startupId}
                            mentorId={mentorId || ''}
                            isOpen={isConnectModalOpen}
                            onClose={onConnectModalOpenChange}
                            mentorName={mentorName}
                        />
                    </ModalBody>
                )}
            </ModalContent>
        </Modal >
    );
};

export default MentorInfoModal;
