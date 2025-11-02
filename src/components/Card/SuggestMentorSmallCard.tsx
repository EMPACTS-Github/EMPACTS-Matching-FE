import Image from 'next/image';
import React from 'react';
import { Card } from '@heroui/card';
import AvatarPlaceholder from '/public/assets/avatar-placeholder.png';
import { Progress } from '@heroui/react';

interface SuggestMentorSmallCardProps {
  name: string;
  location: string | undefined;
  avatarUrl: string | undefined;
  description: string;
  matchScore: number;
  onFavoriteClick: () => void;
  isFavorite: boolean;
  onCardClick: () => void;
}

const SuggestMentorSmallCard: React.FC<SuggestMentorSmallCardProps> = ({
  name,
  location,
  avatarUrl,
  description,
  matchScore,
  onFavoriteClick: _onFavoriteClick,
  isFavorite: _isFavorite,
  onCardClick,
}) => {
  const avatarSrc = avatarUrl || AvatarPlaceholder;
  const matchLabel =
    matchScore >= 70 ? 'Strong match' : matchScore >= 50 ? 'Normal match' : 'Weak match';
  const matchColor = matchScore >= 70 ? 'success' : matchScore >= 50 ? 'warning' : 'danger';

  return (
    <Card
      fullWidth
      isPressable
      className='flex flex-row gap-4 bg-white rounded-md px-5 py-4 items-start shadow-md'
      onPress={onCardClick}
    >
      <div className='relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-neutral-30'>
        <Image src={avatarSrc} alt={name} fill sizes='64px' className='object-cover' />
      </div>
      <div className='flex flex-col justify-start gap-2 w-full text-left'>
        <div className='text-[20px] font-semibold text-secondary leading-tight truncate'>
          {name}
        </div>
        <div className='text-xs text-neutral-60 truncate'>{location}</div>
        <p className='text-[14px] text-neutral-80 leading-relaxed line-clamp-4'>{description}</p>
        <Progress
          classNames={{
            base: 'w-full gap-0.5 mt-2',
            label: 'font-semibold text-[12px] text-default-600',
          }}
          label={matchLabel}
          color={matchColor}
          maxValue={100}
          size='sm'
          value={matchScore}
        />
      </div>
    </Card>
  );
};

export default SuggestMentorSmallCard;
