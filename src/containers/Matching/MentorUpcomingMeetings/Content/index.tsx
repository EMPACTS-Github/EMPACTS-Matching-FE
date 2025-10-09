import React, { useState, useCallback, useEffect } from 'react';
import MentorUpcomingMeetingItem from './MentorUpcomingMeetingItem';
import { ConnectionMeeting } from '@/interfaces/matching';

// Mock data based on API documentation structure
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
      name: 'Do Chi Thanh',
      email: 'memberA@startup.com',
      role: 'STARTUP',
    },
    startup: {
      id: 'startup-1',
      name: 'The Amazing Team',
      avtUrl:
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=face',
      locationBased: 'HA_NOI',
      description: 'A promising startup in the tech industry',
    },
  },
  {
    id: '2',
    mentor_id: 'mentor-1',
    startup_id: 'startup-2',
    title: 'EMPACTS Connect: Le Phuong Nam <> TechFlow Solutions',
    description: 'Technical architecture review and scaling strategies',
    start_at: '2025-08-05T14:00:00Z',
    end_at: '2025-08-05T17:00:00Z',
    status: 'SCHEDULED',
    meet_link: 'meet.google.com/abc-defg-hij',
    attendees: [
      { name: 'Nguyen Van Duc', email: 'duc@techflow.com' },
      { name: 'Le Phuong Nam', email: 'mentor@empacts.com' },
    ],
    primary_contact: {
      name: 'Nguyen Van Duc',
      email: 'duc@techflow.com',
      role: 'STARTUP',
    },
    startup: {
      id: 'startup-2',
      name: 'TechFlow Solutions',
      avtUrl:
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=64&h=64&fit=crop&crop=face',
      locationBased: 'HO_CHI_MINH',
      description: 'Tech solutions provider for enterprise clients',
    },
  },
  {
    id: '3',
    mentor_id: 'mentor-1',
    startup_id: 'startup-3',
    title: 'EMPACTS Connect: Le Phuong Nam <> Green Innovation Hub',
    description: 'Sustainability and environmental impact discussion',
    start_at: '2025-08-06T10:00:00Z',
    end_at: '2025-08-06T13:00:00Z',
    status: 'SCHEDULED',
    meet_link: 'meet.google.com/xyz-uvwx-rst',
    attendees: [
      { name: 'Tran Thi Linh', email: 'linh@greeninnovation.vn' },
      { name: 'Le Phuong Nam', email: 'mentor@empacts.com' },
    ],
    primary_contact: {
      name: 'Tran Thi Linh',
      email: 'linh@greeninnovation.vn',
      role: 'STARTUP',
    },
    startup: {
      id: 'startup-3',
      name: 'Green Innovation Hub',
      avtUrl:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=64&h=64&fit=crop&crop=face',
      locationBased: 'DA_NANG',
      description: 'Green technology and sustainable solutions',
    },
  },
  {
    id: '4',
    mentor_id: 'mentor-1',
    startup_id: 'startup-4',
    title: 'EMPACTS Connect: Le Phuong Nam <> FinTech Innovators',
    description: 'Financial technology and market expansion strategies',
    start_at: '2025-08-07T15:00:00Z',
    end_at: '2025-08-07T18:00:00Z',
    status: 'SCHEDULED',
    meet_link: 'meet.google.com/fin-tech-abc',
    attendees: [
      { name: 'Pham Van Hieu', email: 'hieu@fintech.vn' },
      { name: 'Le Phuong Nam', email: 'mentor@empacts.com' },
    ],
    primary_contact: {
      name: 'Pham Van Hieu',
      email: 'hieu@fintech.vn',
      role: 'STARTUP',
    },
    startup: {
      id: 'startup-4',
      name: 'FinTech Innovators',
      avtUrl:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop&crop=face',
      locationBased: 'HO_CHI_MINH',
      description: 'Financial technology solutions',
    },
  },
  {
    id: '5',
    mentor_id: 'mentor-1',
    startup_id: 'startup-5',
    title: 'EMPACTS Connect: Le Phuong Nam <> EduTech Connect',
    description: 'Educational technology and learning platform development',
    start_at: '2025-08-08T11:00:00Z',
    end_at: '2025-08-08T14:00:00Z',
    status: 'SCHEDULED',
    meet_link: 'meet.google.com/edu-tech-xyz',
    attendees: [
      { name: 'Hoang Thi Mai', email: 'mai@edutech.vn' },
      { name: 'Le Phuong Nam', email: 'mentor@empacts.com' },
    ],
    primary_contact: {
      name: 'Hoang Thi Mai',
      email: 'mai@edutech.vn',
      role: 'STARTUP',
    },
    startup: {
      id: 'startup-5',
      name: 'EduTech Connect',
      avtUrl:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=64&h=64&fit=crop&crop=face',
      locationBased: 'HA_NOI',
      description: 'Educational platform for online learning',
    },
  },
  {
    id: '6',
    mentor_id: 'mentor-1',
    startup_id: 'startup-6',
    title: 'EMPACTS Connect: Le Phuong Nam <> HealthTech Solutions',
    description: 'Healthcare technology and telemedicine platform',
    start_at: '2025-08-09T09:30:00Z',
    end_at: '2025-08-09T12:30:00Z',
    status: 'SCHEDULED',
    meet_link: 'meet.google.com/health-tech-def',
    attendees: [
      { name: 'Nguyen Minh Duc', email: 'duc@healthtech.vn' },
      { name: 'Le Phuong Nam', email: 'mentor@empacts.com' },
    ],
    primary_contact: {
      name: 'Nguyen Minh Duc',
      email: 'duc@healthtech.vn',
      role: 'STARTUP',
    },
    startup: {
      id: 'startup-6',
      name: 'HealthTech Solutions',
      avtUrl:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=64&h=64&fit=crop&crop=face',
      locationBased: 'CAN_THO',
      description: 'Healthcare and medical technology solutions',
    },
  },
];

const Content = () => {
  const [displayedMeetings, setDisplayedMeetings] = useState<ConnectionMeeting[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalItemsLoaded, setTotalItemsLoaded] = useState(0); // Track total items loaded from mock
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
            // Use functional update to ensure we append to the latest state
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
      className='flex flex-col gap-6 h-full max-h-[40vh] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-40 scrollbar-track-neutral-20'
      onScroll={(e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        // Trigger load more when scrolled to 80% of content
        if (scrollTop + clientHeight >= scrollHeight * 0.8 && hasMore && !loadingMore) {
          loadMoreItems();
        }
      }}
    >
      {displayedMeetings.map((meeting) => (
        <MentorUpcomingMeetingItem
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
