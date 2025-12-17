import React, { useState, useCallback, useEffect } from 'react';
import { addToast } from '@heroui/react';
import PastMeetingItem from './PastMeetingItem';
import { ConnectionMeeting } from '@/interfaces/matching';
import { MEETING_STATUS } from '@/constants/matching';
import { PROFILE_MESSAGES } from '@/constants';
import { DEFAULT_TOAST_TIMEOUT, TOAST_COLORS } from '@/constants/api';
import { getConnectionMeetings } from '@/apis/connection-meeting';

interface ContentProps {
  actor: 'mentor' | 'startup';
  profileId: string;
  filterStatus: string;
}

const Content: React.FC<ContentProps> = ({ actor, profileId, filterStatus }) => {
  const [displayedMeetings, setDisplayedMeetings] = useState<ConnectionMeeting[]>([]);
  const [allMeetings, setAllMeetings] = useState<ConnectionMeeting[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [totalItemsLoaded, setTotalItemsLoaded] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 3;

  // Fetch past meetings from API based on filter status
  useEffect(() => {
    const fetchPastMeetings = async () => {
      if (!profileId) return;

      setIsInitialLoading(true);
      
      try {
        let meetings: ConnectionMeeting[] = [];

        // Optimize API calls based on filter status
        if (filterStatus === 'completed') {
          // Fetch only completed meetings
          meetings = await getConnectionMeetings({
            actor,
            profileId,
            status: MEETING_STATUS.COMPLETED,
          });
        } else if (filterStatus === 'cancelled') {
          // Use the 'canceled' view for cancelled meetings
          meetings = await getConnectionMeetings({
            actor,
            profileId,
            view: 'canceled',
          });
        } else if (filterStatus === 'expired') {
          // Fetch only expired meetings
          meetings = await getConnectionMeetings({
            actor,
            profileId,
            status: MEETING_STATUS.EXPIRED,
          });
        } else {
          // Fallback: fetch past meetings
          meetings = await getConnectionMeetings({
            actor,
            profileId,
            view: 'past',
          });
        }

        // Ensure meetings is an array
        const meetingsArray = Array.isArray(meetings) ? meetings : [];
        setAllMeetings(meetingsArray);
        
        // Display first page
        const firstPageItems = meetingsArray.slice(0, itemsPerPage);
        setDisplayedMeetings(firstPageItems);
        setHasMore(meetingsArray.length > itemsPerPage);
        setTotalItemsLoaded(firstPageItems.length);
      } catch (error: any) {
        addToast({
          title: error?.response?.data?.message || error?.message || PROFILE_MESSAGES.GENERAL_ERROR,
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
        setAllMeetings([]);
        setDisplayedMeetings([]);
        setHasMore(false);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchPastMeetings();
  }, [actor, profileId, filterStatus]);

  // Load more items for infinite scroll
  const loadMoreItems = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const startIndex = totalItemsLoaded;
      const endIndex = startIndex + itemsPerPage;
      const newItems = allMeetings.slice(startIndex, endIndex);

      if (newItems.length > 0) {
        setDisplayedMeetings((prev) => [...prev, ...newItems]);
        setTotalItemsLoaded(endIndex);
        setHasMore(endIndex < allMeetings.length);
      } else {
        setHasMore(false);
      }

      setLoadingMore(false);
    }, 500);
  }, [totalItemsLoaded, loadingMore, hasMore, itemsPerPage, allMeetings]);

  // Show loading on initial fetch
  if (isInitialLoading) {
    return (
      <div className='w-full text-center py-large'>
        <p className='text-neutral-80'>Loading past meetings...</p>
      </div>
    );
  }

  // Show empty state
  if (displayedMeetings.length === 0) {
    return (
      <div className='w-full text-center py-large'>
        <p className='text-neutral-80'>No past meetings found.</p>
      </div>
    );
  }

  return (
    <div
      className='flex flex-col gap-6 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-40 scrollbar-track-neutral-20'
      onScroll={(e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        // Trigger load more when scrolled to 80% of content
        if (scrollTop + clientHeight >= scrollHeight * 0.8 && hasMore && !loadingMore) {
          loadMoreItems();
        }
      }}
    >
      {displayedMeetings.map((meeting) => (
        <PastMeetingItem key={meeting.id} meeting={meeting} actor={actor} />
      ))}

      {/* Loading more indicator */}
      {loadingMore && (
        <div className='text-center py-medium'>
          <div className='bg-neutral-30 rounded-xl p-medium animate-pulse'>
            <div className='flex items-start gap-regular'>
              <div className='w-12 h-12 bg-neutral-50 rounded-full'></div>
              <div className='flex-1'>
                <div className='h-4 bg-neutral-50 rounded mb-2 w-1/3'></div>
                <div className='h-3 bg-neutral-50 rounded mb-4 w-1/4'></div>
                <div className='h-3 bg-neutral-50 rounded w-3/4'></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* End of results indicator */}
      {!hasMore && displayedMeetings.length > 0 && (
        <div className='text-center py-medium'>
          <p className='text-neutral-50 text-sm'>You&rsquo;ve reached the end of your meetings</p>
        </div>
      )}
    </div>
  );
};

export default Content;
