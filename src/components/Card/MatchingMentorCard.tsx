import React from 'react';
import { Card } from '@heroui/card';
import TextLine from '@/components/common/TextLine';
import Avatar from '@/components/Avatar/Avatar';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { MATCHING_STATUS } from '@/constants/matching';
import { PROFILE_MESSAGES } from '@/constants';

interface MatchingMentorCardProps {
  name: string;
  location: string | undefined;
  status: string;
  avatarUrl: string;
  onCardClick: () => void;
}

const MatchingMentorCard: React.FC<MatchingMentorCardProps> = ({
  name,
  location,
  status,
  avatarUrl,
  onCardClick,
}) => {
  return (
    <Card
      fullWidth
      isPressable
      className="flex flex-row gap-small rounded-md px-regular py-regular items-center shadow-sm"
      onPress={onCardClick}
    >
      <div className="w-[25%]">
        <Avatar
          variant="default-lg"
          src={avatarUrl}
          alt={`${name}'s avatar`}
        />
      </div>
      <div className="flex flex-col justify-start w-[75%]">
        <TextLine text={name} className="text-lg font-semibold text-secondary text-left" />
        <TextLine text={location} className="text-neutral-50 text-sm text-left line-clamp-1" />
        <div className="flex gap-small items-center mt-small">
          <TextLine text={PROFILE_MESSAGES.STATUS} className="font-semibold text-secondary" />
          <TextLine
            text={capitalizeFirstLetter(status)}
            className={`font-semibold ${status === MATCHING_STATUS.ACCEPTED ? 'text-success' : 'text-neutral-50'}`}
          />
        </div>
      </div>
    </Card>
  );
};

export default MatchingMentorCard;
