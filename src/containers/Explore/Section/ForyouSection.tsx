import React from "react";
import MentorCard from '@/components/Card/MentorCard';
import ProfileInfoCard from '@/components/Card/ProfileInfoCard';
import ConnectModal from '@/components/Modal/ConnectModal';
import { Spinner } from "@heroui/react";
import { getProvince } from '@/utils/getProvince';

interface ForyouSectionProps {
    mentor: any[];
    selectedMentor: any;
    isOpen: boolean;
    isFavourite: boolean;
    handleFavoriteClick: (index: number) => void;
    handleMentorSelect: (index: number) => void;
    setIsOpen: (open: boolean) => void;
    setIsFavourite: (fav: boolean) => void;
    error: string | null;
}

const ForyouSection: React.FC<ForyouSectionProps> = ({
    mentor,
    selectedMentor,
    isOpen,
    isFavourite,
    handleFavoriteClick,
    handleMentorSelect,
    setIsOpen,
    setIsFavourite,
    error,
}) => {
    if (error === "No suggestion found") {
        return (
            <div className='flex justify-center items-center h-[50%]'>
                <span className="text-gray-500 text-lg">Can't found mentor for you</span>
            </div>
        )
    }
    return mentor.length !== 0 ? (
        <div className='flex justify-between gap-4 p-4 flex-1 overflow-hidden'>
            <div className='flex flex-col gap-4 w-[30%] overflow-y-auto h-full pr-2 custom-scrollbar'>
                {mentor.map((mentor, index) => (
                    <MentorCard
                        key={index}
                        name={mentor.name}
                        location={getProvince(mentor?.locationBased || '')}
                        description={mentor.description}
                        avatarUrl={mentor.avtUrl}
                        matchScore={mentor.matchScore}
                        isFavorite={mentor.isFavourite}
                        onFavoriteClick={() => handleFavoriteClick(index)}
                        onCardClick={() => handleMentorSelect(index)}
                    />
                ))}
            </div>
            <ProfileInfoCard
                className="w-[70%]"
                title={selectedMentor?.name || ''}
                location={getProvince(selectedMentor?.locationBased || '')}
                description={selectedMentor?.description || ''}
                rating={selectedMentor?.rating || 5}
                sdg={selectedMentor?.sdgFocusExpertises || []}
                onFavoriteClick={() => setIsFavourite(!isFavourite)}
                isFavorite={selectedMentor?.isFavourite || false}
                avtUrl={selectedMentor?.avtUrl || ''}
                onClickButton={() => setIsOpen(true)}
            />
            <ConnectModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                mentorName={selectedMentor?.name || ''}
            />
        </div>
    ) : (
        <div className='flex justify-center items-center h-[50%]'>
            <Spinner classNames={{ label: "text-foreground mt-4" }} label="The system is finding the best mentors for you. Please wait..." variant="wave" />
        </div>
    );
};

export default ForyouSection;