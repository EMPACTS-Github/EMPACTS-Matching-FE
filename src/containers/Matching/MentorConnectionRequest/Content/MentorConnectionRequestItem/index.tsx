import React, { useCallback, useState, useEffect } from 'react';
import { useDisclosure, Skeleton, addToast, Spinner } from '@heroui/react';
import Avatar from '@/components/Avatar/Avatar';
import Button from '@/components/Button/Button';
import StartupInfoModal from '@/components/Modal/StartupInfoModal';
import { startup_detail } from '@/apis/startup';
import { response_matching_request } from '@/apis/mentor-matching';
import { PROFILE_MESSAGES } from '@/constants';
import { TOAST_COLORS, DEFAULT_TOAST_TIMEOUT } from '@/constants/api';
import { Startup } from '@/interfaces/StartupProfile';
import { MentorMatchingRequest } from '@/interfaces/matching';
import { getProvince } from '@/utils/getProvince';

interface MentorConnectionRequestItemProps {
  request: MentorMatchingRequest;
  mentorId: string;
  onRefresh: () => void;
}

const MentorConnectionRequestItem: React.FC<MentorConnectionRequestItemProps> = ({
  request,
  mentorId,
  onRefresh,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [startupData, setStartupData] = useState<Startup | null>(null);
  const [isFetchingStartup, setIsFetchingStartup] = useState<boolean>(false);
  const [processingAction, setProcessingAction] = useState<'accept' | 'decline' | null>(null);

  useEffect(() => {
    fetchStartupProfile();
  }, [request.startupId]);

  const fetchStartupProfile = useCallback(async () => {
    try {
      setIsFetchingStartup(true);
      const data = await startup_detail(request.startupId);
      setStartupData(data.data);
    } catch (err) {
      addToast({
        title: PROFILE_MESSAGES.PROFILE_FETCH_FAILED,
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
    } finally {
      setIsFetchingStartup(false);
    }
  }, [request.startupId]);

  const handleStartupClick = () => {
    if (startupData) {
      onOpen();
    }
  };

  const handleAccept = async () => {
    try {
      setProcessingAction('accept');
      const response = await response_matching_request('ACCEPTED', request.id);

      // Always show success toast and refresh
      addToast({
        title: PROFILE_MESSAGES.ACCEPTED_MATCHING_REQUEST,
        color: TOAST_COLORS.SUCCESS,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
      setTimeout(() => {
        onRefresh();
      }, 1000);
    } catch (err) {
      addToast({
        title: PROFILE_MESSAGES.RESPONSE_MATCHING_FAILED,
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
    } finally {
      setProcessingAction(null);
    }
  };

  const handleDecline = async () => {
    try {
      setProcessingAction('decline');
      const response = await response_matching_request('REJECTED', request.id);

      // Always show success toast and refresh
      addToast({
        title: PROFILE_MESSAGES.REJECTED_MATCHING_REQUEST,
        color: TOAST_COLORS.SUCCESS,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
      setTimeout(() => {
        onRefresh();
      }, 1000);
    } catch (err) {
      addToast({
        title: PROFILE_MESSAGES.RESPONSE_MATCHING_FAILED,
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
    } finally {
      setProcessingAction(null);
    }
  };

  if (isFetchingStartup || !startupData) {
    return (
      <div className='w-full rounded-md p-4'>
        <div className='w-full flex items-center gap-semi-regular'>
          <div>
            <Skeleton className='h-12 w-12 rounded-full bg-neutral-40' />
          </div>
          <div className='w-full flex flex-col gap-small'>
            <Skeleton className='h-3 w-4/5 rounded-lg bg-neutral-40' />
            <Skeleton className='h-3 w-3/5 rounded-lg bg-neutral-40' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full rounded-md p-4 border border-neutral-50 flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        {/* Column 1: Avatar + Name (spans 2 rows) */}
        <div className='row-span-2 flex gap-4' onClick={handleStartupClick} role='button'>
          <Avatar
            variant='default-lg'
            src={startupData.avtUrl || process.env.NEXT_PUBLIC_DEFAULT_AVT_URL}
            alt={`${startupData.name}'s avatar`}
          />
          <div className='flex flex-col gap-1 justify-center'>
            <p className='text-lg font-semibold leading-tight'>{startupData.name}</p>
            <p className='text-sm font-normal text-neutral-80'>
              {getProvince(startupData.locationBased || '')}
            </p>
          </div>
        </div>

        {/* Column 3 Row 1: Join Meeting Action */}
        {request.status === 'PENDING' ? (
          <div className='flex gap-3 items-center'>
            <Button
              variant='primary-lg'
              onClick={handleAccept}
              disabled={processingAction !== null}
            >
              {processingAction === 'accept' ? <Spinner size='sm' color='white' /> : 'Accept'}
            </Button>
            <Button
              variant='bordered-lg'
              onClick={handleDecline}
              disabled={processingAction !== null}
            >
              {processingAction === 'decline' ? <Spinner size='sm' color='primary' /> : 'Decline'}
            </Button>
          </div>
        ) : null}
      </div>
      <div className='flex flex-col gap-2'>
        <div className='text-lg font-semibold'>Notes</div>
        <div className='text-sm font-normal text-neutral-80'>
          {request.note ? `${request.note}` : 'No note provided'}
        </div>
      </div>
      {startupData && (
        <StartupInfoModal isOpen={isOpen} onOpenChange={onOpenChange} startupData={startupData} />
      )}
    </div>
  );
};

export default MentorConnectionRequestItem;
