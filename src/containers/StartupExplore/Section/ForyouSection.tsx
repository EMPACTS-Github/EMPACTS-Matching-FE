import React from 'react';
import SuggestMentorSmallCard from '@/components/Card/SuggestMentorSmallCard';
import SuggestMentorDetailCard from '@/components/Card/SuggestMentorDetailCard';
import ConnectModal from '@/components/Modal/ConnectModal';
import { Spinner } from '@heroui/react';
import { getProvince } from '@/utils/getProvince';

interface ForyouSectionProps {
  startupId: string;
  mentor: any[];
  selectedMentor: any;
  isOpen: boolean;
  isFavourite: boolean;
  handleFavoriteClick: (index: number) => void;
  handleMentorSelect: (index: number) => void;
  setIsOpen: (open: boolean) => void;
  setIsFavourite: (fav: boolean) => void;
  error: string | null;
  canConnect: boolean;
}

const ForyouSection: React.FC<ForyouSectionProps> = ({
  startupId,
  mentor,
  selectedMentor,
  isOpen,
  isFavourite,
  handleFavoriteClick,
  handleMentorSelect,
  setIsOpen,
  setIsFavourite,
  error,
  canConnect,
}) => {
  if (error === 'No suggestion found') {
    return (
      <div className='flex justify-center items-center h-[50%]'>
        <span className='text-gray-500 text-lg'>No mentor found for you</span>
      </div>
    );
  }
  return mentor.length !== 0 ? (
    <div className='flex justify-between gap-4 flex-1 overflow-hidden'>
      <div className='flex flex-col gap-4 w-[34%] overflow-y-auto h-full pr-2 custom-scrollbar'>
        {mentor.map((mentor, index) => (
          <SuggestMentorSmallCard
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
      <SuggestMentorDetailCard
        className='w-[66%]'
        title={selectedMentor?.name || ''}
        location={getProvince(selectedMentor?.locationBased || '')}
        description={selectedMentor?.description || ''}
        rating={selectedMentor?.rating || 5}
        sdg={selectedMentor?.sdgFocusExpertises || []}
        onFavoriteClick={() => setIsFavourite(!isFavourite)}
        isFavorite={selectedMentor?.isFavourite || false}
        avtUrl={selectedMentor?.avtUrl || ''}
        onClickButton={canConnect ? () => setIsOpen(true) : undefined}
        mentorProfile={selectedMentor}
        showConnectButton={canConnect}
      />
      {canConnect && (
        <ConnectModal
          startupId={startupId}
          mentorId={selectedMentor?.id || ''}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mentorName={selectedMentor?.name || ''}
          avtUrl={selectedMentor?.avtUrl || ''}
        />
      )}
    </div>
  ) : (
    <div className='flex justify-center items-center h-[50%]'>
      <Spinner
        classNames={{ label: 'text-foreground mt-4' }}
        label='The system is finding the best mentors for you. Please wait...'
        variant='wave'
      />
    </div>
  );
};

export default ForyouSection;
