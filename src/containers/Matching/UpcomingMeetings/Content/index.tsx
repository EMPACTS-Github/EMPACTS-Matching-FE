import React, { useState, useCallback, useEffect } from 'react';
import UpcomingMeetingItem from './UpcomingMeetingItem';
import { ConnectionMeeting } from '@/interfaces/matching';

// Mock data based on API documentation structure for Startup
const mockMeetings: ConnectionMeeting[] = [
  {
    id: '1',
    mentor_id: 'mentor-1',
    startup_id: 'startup-1',
    title: 'EMPACTS Connect: Le Phuong Nam <> The Amazing Team',
    description: 'Initial consultation meeting to discuss startup growth strategy',
    start_at: '2025-08-04T13:30:00Z',
    end_at: '2025-08-04T16:30:00Z',
    status: 'SCHEDULED',
    meet_link: 'meet.google.com/ktq-edyu-ydj',
    attendees: [
      { name: 'Do Chi Thanh', email: 'memberA@startup.com' },
      { name: 'Le Phuong Nam', email: 'mentor@empacts.com' },
    ],
    primary_contact: {
      name: 'Le Phuong Nam',
      email: 'mentor@empacts.com',
      role: 'MENTOR',
    },
    mentor: {
      id: 'mentor-1',
      name: 'Le Phuong Nam',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'HA_NOI',
      description: 'Experienced mentor in digital transformation',
    },
  },
  {
    id: '2',
    mentor_id: 'mentor-2',
    startup_id: 'startup-1',
    title: 'EMPACTS Connect: Sarah Johnson <> The Amazing Team',
    description: 'Marketing strategy and brand positioning discussion',
    start_at: '2025-08-05T14:00:00Z',
    end_at: '2025-08-05T17:00:00Z',
    status: 'SCHEDULED',
    meet_link: 'meet.google.com/abc-defg-hij',
    attendees: [
      { name: 'Do Chi Thanh', email: 'memberA@startup.com' },
      { name: 'Sarah Johnson', email: 'sarah@empacts.com' },
    ],
    primary_contact: {
      name: 'Sarah Johnson',
      email: 'sarah@empacts.com',
      role: 'MENTOR',
    },
    mentor: {
      id: 'mentor-2',
      name: 'Sarah Johnson',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'HO_CHI_MINH',
      description: 'Marketing and Growth Strategy Expert',
    },
  },
  {
    id: '3',
    mentor_id: 'mentor-3',
    startup_id: 'startup-1',
    title: 'EMPACTS Connect: Michael Chen <> The Amazing Team',
    description: 'Product development roadmap and technical architecture',
    start_at: '2025-08-06T10:00:00Z',
    end_at: '2025-08-06T13:00:00Z',
    status: 'SCHEDULED',
    meet_link: 'meet.google.com/xyz-uvwx-rst',
    attendees: [
      { name: 'Do Chi Thanh', email: 'memberA@startup.com' },
      { name: 'Michael Chen', email: 'michael@empacts.com' },
    ],
    primary_contact: {
      name: 'Michael Chen',
      email: 'michael@empacts.com',
      role: 'MENTOR',
    },
    mentor: {
      id: 'mentor-3',
      name: 'Michael Chen',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'DA_NANG',
      description: 'Product Development & Tech Leadership',
    },
  },
  {
    id: '4',
    mentor_id: 'mentor-4',
    startup_id: 'startup-1',
    title: 'EMPACTS Connect: Emily Rodriguez <> The Amazing Team',
    description: 'Fundraising strategy and investor relations',
    start_at: '2025-08-07T15:00:00Z',
    end_at: '2025-08-07T18:00:00Z',
    status: 'SCHEDULED',
    meet_link: 'meet.google.com/fin-tech-abc',
    attendees: [
      { name: 'Do Chi Thanh', email: 'memberA@startup.com' },
      { name: 'Emily Rodriguez', email: 'emily@empacts.com' },
    ],
    primary_contact: {
      name: 'Emily Rodriguez',
      email: 'emily@empacts.com',
      role: 'MENTOR',
    },
    mentor: {
      id: 'mentor-4',
      name: 'Emily Rodriguez',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'HO_CHI_MINH',
      description: 'Fundraising & Business Strategy',
    },
  },
  {
    id: '5',
    mentor_id: 'mentor-5',
    startup_id: 'startup-1',
    title: 'EMPACTS Connect: David Nguyen <> The Amazing Team',
    description: 'Operations optimization and scaling strategies',
    start_at: '2025-08-08T11:00:00Z',
    end_at: '2025-08-08T14:00:00Z',
    status: 'SCHEDULED',
    meet_link: 'meet.google.com/edu-tech-xyz',
    attendees: [
      { name: 'Do Chi Thanh', email: 'memberA@startup.com' },
      { name: 'David Nguyen', email: 'david@empacts.com' },
    ],
    primary_contact: {
      name: 'David Nguyen',
      email: 'david@empacts.com',
      role: 'MENTOR',
    },
    mentor: {
      id: 'mentor-5',
      name: 'David Nguyen',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'CAN_THO',
      description: 'Operations & Scaling',
    },
  },
  {
    id: '6',
    mentor_id: 'mentor-6',
    startup_id: 'startup-1',
    title: 'EMPACTS Connect: Anna Lee <> The Amazing Team',
    description: 'UX/UI improvements and product design review',
    start_at: '2025-08-09T09:30:00Z',
    end_at: '2025-08-09T12:30:00Z',
    status: 'SCHEDULED',
    meet_link: 'meet.google.com/health-tech-def',
    attendees: [
      { name: 'Do Chi Thanh', email: 'memberA@startup.com' },
      { name: 'Anna Lee', email: 'anna@empacts.com' },
    ],
    primary_contact: {
      name: 'Anna Lee',
      email: 'anna@empacts.com',
      role: 'MENTOR',
    },
    mentor: {
      id: 'mentor-6',
      name: 'Anna Lee',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'HA_NOI',
      description: 'UX/UI & Product Strategy',
    },
  },
];

const Content = () => {
  const [displayedMeetings, setDisplayedMeetings] = useState<ConnectionMeeting[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalItemsLoaded, setTotalItemsLoaded] = useState(0);
  const itemsPerPage = 3;

  // Initialize with first page of mock data
  useEffect(() => {
    const firstPageItems = mockMeetings.slice(0, itemsPerPage);
    setDisplayedMeetings(firstPageItems);
    setHasMore(mockMeetings.length > itemsPerPage);
    setCurrentPage(1);
    setTotalItemsLoaded(itemsPerPage);
  }, []);

  // Load more items for infinite scroll
  const loadMoreItems = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const startIndex = totalItemsLoaded;
      const endIndex = startIndex + itemsPerPage;
      const newItems = mockMeetings.slice(startIndex, endIndex);

      if (newItems.length > 0) {
        setDisplayedMeetings((prev) => [...prev, ...newItems]);
        setCurrentPage((page) => page + 1);
        setTotalItemsLoaded(endIndex);
        setHasMore(endIndex < mockMeetings.length);
      } else {
        setHasMore(false);
      }

      setLoadingMore(false);
    }, 500);
  }, [totalItemsLoaded, loadingMore, hasMore, itemsPerPage]);

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
          // Load next batch of items from mock data
          const startIndex = totalItemsLoaded;
          const endIndex = Math.min(startIndex + itemsPerPage, mockMeetings.length);
          const newItems = mockMeetings.slice(startIndex, endIndex);

          if (newItems.length > 0) {
            // Schedule the update to avoid React state update warnings
            setTimeout(() => {
              setDisplayedMeetings((current) => [...current, ...newItems]);
              setCurrentPage((page) => page + 1);
              setTotalItemsLoaded(endIndex);
              setHasMore(endIndex < mockMeetings.length);
            }, 100);
          } else {
            setHasMore(false);
          }
        }

        return updatedMeetings;
      });
    },
    [hasMore, loadingMore, itemsPerPage, totalItemsLoaded]
  );

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
