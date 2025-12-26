export const MATCHING_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
};

export const MEETING_STATUS = {
  SCHEDULING: 'SCHEDULING',
  SCHEDULED: 'SCHEDULED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
  EXPIRED: 'EXPIRED',
};

export const PAST_MEETING_STATUS = [
  {
    label: 'Completed Meeting',
    value: 'completed',
  },
  {
    label: 'Cancelled Meeting',
    value: 'cancelled',
  },
  {
    label: 'Expired Meeting',
    value: 'expired',
  },
];

export const FILTER_STATUS = {
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;

export const MEETING_VIEW = {
  PAST: 'past',
  UPCOMING: 'upcoming',
  CANCELED: 'canceled',
} as const;

export type MeetingViewType = (typeof MEETING_VIEW)[keyof typeof MEETING_VIEW];

export const SCROLL_CONFIG = {
  THRESHOLD: 0.8,
  LOAD_MORE_DELAY: 500,
} as const;

export const CONNECTION_REQUEST_STATUS = [
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Accepted',
    value: 'accepted',
  },
];
