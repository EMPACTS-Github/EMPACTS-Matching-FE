import React, { useState } from 'react';
import { Tooltip } from '@heroui/react';
import Button from '@/components/Button/Button';
import CopyIcon from '@/components/Icons/CopyIcon';

// Mock Google meet link
const GOOGLE_MEET_LINK = 'https://meet.google.com/ktq-edyu-ydj';

const CopyLinkItem = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(GOOGLE_MEET_LINK);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className='flex items-center gap-1'>
      <p className='text-xs font-normal leading-4'>{GOOGLE_MEET_LINK}</p>
      <Tooltip content={isCopied ? 'Copied' : 'Copy Link'}>
        <div className='cursor-pointer' onClick={handleCopyLink}>
          <CopyIcon />
        </div>
      </Tooltip>
    </div>
  );
};

const JoinMeetingAction = () => {
  const handleJoinMeeting = () => {
    window.open(GOOGLE_MEET_LINK, '_blank');
  };
  return (
    <div className='flex flex-col gap-1 max-w-fit'>
      <Button variant='primary-lg' onClick={handleJoinMeeting}>
        <p className='text-base font-bold leading-6'>Join with Google Meet</p>
      </Button>
      <CopyLinkItem />
    </div>
  );
};

export default JoinMeetingAction;
