'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Avatar from '@/components/Avatar/Avatar';

// Interfaces for type safety
interface Mentor {
  id: string;
  name: string;
  avatar: string;
  expertise: string[];
  location: string;
  experience: number;
  rating: number;
}

interface SentInvitation {
  id: string;
  mentor: Mentor;
  sentDate: string;
  status: 'pending' | 'accepted' | 'declined';
  message: string;
  meetingDate?: string;
}

// Mock data with more items for infinite scroll demo
const mockInvitations: SentInvitation[] = [
  {
    id: '1',
    mentor: {
      id: 'm1',
      name: 'Sarah Johnson',
      avatar: '/assets/avatar-placeholder.png',
      expertise: ['Digital Marketing', 'Growth Strategy'],
      location: 'Ho Chi Minh City',
      experience: 8,
      rating: 4.8,
    },
    sentDate: '2024-01-15',
    status: 'pending',
    message: 'Hi Sarah, I would love to discuss our digital marketing strategy with you.',
    meetingDate: '2024-01-20',
  },
  {
    id: '2',
    mentor: {
      id: 'm2',
      name: 'Michael Chen',
      avatar: '/assets/avatar-placeholder.png',
      expertise: ['Product Development', 'Tech Leadership'],
      location: 'Ha Noi',
      experience: 12,
      rating: 4.9,
    },
    sentDate: '2024-01-14',
    status: 'accepted',
    message: 'Hello Michael, we need guidance on our product roadmap.',
    meetingDate: '2024-01-18',
  },
  {
    id: '3',
    mentor: {
      id: 'm3',
      name: 'Emily Rodriguez',
      avatar: '/assets/avatar-placeholder.png',
      expertise: ['Fundraising', 'Business Strategy'],
      location: 'Da Nang',
      experience: 10,
      rating: 4.7,
    },
    sentDate: '2024-01-13',
    status: 'declined',
    message: 'Hi Emily, we are preparing for Series A and need your expertise.',
  },
  {
    id: '4',
    mentor: {
      id: 'm4',
      name: 'David Nguyen',
      avatar: '/assets/avatar-placeholder.png',
      expertise: ['Operations', 'Scaling'],
      location: 'Can Tho',
      experience: 7,
      rating: 4.6,
    },
    sentDate: '2024-01-12',
    status: 'pending',
    message: 'Hi David, we are refining our operations and would like your input.',
    meetingDate: '2024-01-22',
  },
  {
    id: '5',
    mentor: {
      id: 'm5',
      name: 'Anna Lee',
      avatar: '/assets/avatar-placeholder.png',
      expertise: ['UX/UI', 'Product Strategy'],
      location: 'Ho Chi Minh City',
      experience: 9,
      rating: 4.8,
    },
    sentDate: '2024-01-11',
    status: 'accepted',
    message: 'Hello Anna, we want to improve our onboarding experience.',
    meetingDate: '2024-01-19',
  },
  {
    id: '6',
    mentor: {
      id: 'm6',
      name: 'Carlos Martinez',
      avatar: '/assets/avatar-placeholder.png',
      expertise: ['Sales', 'Go-To-Market'],
      location: 'Da Nang',
      experience: 11,
      rating: 4.7,
    },
    sentDate: '2024-01-10',
    status: 'declined',
    message: 'Hi Carlos, we are planning our GTM for Q1 and need guidance.',
  },
  {
    id: '7',
    mentor: {
      id: 'm7',
      name: 'Jennifer Park',
      avatar: '/assets/avatar-placeholder.png',
      expertise: ['Content Marketing', 'Brand Strategy'],
      location: 'Ho Chi Minh City',
      experience: 6,
      rating: 4.5,
    },
    sentDate: '2024-01-09',
    status: 'pending',
    message: 'Hi Jennifer, we need help with our brand positioning strategy.',
    meetingDate: '2024-01-25',
  },
  {
    id: '8',
    mentor: {
      id: 'm8',
      name: 'Robert Kim',
      avatar: '/assets/avatar-placeholder.png',
      expertise: ['Tech Architecture', 'DevOps'],
      location: 'Ha Noi',
      experience: 15,
      rating: 4.9,
    },
    sentDate: '2024-01-08',
    status: 'accepted',
    message: 'Hello Robert, we want to discuss our technical infrastructure.',
    meetingDate: '2024-01-16',
  },
  {
    id: '9',
    mentor: {
      id: 'm9',
      name: 'Lisa Wang',
      avatar: '/assets/avatar-placeholder.png',
      expertise: ['HR Strategy', 'Team Building'],
      location: 'Da Nang',
      experience: 8,
      rating: 4.6,
    },
    sentDate: '2024-01-07',
    status: 'pending',
    message: 'Hi Lisa, we need guidance on scaling our team effectively.',
    meetingDate: '2024-01-23',
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
  invitation: SentInvitation;
}> = ({ invitation }) => (
  <div className='bg-white rounded-xl p-medium border border-neutral-30 shadow-sm'>
    <div className='flex items-start gap-regular'>
      {/* Avatar */}
      <MentorAvatar avatar={invitation.mentor.avatar} name={invitation.mentor.name} size='md' />

      {/* Content */}
      <div className='flex-1'>
        {/* Header with name, location and status */}
        <div className='flex items-start justify-between mb-small'>
          <div>
            <h3 className='font-semibold text-secondary text-base'>{invitation.mentor.name}</h3>
            <p className='text-sm text-neutral-80'>{invitation.mentor.location}</p>
          </div>
          <div className='flex flex-col items-end gap-extra-small'>
            <p className='text-sm text-neutral-50'>
              {formatDateRange(invitation.sentDate, invitation.meetingDate)}
            </p>
          </div>
        </div>

        {/* Notes section */}
        <div className='mt-small'>
          <h4 className='font-medium text-secondary text-sm mb-extra-small'>Notes</h4>
          <p className='text-sm text-neutral-80 leading-relaxed'>&ldquo;{invitation.message}&rdquo;</p>
        </div>
      </div>
    </div>
  </div>
);

// Main Component - With Infinite Scrolling
const SentInvitations: React.FC = () => {
  const [displayedInvitations, setDisplayedInvitations] = useState<SentInvitation[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 3; // Keep 3 items per page as requested

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
    }, 500); // Small delay for UX
  }, [currentPage, itemsPerPage, loadingMore, hasMore]);

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
            <p className='text-neutral-50 text-sm'>You&rsquo;ve reached the end of your invitations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentInvitations;
