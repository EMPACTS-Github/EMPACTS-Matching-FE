import React, { useEffect, useState } from 'react';
import { Spinner } from '@heroui/react';
import MentorConnectionRequestItem from './MentorConnectionRequestItem';
import { mentor_matching_request_list } from '@/apis/mentor-matching';
import { MentorMatchingRequest } from '@/interfaces/matching';
import { MATCHING_STATUS } from '@/constants/matching';

interface ContentProps {
  mentorId: string;
}

const Content: React.FC<ContentProps> = ({ mentorId }) => {
  const [connectionRequests, setConnectionRequests] = useState<MentorMatchingRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchConnectionRequests = async () => {
    try {
      setIsLoading(true);
      const requests = await mentor_matching_request_list(MATCHING_STATUS.PENDING);
      setConnectionRequests(requests);
    } catch (error) {
      console.error('Error fetching connection requests:', error);
      setConnectionRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnectionRequests();
  }, [mentorId]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full min-h-[200px]'>
        <Spinner
          classNames={{ label: 'text-foreground mt-4' }}
          label='Loading connection requests...'
          variant='wave'
        />
      </div>
    );
  }

  if (connectionRequests.length === 0) {
    return (
      <div className='flex justify-center items-center h-full min-h-[200px]'>
        <p className='text-neutral-80 text-lg'>No connection requests found</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6 h-full max-h-[40vh] overflow-y-auto'>
      {connectionRequests.map((req) => (
        <MentorConnectionRequestItem
          key={req.id}
          request={req}
          mentorId={mentorId}
          onRefresh={fetchConnectionRequests}
        />
      ))}
    </div>
  );
};

export default Content;
