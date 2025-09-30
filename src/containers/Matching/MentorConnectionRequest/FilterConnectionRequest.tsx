'use client';

import React, { useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger, Button } from '@heroui/react';
import FilterIcon from '@/components/Icons/FilterIcon';
import { CONNECTION_REQUEST_STATUS } from '@/constants/matching';
import CompletedMeetingIcon from '@/components/Icons/CompletedMeetingIcon';
import CancelledMeetingIcon from '@/components/Icons/CancelledMeetingIcon';

interface FilterConnectionRequestProps {
  currentRequestStatus: string;
  onChangeRequestStatus: (status: string) => void;
}

const FilterItem = ({
  currentRequestStatus,
  label,
  value,
  onSelectItem,
  icon,
}: {
  currentRequestStatus: string;
  label: string;
  value: string;
  onSelectItem: (value: string) => void;
  icon: React.ReactNode | undefined;
}) => {
  return (
    <div
      className='rounded-lg flex gap-2 items-center cursor-pointer p-2 hover:bg-primary-20'
      onClick={() => onSelectItem(value)}
    >
      {icon && icon}
      <p
        className={`text-base leading-6 font-bold text-black ${currentRequestStatus === value ? 'text-primary' : ''}`}
      >
        {label}
      </p>
    </div>
  );
};

const FilterConnectionRequest: React.FC<FilterConnectionRequestProps> = ({
  currentRequestStatus,
  onChangeRequestStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const itemIconBuilder = useMemo(() => {
    return [
      {
        value: 'pending',
        icon: ({ isSelected }: { isSelected: boolean }) => (
          <CancelledMeetingIcon width={20} height={20} stroke={isSelected ? '#9200FE' : 'black'} />
        ),
      },
      {
        value: 'accepted',
        icon: ({ isSelected }: { isSelected: boolean }) => (
          <CompletedMeetingIcon width={20} height={20} stroke={isSelected ? '#9200FE' : 'black'} />
        ),
      },
    ];
  }, []);

  const connectionRequestStatusBuilder = useMemo(() => {
    return CONNECTION_REQUEST_STATUS.map((status) => ({
      label: status.label,
      value: status.value,
      icon: itemIconBuilder.find((item) => item.value === status.value)?.icon,
    }));
  }, [itemIconBuilder]);

  const handleStatusChange = (status: string) => {
    onChangeRequestStatus(status);
    setIsOpen(false);
  };

  const getDisplayLabel = (status: string) => {
    const found = connectionRequestStatusBuilder.find((s) => s.value === status);
    return found ? found.label : status;
  };

  return (
    <div>
      <Popover placement='bottom-end' isOpen={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          {/* The button is added directly from the HeroUI library instead of the custom button component
              because the custom button component somehow doesn't work with the PopoverTrigger.
          */}
          <Button
            className='bg-primary text-white hover:bg-primary-40 active:bg-primary-40'
            variant='solid'
            color='primary'
            size='lg'
            radius='md'
            startContent={<FilterIcon width={20} height={20} stroke='white' />}
          >
            <p className='text-base leading-6 font-bold text-white'>
              {getDisplayLabel(currentRequestStatus)}
            </p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='py-[10px] px-[20px] rounded-xl'>
          <div className='flex flex-col gap-4'>
            {connectionRequestStatusBuilder.map((status) => (
              <FilterItem
                key={status.value}
                currentRequestStatus={currentRequestStatus}
                label={status.label}
                value={status.value}
                onSelectItem={handleStatusChange}
                icon={
                  status.icon
                    ? status.icon({ isSelected: currentRequestStatus === status.value })
                    : undefined
                }
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterConnectionRequest;
