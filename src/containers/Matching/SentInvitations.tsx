'use client';

import React, { useState } from 'react';
import Avatar from '@/components/Avatar/Avatar';
import Pagination from '@/components/common/Pagination';

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

// Mock data
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
      rating: 4.8
    },
    sentDate: '2024-01-15',
    status: 'pending',
    message: 'Hi Sarah, I would love to discuss our digital marketing strategy with you.',
    meetingDate: '2024-01-20'
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
      rating: 4.9
    },
    sentDate: '2024-01-14',
    status: 'accepted',
    message: 'Hello Michael, we need guidance on our product roadmap.',
    meetingDate: '2024-01-18'
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
      rating: 4.7
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
      rating: 4.6
    },
    sentDate: '2024-01-12',
    status: 'pending',
    message: 'Hi David, we are refining our operations and would like your input.',
    meetingDate: '2024-01-22'
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
      rating: 4.8
    },
    sentDate: '2024-01-11',
    status: 'accepted',
    message: 'Hello Anna, we want to improve our onboarding experience.',
    meetingDate: '2024-01-19'
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
      rating: 4.7
    },
    sentDate: '2024-01-10',
    status: 'declined',
    message: 'Hi Carlos, we are planning our GTM for Q1 and need guidance.'
  }
];

// Inline Components for reusability

// Removed status filter component - not needed in simple design

// Mentor Avatar Component - Using project's Avatar component
const MentorAvatar: React.FC<{
  avatar: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ avatar, name, size = 'md' }) => {
  const variant = `default-${size}` as keyof typeof import('@/components/Avatar/Avatar').avatarPresets;
  
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

// Removed status badge and expertise tags components - not needed in simple design

// Helpers: date formatting (ordinal day + optional time range)
const getOrdinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
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
  <div className="bg-white rounded-xl p-medium border border-neutral-30">
    <div className="flex items-start gap-regular">
      {/* Avatar */}
      <MentorAvatar 
        avatar={invitation.mentor.avatar} 
        name={invitation.mentor.name}
        size="md"
      />

      {/* Content */}
      <div className="flex-1">
        {/* Header with name, location and status */}
        <div className="flex items-start justify-between mb-small">
          <div>
            <h3 className="font-semibold text-secondary text-base">{invitation.mentor.name}</h3>
            <p className="text-sm text-neutral-80">{invitation.mentor.location}</p>
          </div>
          <div className="flex flex-col items-end gap-extra-small">
            <p className="text-sm text-neutral-50">
              {formatDateRange(invitation.sentDate, invitation.meetingDate)}
            </p>
          </div>
        </div>

        {/* Notes section */}
        <div className="mt-small">
          <h4 className="font-medium text-secondary text-sm mb-extra-small">Notes</h4>
          <p className="text-sm text-neutral-80 leading-relaxed">“{invitation.message}”</p>
        </div>
      </div>
    </div>
  </div>
);

// Removed empty state component - using simple inline message instead

// Main Component - With Background Container and Pagination
const SentInvitations: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Show 3 invitations per page (as shown in screenshot)
  
  // Calculate pagination
  const totalPages = Math.ceil(mockInvitations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvitations = mockInvitations.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of container when changing pages
    const container = document.getElementById('sent-invitations-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div 
        id="sent-invitations-container"
        className="w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-[0px_0px_8px_0px_rgba(10,20,57,0.07)]"
      >
        {/* Header Section */}
        <div className="px-large pt-large pb-medium">
          <h1 className="text-2xl font-bold text-primary mb-extra-small">Sent Invitations</h1>
          <p className="text-neutral-80">Mentors you have invited to connect.</p>
        </div>

        {/* Content Area */}
        <div className="px-large">
          {currentInvitations.length === 0 ? (
            <div className="text-center py-extra-large">
              <p className="text-neutral-80">No invitations found for this page.</p>
            </div>
          ) : (
            <div className="space-y-medium">
              {currentInvitations.map((invitation) => (
                <InvitationCard
                  key={invitation.id}
                  invitation={invitation}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="px-large py-medium flex justify-end bg-white">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="justify-end"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SentInvitations;
