import React, { useState } from 'react';
import { Tooltip } from '@heroui/react';
import Button from '@/components/Button/Button';
import CopyIcon from '@/components/Icons/CopyIcon';

interface JoinMeetingActionProps {
  meetLink: string | null;
}

const CopyLinkItem: React.FC<{ meetLink: string }> = ({ meetLink }) => {
  const [isCopied, setIsCopied] = useState(false);
  const fullLink = meetLink.startsWith('http') ? meetLink : `https://${meetLink}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className='flex items-center gap-1'>
      <p className='text-xs font-normal leading-4'>{meetLink}</p>
      <Tooltip content={isCopied ? 'Copied' : 'Copy Link'}>
        <div className='cursor-pointer' onClick={handleCopyLink}>
          <CopyIcon />
        </div>
      </Tooltip>
    </div>
  );
};

const JoinMeetingAction: React.FC<JoinMeetingActionProps> = ({ meetLink }) => {
  if (!meetLink) {
    return null;
  }

  const handleJoinMeeting = () => {
    const fullLink = meetLink.startsWith('http') ? meetLink : `https://${meetLink}`;
    window.open(fullLink, '_blank');
  };

  return (
    <div className='flex flex-col gap-1 max-w-fit'>
      <Button variant='primary-lg' onClick={handleJoinMeeting}>
        <p className='text-base font-bold leading-6'>Join with Google Meet</p>
      </Button>
      <CopyLinkItem meetLink={meetLink} />
    </div>
  );
};

export default JoinMeetingAction;
