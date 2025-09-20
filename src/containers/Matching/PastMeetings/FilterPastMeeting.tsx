'use client'

import React, { useMemo, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger, Button } from "@heroui/react";
import FilterIcon from '@/components/Icons/FilterIcon'
import { PAST_MEETING_STATUS } from '@/constants/matching';
import CompletedMeetingIcon from '@/components/Icons/CompletedMeetingIcon';
import CancelledMeetingIcon from '@/components/Icons/CancelledMeetingIcon';
import ExpiredMeetingIcon from '@/components/Icons/ExpiredMeetingIcon';

interface FilterPastMeetingProps {
  currentMeetingStatus: string;
  onChangeMeetingStatus: (status: string) => void;
}

const FilterItem = ({
  currentMeetingStatus,
  label,
  value,
  onSelectItem,
  icon
}: {
  currentMeetingStatus: string,
  label: string,
  value: string,
  onSelectItem: (value: string) => void,
  icon: React.ReactNode | undefined 
}) => {
  return (
    <div
      className='rounded-lg flex gap-2 items-center cursor-pointer p-2 hover:bg-primary-20'
      onClick={() => onSelectItem(value)}
    >
      {icon && icon}
      <p className={`text-base leading-6 font-bold text-black ${currentMeetingStatus === value ? 'text-primary' : ''}`}>{label}</p>
    </div>
  )
}

const FilterPastMeeting: React.FC<FilterPastMeetingProps> = ({ currentMeetingStatus, onChangeMeetingStatus }) => {
  const [isOpen, setIsOpen] = useState(false);

  const itemIconBuilder = useMemo(() => {
    return [
      {
        value: 'completed',
        icon: ({ isSelected }: { isSelected: boolean }) => <CompletedMeetingIcon width={20} height={20} stroke={isSelected ? '#9200FE' : 'black'} />
      },
      {
        value: 'cancelled',
        icon: ({ isSelected }: { isSelected: boolean }) => <CancelledMeetingIcon width={20} height={20} stroke={isSelected ? '#9200FE' : 'black'} />
      },
      {
        value: 'expired',
        icon: ({ isSelected }: { isSelected: boolean }) => <ExpiredMeetingIcon width={20} height={20} stroke={isSelected ? '#9200FE' : 'black'} />
      }
    ]
  }, [])

  const pastMeetingStatusBuilder = useMemo(() => {
    return PAST_MEETING_STATUS.map((status) => ({
      label: status.label,
      value: status.value,
      icon: itemIconBuilder.find(item => item.value === status.value)?.icon
    }))
  }, [itemIconBuilder])

  const handleStatusChange = (status: string) => {
    onChangeMeetingStatus(status);
    setIsOpen(false);
  };

  const getDisplayLabel = (status: string) => {
    const found = pastMeetingStatusBuilder.find(s => s.value === status);
    return found ? found.label : status;
  };

  return (
    <>
      <Popover placement='bottom-end' isOpen={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          {/* The button is added directly from the HeroUI library instead of the custom button component
              because the custom button component somehow doesn't work with the PopoverTrigger.
          */}
          <Button
            className='bg-primary text-white hover:bg-primary-40 active:bg-primary-40'
            variant='solid'
            color='primary'
            size='md'
            radius='md'
            startContent={<FilterIcon width={20} height={20} stroke='white' />}
          >
            <p className='text-base leading-6 font-bold text-white'>{getDisplayLabel(currentMeetingStatus)}</p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='py-[10px] px-[20px] rounded-xl'>
          <div className='flex flex-col gap-4'>
            {pastMeetingStatusBuilder.map((status) => (
              <FilterItem
                key={status.value}
                currentMeetingStatus={currentMeetingStatus}
                label={status.label}
                value={status.value}
                onSelectItem={handleStatusChange}
                icon={status.icon ? status.icon({ isSelected: currentMeetingStatus === status.value }) : undefined}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default FilterPastMeeting