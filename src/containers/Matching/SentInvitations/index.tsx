'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { addToast } from '@heroui/react';
import Avatar from '@/components/Avatar/Avatar';
import { ConnectRequest } from '@/interfaces/matching';
import { getProvince } from '@/utils/getProvince';
import { startup_matching_activity } from '@/apis/startup-matching';
import { PROFILE_MESSAGES } from '@/constants';
import { DEFAULT_TOAST_TIMEOUT, TOAST_COLORS } from '@/constants/api';

interface SentInvitationsProps {
  startupId: string;
}

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
const SentInvitations: React.FC<SentInvitationsProps> = ({ startupId }) => {
  const [displayedInvitations, setDisplayedInvitations] = useState<ConnectRequest[]>([]);
  const [allInvitations, setAllInvitations] = useState<ConnectRequest[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalItemsLoaded, setTotalItemsLoaded] = useState(0);
  const itemsPerPage = 3;

  // Fetch sent invitations from API
  useEffect(() => {
    const fetchInvitations = async () => {
      if (!startupId) return;

      setIsInitialLoading(true);
      try {
        const response = await startup_matching_activity(startupId);
        const invitations = response.data || [];
        setAllInvitations(invitations);

        // Display first page
        const firstPageItems = invitations.slice(0, itemsPerPage);
        setDisplayedInvitations(firstPageItems);
        setHasMore(invitations.length > itemsPerPage);
        setCurrentPage(1);
        setTotalItemsLoaded(itemsPerPage);
      } catch (error: any) {
        console.error('Error fetching sent invitations:', error);
        addToast({
          title: error?.response?.data?.message || error?.message || PROFILE_MESSAGES.GENERAL_ERROR,
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
        // Set empty state on error
        setAllInvitations([]);
        setDisplayedInvitations([]);
        setHasMore(false);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchInvitations();
  }, [startupId]);

  // Load more items for infinite scroll
  const loadMoreItems = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const startIndex = totalItemsLoaded;
      const endIndex = startIndex + itemsPerPage;
      const newItems = allInvitations.slice(startIndex, endIndex);

      if (newItems.length > 0) {
        setDisplayedInvitations((prev) => [...prev, ...newItems]);
        setCurrentPage((page) => page + 1);
        setTotalItemsLoaded(endIndex);
        setHasMore(endIndex < allInvitations.length);
      } else {
        setHasMore(false);
      }

      setLoadingMore(false);
    }, 500);
  }, [totalItemsLoaded, loadingMore, hasMore, itemsPerPage, allInvitations]);

  // Show loading on initial fetch
  if (isInitialLoading) {
    return (
      <div className='w-full text-center py-large'>
        <p className='text-neutral-80'>Loading invitations...</p>
      </div>
    );
  }

  // Show empty state
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
