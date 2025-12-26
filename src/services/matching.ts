import { getOrdinal } from '@/utils/getOrdinal';

/**
 * Format meeting date and time range
 * @param startAt ISO 8601 date string
 * @param endAt ISO 8601 date string
 * @returns Formatted string like "Monday, August 4th, 2025 at 1:30PM - 4:30PM"
 */
export const formatMeetingDateTime = (startAt: string, endAt: string): string => {
  const start = new Date(startAt);
  const end = new Date(endAt);

  const weekday = start.toLocaleDateString('en-US', { weekday: 'long' });
  const month = start.toLocaleDateString('en-US', { month: 'long' });
  const day = getOrdinal(start.getDate());
  const year = start.getFullYear();

  const startTime = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const endTime = end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${weekday}, ${month} ${day}, ${year} at ${startTime} - ${endTime}`;
};

/**
 * Generate meeting title in the format "EMPACTS Connect: [Mentor Name] <> [Startup Name]"
 * @param mentorName Name of the mentor
 * @param startupName Name of the startup
 * @returns Formatted meeting title
 */
export const generateMeetingTitle = (mentorName: string, startupName: string): string => {
  return `EMPACTS Connect: ${mentorName} <> ${startupName}`;
};

