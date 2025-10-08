'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Avatar from '@/components/Avatar/Avatar';
import { ConnectRequest } from '@/interfaces/matching';
import { getProvince } from '@/utils/getProvince';

// Mock data based on API documentation structure
const mockInvitations: ConnectRequest[] = [
  {
    id: '1',
    startup_id: 'startup-1',
    mentor_id: 'm1',
    startup_founder_id: 'founder-1',
    startup_founder_email: 'founder@startup.com',
    mentor_email: 'sarah.johnson@email.com',
    connect_request_code: 'CR-001',
    request_schedule: '2024-01-20T13:30:00Z',
    note: 'Hi Sarah, I would love to discuss our digital marketing strategy with you.',
    meeting_link: '',
    status: 'PENDING',
    responded_by: null,
    responded_at: null,
    expired_at: '2024-01-25T13:30:00Z',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    mentor: {
      id: 'm1',
      name: 'Sarah Johnson',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'HO_CHI_MINH',
      description: 'Digital Marketing Expert',
    },
  },
  {
    id: '2',
    startup_id: 'startup-1',
    mentor_id: 'm2',
    startup_founder_id: 'founder-1',
    startup_founder_email: 'founder@startup.com',
    mentor_email: 'michael.chen@email.com',
    connect_request_code: 'CR-002',
    request_schedule: '2024-01-18T14:00:00Z',
    note: 'Hello Michael, we need guidance on our product roadmap.',
    meeting_link: 'https://meet.google.com/abc-defg-hij',
    status: 'APPROVED',
    responded_by: 'm2',
    responded_at: '2024-01-14T15:30:00Z',
    expired_at: null,
    created_at: '2024-01-14T09:00:00Z',
    updated_at: '2024-01-14T15:30:00Z',
    mentor: {
      id: 'm2',
      name: 'Michael Chen',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'HA_NOI',
      description: 'Product Development & Tech Leadership',
    },
  },
  {
    id: '3',
    startup_id: 'startup-1',
    mentor_id: 'm3',
    startup_founder_id: 'founder-1',
    startup_founder_email: 'founder@startup.com',
    mentor_email: 'emily.rodriguez@email.com',
    connect_request_code: 'CR-003',
    request_schedule: '2024-01-17T10:00:00Z',
    note: 'Hi Emily, we are preparing for Series A and need your expertise.',
    meeting_link: '',
    status: 'REJECTED',
    responded_by: 'm3',
    responded_at: '2024-01-13T16:00:00Z',
    expired_at: null,
    created_at: '2024-01-13T08:00:00Z',
    updated_at: '2024-01-13T16:00:00Z',
    mentor: {
      id: 'm3',
      name: 'Emily Rodriguez',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'DA_NANG',
      description: 'Fundraising & Business Strategy',
    },
  },
  {
    id: '4',
    startup_id: 'startup-1',
    mentor_id: 'm4',
    startup_founder_id: 'founder-1',
    startup_founder_email: 'founder@startup.com',
    mentor_email: 'david.nguyen@email.com',
    connect_request_code: 'CR-004',
    request_schedule: '2024-01-22T15:00:00Z',
    note: 'Hi David, we are refining our operations and would like your input.',
    meeting_link: '',
    status: 'PENDING',
    responded_by: null,
    responded_at: null,
    expired_at: '2024-01-27T15:00:00Z',
    created_at: '2024-01-12T11:00:00Z',
    updated_at: '2024-01-12T11:00:00Z',
    mentor: {
      id: 'm4',
      name: 'David Nguyen',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'CAN_THO',
      description: 'Operations & Scaling',
    },
  },
  {
    id: '5',
    startup_id: 'startup-1',
    mentor_id: 'm5',
    startup_founder_id: 'founder-1',
    startup_founder_email: 'founder@startup.com',
    mentor_email: 'anna.lee@email.com',
    connect_request_code: 'CR-005',
    request_schedule: '2024-01-19T09:30:00Z',
    note: 'Hello Anna, we want to improve our onboarding experience.',
    meeting_link: 'https://meet.google.com/xyz-abcd-efg',
    status: 'APPROVED',
    responded_by: 'm5',
    responded_at: '2024-01-11T14:00:00Z',
    expired_at: null,
    created_at: '2024-01-11T10:00:00Z',
    updated_at: '2024-01-11T14:00:00Z',
    mentor: {
      id: 'm5',
      name: 'Anna Lee',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'HO_CHI_MINH',
      description: 'UX/UI & Product Strategy',
    },
  },
  {
    id: '6',
    startup_id: 'startup-1',
    mentor_id: 'm6',
    startup_founder_id: 'founder-1',
    startup_founder_email: 'founder@startup.com',
    mentor_email: 'carlos.martinez@email.com',
    connect_request_code: 'CR-006',
    request_schedule: '2024-01-16T11:00:00Z',
    note: 'Hi Carlos, we are planning our GTM for Q1 and need guidance.',
    meeting_link: '',
    status: 'CANCELLED',
    responded_by: 'founder-1',
    responded_at: '2024-01-10T12:00:00Z',
    expired_at: null,
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-10T12:00:00Z',
    mentor: {
      id: 'm6',
      name: 'Carlos Martinez',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'DA_NANG',
      description: 'Sales & Go-To-Market',
    },
  },
  {
    id: '7',
    startup_id: 'startup-1',
    mentor_id: 'm7',
    startup_founder_id: 'founder-1',
    startup_founder_email: 'founder@startup.com',
    mentor_email: 'jennifer.park@email.com',
    connect_request_code: 'CR-007',
    request_schedule: '2024-01-25T16:00:00Z',
    note: 'Hi Jennifer, we need help with our brand positioning strategy.',
    meeting_link: '',
    status: 'PENDING',
    responded_by: null,
    responded_at: null,
    expired_at: '2024-01-30T16:00:00Z',
    created_at: '2024-01-09T13:00:00Z',
    updated_at: '2024-01-09T13:00:00Z',
    mentor: {
      id: 'm7',
      name: 'Jennifer Park',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'HO_CHI_MINH',
      description: 'Content Marketing & Brand Strategy',
    },
  },
  {
    id: '8',
    startup_id: 'startup-1',
    mentor_id: 'm8',
    startup_founder_id: 'founder-1',
    startup_founder_email: 'founder@startup.com',
    mentor_email: 'robert.kim@email.com',
    connect_request_code: 'CR-008',
    request_schedule: '2024-01-05T10:00:00Z',
    note: 'Hello Robert, we want to discuss our technical infrastructure.',
    meeting_link: '',
    status: 'EXPIRED',
    responded_by: null,
    responded_at: null,
    expired_at: '2024-01-08T10:00:00Z',
    created_at: '2024-01-08T08:00:00Z',
    updated_at: '2024-01-08T10:00:00Z',
    mentor: {
      id: 'm8',
      name: 'Robert Kim',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'HA_NOI',
      description: 'Tech Architecture & DevOps',
    },
  },
  {
    id: '9',
    startup_id: 'startup-1',
    mentor_id: 'm9',
    startup_founder_id: 'founder-1',
    startup_founder_email: 'founder@startup.com',
    mentor_email: 'lisa.wang@email.com',
    connect_request_code: 'CR-009',
    request_schedule: '2024-01-23T14:30:00Z',
    note: 'Hi Lisa, we need guidance on scaling our team effectively.',
    meeting_link: '',
    status: 'PENDING',
    responded_by: null,
    responded_at: null,
    expired_at: '2024-01-28T14:30:00Z',
    created_at: '2024-01-07T09:30:00Z',
    updated_at: '2024-01-07T09:30:00Z',
    mentor: {
      id: 'm9',
      name: 'Lisa Wang',
      avtUrl: '/assets/avatar-placeholder.png',
      locationBased: 'DA_NANG',
      description: 'HR Strategy & Team Building',
    },
  },
];

// Mentor Avatar Component - Using project's Avatar component
const MentorAvatar: React.FC<{
  avatar: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ avatar, name, size = 'md' }) => {
  const variant =
    `default-${size}` as keyof typeof import('@/components/Avatar/Avatar').avatarPresets;

  return (
    <Avatar
      src={avatar}
      alt={name}
      name={name}
      variant={variant}
      fallback={name.charAt(0).toUpperCase()}
      showFallback={true}
    />
  );
};

// Helpers: date formatting (ordinal day + optional time range)
const getOrdinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const formatDateRange = (startDateIso?: string, endDateIso?: string) => {
  if (!startDateIso) return '';
  const start = new Date(startDateIso);

  const weekday = start.toLocaleDateString('en-US', { weekday: 'long' });
  const month = start.toLocaleDateString('en-US', { month: 'long' });
  const day = getOrdinal(start.getDate());
  const year = start.getFullYear();

  // If time information isn't provided, show only date
  // For mock/demo, show a fixed time range to match Figma when endDate provided
  if (endDateIso) {
    const fromTime = '1:30PM';
    const toTime = '4:30PM';
    return `${weekday}, ${month} ${day}, ${year} at ${fromTime} - ${toTime}`;
  }

  return `${weekday}, ${month} ${day}, ${year}`;
};

// Invitation Card Component - Within Container Design
const InvitationCard: React.FC<{
  invitation: ConnectRequest;
}> = ({ invitation }) => {
  const mentorAvatar = invitation.mentor?.avtUrl || '/assets/avatar-placeholder.png';
  const mentorName = invitation.mentor?.name || 'Unknown Mentor';
  const mentorLocation = invitation.mentor?.locationBased
    ? getProvince(invitation.mentor.locationBased)
    : '';

  return (
    <div className='bg-white rounded-xl p-medium border border-neutral-30 shadow-sm'>
      <div className='flex items-start gap-regular'>
        {/* Avatar */}
        <MentorAvatar avatar={mentorAvatar} name={mentorName} size='md' />

        {/* Content */}
        <div className='flex-1'>
          {/* Header with name, location and status */}
          <div className='flex items-start justify-between mb-small'>
            <div>
              <h3 className='font-semibold text-secondary text-base'>{mentorName}</h3>
              <p className='text-sm text-neutral-80'>{mentorLocation}</p>
            </div>
            <div className='flex flex-col items-end gap-extra-small'>
              <p className='text-sm text-neutral-50'>
                {formatDateRange(invitation.created_at, invitation.request_schedule)}
              </p>
            </div>
          </div>

          {/* Notes section */}
          <div className='mt-small'>
            <h4 className='font-medium text-secondary text-sm mb-extra-small'>Notes</h4>
            <p className='text-sm text-neutral-80 leading-relaxed'>
              {invitation.note ? `"${invitation.note}"` : 'No notes provided'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component - With Infinite Scrolling
const SentInvitations: React.FC = () => {
  const [displayedInvitations, setDisplayedInvitations] = useState<ConnectRequest[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 3;

  // Initialize with first page of mock data
  useEffect(() => {
    const firstPageItems = mockInvitations.slice(0, itemsPerPage);
    setDisplayedInvitations(firstPageItems);
    setHasMore(mockInvitations.length > itemsPerPage);
    setCurrentPage(1);
  }, []);

  // Load more items for infinite scroll
  const loadMoreItems = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newItems = mockInvitations.slice(startIndex, endIndex);

      if (newItems.length > 0) {
        setDisplayedInvitations((prev) => [...prev, ...newItems]);
        setCurrentPage(nextPage);
        setHasMore(endIndex < mockInvitations.length);
      } else {
        setHasMore(false);
      }

      setLoadingMore(false);
    }, 500);
  }, [currentPage, loadingMore, hasMore]);

  if (displayedInvitations.length === 0) {
    return (
      <div className='w-full text-center py-large'>
        <p className='text-neutral-80'>No invitations found.</p>
      </div>
    );
  }

  return (
    <div
      className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-40 scrollbar-track-neutral-20 p-medium'
      onScroll={(e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        // Trigger load more when scrolled to 80% of content
        if (scrollTop + clientHeight >= scrollHeight * 0.8 && hasMore && !loadingMore) {
          loadMoreItems();
        }
      }}
    >
      <div className='space-y-medium pr-2'>
        {displayedInvitations.map((invitation) => (
          <InvitationCard key={invitation.id} invitation={invitation} />
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
        {!hasMore && displayedInvitations.length > 0 && (
          <div className='text-center py-medium'>
            <p className='text-neutral-50 text-sm'>
              You&rsquo;ve reached the end of your invitations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentInvitations;
