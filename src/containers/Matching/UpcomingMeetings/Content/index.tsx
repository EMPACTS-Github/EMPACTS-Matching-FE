import React, { useState, useCallback, useEffect } from 'react';
import { addToast } from '@heroui/react';
import UpcomingMeetingItem from './UpcomingMeetingItem';
import { ConnectionMeeting } from '@/interfaces/matching';
import { getConnectionMeetings } from '@/apis/connection-meeting';
import { PROFILE_MESSAGES } from '@/constants';
import { DEFAULT_TOAST_TIMEOUT, TOAST_COLORS } from '@/constants/api';

interface ContentProps {
  startupId: string;
}

const Content: React.FC<ContentProps> = ({ startupId }) => {
  const [displayedMeetings, setDisplayedMeetings] = useState<ConnectionMeeting[]>([]);
  const [allMeetings, setAllMeetings] = useState<ConnectionMeeting[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalItemsLoaded, setTotalItemsLoaded] = useState(0);
  const itemsPerPage = 3;

  // Fetch upcoming meetings from API
  useEffect(() => {
    const fetchUpcomingMeetings = async () => {
      if (!startupId) return;

      setIsInitialLoading(true);
      try {
        const response = await getConnectionMeetings({
          actor: 'startup',
          profileId: startupId,
          view: 'upcoming',
        });

        const meetings = response.data || [];
        setAllMeetings(meetings);

        // Display first page
        const firstPageItems = meetings.slice(0, itemsPerPage);
        setDisplayedMeetings(firstPageItems);
        setHasMore(meetings.length > itemsPerPage);
        setCurrentPage(1);
        setTotalItemsLoaded(itemsPerPage);
      } catch (error: any) {
        console.error('Error fetching upcoming meetings:', error);
        addToast({
          title: error?.response?.data?.message || error?.message || PROFILE_MESSAGES.GENERAL_ERROR,
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
        // Set empty state on error
        setAllMeetings([]);
        setDisplayedMeetings([]);
        setHasMore(false);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchUpcomingMeetings();
  }, [startupId]);

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
        setCurrentPage((page) => page + 1);
        setTotalItemsLoaded(endIndex);
        setHasMore(endIndex < allMeetings.length);
      } else {
        setHasMore(false);
      }

      setLoadingMore(false);
    }, 500);
  }, [totalItemsLoaded, loadingMore, hasMore, itemsPerPage, allMeetings]);

  // Handler to remove cancelled meeting from list and auto-load more if needed
  const handleMeetingCancelled = useCallback(
    (meetingId: string) => {
      setDisplayedMeetings((prev) => {
        const updatedMeetings = prev.filter((meeting) => meeting.id !== meetingId);

        /**
         * Auto-load more items if list becomes too short to scroll
         * This prevents the situation where after cancelling, the list is too short
         * to trigger scroll-based infinite loading
         */
        const MIN_ITEMS_FOR_SCROLL = 3;
        if (updatedMeetings.length < MIN_ITEMS_FOR_SCROLL && hasMore && !loadingMore) {
          // Load next batch of items from all meetings
          const startIndex = totalItemsLoaded;
          const endIndex = Math.min(startIndex + itemsPerPage, allMeetings.length);
          const newItems = allMeetings.slice(startIndex, endIndex);

          if (newItems.length > 0) {
            // Schedule the update to avoid React state update warnings
            setTimeout(() => {
              setDisplayedMeetings((current) => [...current, ...newItems]);
              setCurrentPage((page) => page + 1);
              setTotalItemsLoaded(endIndex);
              setHasMore(endIndex < allMeetings.length);
            }, 100);
          } else {
            setHasMore(false);
          }
        }

        return updatedMeetings;
      });
    },
    [hasMore, loadingMore, itemsPerPage, totalItemsLoaded, allMeetings]
  );

  // Show loading on initial fetch
  if (isInitialLoading) {
    return (
      <div className='w-full text-center py-large'>
        <p className='text-neutral-80'>Loading upcoming meetings...</p>
      </div>
    );
  }

  // Show empty state
  if (displayedMeetings.length === 0) {
    return (
      <div className='w-full text-center py-large'>
        <p className='text-neutral-80'>No upcoming meetings found.</p>
      </div>
    );
  }

  return (
    <div
      className='flex flex-col gap-4 max-h-[432px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-40 scrollbar-track-neutral-20'
      onScroll={(e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        // Trigger load more when scrolled to 80% of content
        if (scrollTop + clientHeight >= scrollHeight * 0.8 && hasMore && !loadingMore) {
          loadMoreItems();
        }
      }}
    >
      {displayedMeetings.map((meeting) => (
        <UpcomingMeetingItem
          key={meeting.id}
          meeting={meeting}
          onCancelSuccess={() => handleMeetingCancelled(meeting.id)}
        />
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
