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
