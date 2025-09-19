import React from 'react';
import { Card } from '@heroui/card';
import TextLine from '@/components/common/TextLine';
import Avatar from '@/components/Avatar/Avatar';

interface ScheduleMeetingSmallCardProps {
  name: string;
  location: string | undefined;
  avtUrl: string;
  onCardClick: () => void;
}

const ScheduleMeetingSmallCard: React.FC<ScheduleMeetingSmallCardProps> = ({
  name,
  location,
  avtUrl,
  onCardClick,
}) => {
  return (
    <Card
      fullWidth
      isPressable
      className='flex flex-row gap-small border-1 px-regular py-regular items-center'
      shadow='none'
      onPress={onCardClick}
    >
      <div className='w-[25%]'>
        <Avatar variant='default-lg' src={avtUrl} alt={`${name}'s avatar`} />
      </div>
      <div className='flex flex-col justify-start w-[75%]'>
        <TextLine text={name} className='text-lg font-semibold text-secondary text-left' />
        <TextLine text={location} className='text-neutral-50 text-sm text-left line-clamp-1' />
      </div>
    </Card>
  );
};

export default ScheduleMeetingSmallCard;
