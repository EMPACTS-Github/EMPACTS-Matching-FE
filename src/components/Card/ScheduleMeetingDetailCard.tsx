import React from 'react';
import { Card, CardBody } from '@heroui/card';
import TextLine from '@/components/common/TextLine';
import Avatar from '@/components/Avatar/Avatar';
import { Spacer } from '@heroui/spacer';
import Button from '@/components/Button/Button';
import Calendar from '@/components/Calendar/Calendar';

interface ScheduleMeetingDetailCardProps {
  name?: string;
  location?: string | undefined;
  avtUrl?: string;
}

const ScheduleMeetingDetailCard: React.FC<ScheduleMeetingDetailCardProps> = ({
  name,
  location,
  avtUrl,
}) => {
  return (
    <Card fullWidth className='border-1 p-regular' shadow='none'>
      <CardBody className='flex flex-row'>
        <div className='w-[65%] flex flex-col gap-4'>
          <div className='flex gap-4'>
            <Avatar variant='default-lg' src={avtUrl} alt={`${name}'s avatar`} />
            <div className='flex flex-col justify-start w-[35%]'>
              <TextLine text={name} className='text-lg font-semibold text-secondary text-left' />
              <TextLine
                text={location}
                className='text-neutral-50 text-sm text-left line-clamp-1'
              />
            </div>
          </div>
          <Calendar />
        </div>
        <Spacer x={4} />
        <div className='flex flex-col w-[35%] gap-2'>
          <Button variant='bordered-md'>1:30PM - 2:30PM</Button>
          <Button variant='bordered-md'>1:30PM - 2:30PM</Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ScheduleMeetingDetailCard;
