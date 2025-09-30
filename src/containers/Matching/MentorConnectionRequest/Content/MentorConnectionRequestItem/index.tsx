import React, { useCallback, useState } from 'react';
import { useDisclosure } from '@heroui/react';
import Avatar from '@/components/Avatar/Avatar';
import Button from '@/components/Button/Button';
import StartupInfoModal from '@/components/Modal/StartupInfoModal';
import { startup_detail } from '@/apis/startup';
import { CONSOLE_ERRORS } from '@/constants';
import { Startup } from '@/interfaces/StartupProfile';
import { on } from 'events';

interface ConnectionRequestData {
  startupId: string;
  startupName: string;
  startupLocation: string;
  startupAvatar?: string;
  meetingStatus: string;
}

interface MentorConnectionRequestItemProps {
  request: ConnectionRequestData;
}

const MentorConnectionRequestItem: React.FC<MentorConnectionRequestItemProps> = ({ request }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [startupData, setStartupData] = useState<Startup>();
  const handleStartupClick = () => {
    if (startupData) {
      onOpen();
      return;
    }
    fetchStartupProfile();
    onOpen();
  };

  const fetchStartupProfile = useCallback(async () => {
    try {
      const data = await startup_detail(request.startupId);
      setStartupData(data.data);
      console.log('Fetched startup profile:', data.data);
    } catch (err) {
      console.error(CONSOLE_ERRORS.FETCH_STARTUP_PROFILE_FAILED, err);
    }
  }, [request.startupId]);

  return (
    <div className='w-full rounded-md p-4 border border-neutral-50'>
      <div className='flex justify-between items-center'>
        {/* Column 1: Avatar + Name (spans 2 rows) */}
        <div className='row-span-2 flex gap-4' onClick={handleStartupClick} role='button'>
          <Avatar
            variant='default-lg'
            src={request.startupAvatar || process.env.NEXT_PUBLIC_DEFAULT_AVT_URL}
            alt={`${request.startupName}'s avatar`}
          />
          <div className='flex flex-col gap-1 justify-center'>
            <p className='text-xl font-bold leading-tight'>{request.startupName}</p>
            <p className='text-sm font-normal text-neutral-80'>{request.startupLocation}</p>
          </div>
        </div>

        {/* Column 3 Row 1: Join Meeting Action */}
        {request.meetingStatus === 'Pending' ? (
          <div className='flex gap-3 items-center'>
            <Button variant='primary-lg' onClick={() => {}}>
              Accept
            </Button>
            <Button variant='bordered-lg' onClick={() => {}}>
              Decline
            </Button>
          </div>
        ) : null}
      </div>
      {startupData && (
        <StartupInfoModal isOpen={isOpen} onOpenChange={onOpenChange} startupData={startupData} />
      )}
    </div>
  );
};

export default MentorConnectionRequestItem;
