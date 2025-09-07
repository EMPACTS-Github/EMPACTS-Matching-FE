import Image from 'next/image';
import React from 'react';
import FavoriteIcon from '/public/assets/favorite-icon.svg';
import FavoriteFilledIcon from '/public/assets/favorite-filled-icon.svg';
import TextLine from '@/components/common/TextLine';
import { Progress } from '@heroui/react';
import Avatar from '@/components/Avatar/Avatar';
import { Card } from '@heroui/card';
import Button from '@/components/Button/Button';

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
  onFavoriteClick,
  isFavorite,
  onCardClick,
}) => {
  const matchLabel =
    matchScore >= 70 ? 'Strong match' : matchScore >= 50 ? 'Normal match' : 'Weak match';
  const matchColor = matchScore >= 70 ? 'success' : matchScore >= 50 ? 'warning' : 'danger';

  return (
    <Card
      fullWidth
      isPressable
      className='flex flex-row gap-2 bg-white rounded-md px-4 py-4 items-center shadow-md'
      onPress={onCardClick}
    >
      <div className='w-[25%] flex justify-center items-center'>
        <Avatar src={avatarUrl} alt={name} variant='default-lg' />
      </div>

      <div className='flex flex-col justify-start w-[75%]'>
        <div className='flex justify-between items-center w-full pl-2'>
          <div className='text-md font-semibold text-black'>{name}</div>
          <Button isIconOnly onClick={onFavoriteClick} className='bg-transparent'>
            {isFavorite ? (
              <Image src={FavoriteFilledIcon} alt='Unfavorite' />
            ) : (
              <Image src={FavoriteIcon} alt='Favorite' />
            )}
          </Button>
        </div>
        <div className='flex flex-col gap-1 px-2'>
          <TextLine text={location} className='text-gray-500 text-xs text-left' />
          <TextLine
            text={description}
            className='text-gray-600 mt-2 text-[10px] text-left line-clamp-3'
          />
          <Progress
            classNames={{
              base: 'w-full gap-0.5 mt-2',
              label: 'font-semibold text-[12px] text-default-600',
            }}
            label={matchLabel}
            color={matchColor}
            showValueLabel={true}
            maxValue={100}
            size='sm'
            value={matchScore}
          />
        </div>
      </div>
    </Card>
  );
};

export default SuggestMentorSmallCard;
