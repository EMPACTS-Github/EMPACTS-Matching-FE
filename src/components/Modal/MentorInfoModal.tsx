import { Modal, ModalContent, ModalBody } from "@heroui/react";
import Image from "next/image";
import TextLine from "@/components/common/TextLine";
import { LANGUAGE_SPOKEN } from "@/constants/common";

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
}) => {
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
                        <div className="flex flex-row rounded-md py-2 items-center shadow-sm">
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
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    );
};

export default MentorInfoModal;
