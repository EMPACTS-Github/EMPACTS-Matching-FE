import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@heroui/card';
import { addToast } from '@heroui/react';
import TextLine from '@/components/common/TextLine';
import Avatar from '@/components/Avatar/Avatar';
import { Spacer } from '@heroui/spacer';
import Button from '@/components/Button/Button';
import Calendar from '@/components/Calendar/Calendar';
import { get_mentor_availability } from '@/apis/mentor-profile';
import { getMentorBusySchedule } from '@/apis/connection-meeting';
import { MentorAvailability, DayOfWeek, TimeSlot } from '@/interfaces/mentor';
import { CalendarDate } from '@internationalized/date';
import ScheduleMeetingModal from '@/components/Modal/ScheduleMeetingModal';
import { TOAST_COLORS, DEFAULT_TOAST_TIMEOUT } from '@/constants/api';

interface BusySlot {
  startSecondOfDay: number;
  endSecondOfDay: number;
}

interface LocalBusySlot {
  startSecondOfDay: number;
  endSecondOfDay: number;
}

interface BusyScheduleItem {
  date: string;
  busy: BusySlot[];
}

interface ScheduleMeetingDetailCardProps {
  name?: string;
  location?: string;
  avtUrl?: string;
  mentorId?: string;
  startupId?: string;
  onMeetingScheduled?: () => void;
}

// Helper function to convert seconds from midnight to time string (e.g., "6:00 AM")
const formatTimeFromSeconds = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${displayHours}:${displayMinutes} ${period}`;
};

// Helper function to format time slot display (e.g., "6:00 AM - 7:00 AM")
const formatTimeSlot = (from: number, to: number): string => {
  return `${formatTimeFromSeconds(from)} - ${formatTimeFromSeconds(to)}`;
};

const ScheduleMeetingDetailCard: React.FC<ScheduleMeetingDetailCardProps> = ({
  name,
  location,
  avtUrl,
  mentorId,
  startupId,
  onMeetingScheduled,
}) => {
  const [availability, setAvailability] = useState<MentorAvailability | null>(null);
  const [busySchedule, setBusySchedule] = useState<BusyScheduleItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch mentor availability and busy schedule when mentorId changes
  useEffect(() => {
    const fetchData = async () => {
      if (!mentorId) return;
      setIsLoading(true);
      try {
        // Fetch both availability and busy schedule in parallel
        const [availabilityResponse, busyResponse] = await Promise.all([
          get_mentor_availability(mentorId),
          getMentorBusySchedule(mentorId).catch(() => []), // Return empty array if fails
        ]);

        if (availabilityResponse?.data?.mentorAvailability) {
          setAvailability(availabilityResponse.data.mentorAvailability);
        }
        setBusySchedule(busyResponse || []);
      } catch {
        addToast({
          title: 'Failed to fetch mentor availability',
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
        setAvailability(null);
        setBusySchedule([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // Reset selection when mentor changes
    setSelectedDate(null);
    setSelectedDay(null);
    setSelectedSlotId(null);
    setSelectedSlot(null);
  }, [mentorId]);

  // Handle date selection from calendar
  const handleDateSelect = (date: CalendarDate, dayOfWeek: DayOfWeek) => {
    setSelectedDate(date);
    setSelectedDay(dayOfWeek);
    setSelectedSlotId(null); // Reset slot selection when date changes
    setSelectedSlot(null);
  };

  // Handle slot selection - open modal
  const handleSlotClick = (slot: TimeSlot) => {
    setSelectedSlotId(slot.id);
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  // Convert CalendarDate and time slot to Date objects
  const getStartDateTime = (): Date => {
    if (!selectedDate || !selectedSlot) return new Date();
    const date = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
    const hours = Math.floor(selectedSlot.from / 3600);
    const minutes = Math.floor((selectedSlot.from % 3600) / 60);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const getEndDateTime = (): Date => {
    if (!selectedDate || !selectedSlot) return new Date();
    const date = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
    const hours = Math.floor(selectedSlot.to / 3600);
    const minutes = Math.floor((selectedSlot.to % 3600) / 60);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Handle meeting scheduled success
  const handleMeetingSuccess = async () => {
    setSelectedSlotId(null);
    setSelectedSlot(null);

    // Refresh busy schedule after scheduling a meeting
    if (mentorId) {
      try {
        const busyResponse = await getMentorBusySchedule(mentorId);
        setBusySchedule(busyResponse || []);
      } catch {
        // Silently fail - the slot will be refreshed on next mentor change
      }
    }

    if (onMeetingScheduled) {
      onMeetingScheduled();
    }
  };

  // Check if a slot overlaps with a busy slot (using local time)
  const isSlotBusy = (slot: TimeSlot, busySlots: LocalBusySlot[]): boolean => {
    return busySlots.some((busy) => {
      // Check if there's any overlap between the slot and busy time
      // Overlap occurs when: slot.from < busy.end AND slot.to > busy.start
      return slot.from < busy.endSecondOfDay && slot.to > busy.startSecondOfDay;
    });
  };

  // Convert CalendarDate to local Date object at midnight
  const calendarDateToLocalDate = (date: CalendarDate): Date => {
    return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
  };

  // Format Date to YYYY-MM-DD string in local timezone
  const formatDateToLocalString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Convert API busy slot to local time busy slot
  // API returns times that might be in UTC, we need to convert to local timezone
  const convertBusySlotToLocal = (
    apiDateString: string,
    busySlot: BusySlot,
    targetDateString: string
  ): LocalBusySlot | null => {
    // Parse the API date - check if it includes time info
    const isISODatetime = apiDateString.includes('T') || apiDateString.includes('Z');

    let baseDate: Date;
    if (isISODatetime) {
      // If API date is ISO datetime, use it as base (already has timezone info)
      baseDate = new Date(apiDateString);
      baseDate.setHours(0, 0, 0, 0); // Reset to midnight of that date in its timezone
    } else {
      // Simple date string - assume it's in UTC
      // Parse as UTC midnight
      baseDate = new Date(`${apiDateString}T00:00:00Z`);
    }

    // Create start and end datetime by adding seconds to the base date
    const startDateTime = new Date(baseDate.getTime() + busySlot.startSecondOfDay * 1000);
    const endDateTime = new Date(baseDate.getTime() + busySlot.endSecondOfDay * 1000);

    // Get local date strings for start and end
    const startLocalDateString = formatDateToLocalString(startDateTime);
    const endLocalDateString = formatDateToLocalString(endDateTime);

    // Check if this busy slot falls on the target date
    if (startLocalDateString !== targetDateString && endLocalDateString !== targetDateString) {
      return null; // This slot doesn't affect the target date
    }

    // Calculate local seconds of day
    let localStartSecond: number;
    let localEndSecond: number;

    if (startLocalDateString === targetDateString) {
      // Start is on target date
      localStartSecond =
        startDateTime.getHours() * 3600 +
        startDateTime.getMinutes() * 60 +
        startDateTime.getSeconds();
    } else {
      // Start is on previous date, so it starts at midnight (0)
      localStartSecond = 0;
    }

    if (endLocalDateString === targetDateString) {
      // End is on target date
      localEndSecond =
        endDateTime.getHours() * 3600 + endDateTime.getMinutes() * 60 + endDateTime.getSeconds();
    } else {
      // End is on next date, so it ends at end of day (86400)
      localEndSecond = 86400;
    }

    return {
      startSecondOfDay: localStartSecond,
      endSecondOfDay: localEndSecond,
    };
  };

  // Get busy slots for the selected date, converted to local timezone
  const getBusySlotsForDate = (): LocalBusySlot[] => {
    if (!selectedDate || busySchedule.length === 0) return [];

    const selectedLocalDate = calendarDateToLocalDate(selectedDate);
    const selectedDateString = formatDateToLocalString(selectedLocalDate);

    const localBusySlots: LocalBusySlot[] = [];

    // Iterate through all busy schedule items and convert slots to local time
    busySchedule.forEach((item) => {
      item.busy.forEach((busySlot) => {
        const localSlot = convertBusySlotToLocal(item.date, busySlot, selectedDateString);
        if (localSlot) {
          localBusySlots.push(localSlot);
        }
      });
    });

    return localBusySlots;
  };

  // Get available time slots for selected day, excluding busy slots
  const getAvailableSlots = (): TimeSlot[] => {
    if (!availability || !selectedDay) return [];

    const daySlots = (availability[selectedDay] || []).filter((slot) => slot.isAvailable);
    const busySlots = getBusySlotsForDate();

    // If no busy slots, return all available slots
    if (busySlots.length === 0) return daySlots;

    // Filter out slots that overlap with busy slots
    return daySlots.filter((slot) => !isSlotBusy(slot, busySlots));
  };

  const availableSlots = getAvailableSlots();

  // Render time slots section based on current state
  const renderTimeSlotsSection = () => {
    if (isLoading) {
      return <TextLine text='Loading availability...' className='text-neutral-50 text-sm' />;
    }

    if (!selectedDay) {
      return (
        <TextLine
          text='Select a date to view available times'
          className='text-neutral-50 text-sm'
        />
      );
    }

    if (availableSlots.length === 0) {
      return (
        <TextLine
          text='No available timeslot on this date'
          className='text-primary text-sm font-semibold text-center p-2'
        />
      );
    }

    return availableSlots.map((slot) => (
      <Button
        key={slot.id}
        variant={selectedSlotId === slot.id ? 'primary-md' : 'bordered-md'}
        onClick={() => handleSlotClick(slot)}
      >
        {formatTimeSlot(slot.from, slot.to)}
      </Button>
    ));
  };

  return (
    <Card fullWidth className='border-1 p-regular' shadow='none'>
      <CardBody className='flex flex-row'>
        <div className='w-[65%] flex flex-col gap-4'>
          <div className='flex gap-4'>
            <Avatar variant='default-lg' src={avtUrl} alt={`${name}'s avatar`} />
            <div className='flex flex-col justify-start'>
              <TextLine text={name} className='text-lg font-semibold text-secondary text-left' />
              <TextLine
                text={location}
                className='text-neutral-50 text-sm text-left line-clamp-1'
              />
            </div>
          </div>
          <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
        </div>
        <Spacer x={4} />
        <div className='flex flex-col w-[35%] gap-2'>{renderTimeSlotsSection()}</div>
      </CardBody>

      {/* Schedule Meeting Modal */}
      {mentorId && startupId && selectedSlot && selectedDate && (
        <ScheduleMeetingModal
          isOpen={isModalOpen}
          onOpenChange={handleModalClose}
          onSuccess={handleMeetingSuccess}
          mentorId={mentorId}
          startupId={startupId}
          mentorName={name || 'Mentor'}
          mentorAvtUrl={avtUrl || ''}
          startDateTime={getStartDateTime()}
          endDateTime={getEndDateTime()}
        />
      )}
    </Card>
  );
};

export default ScheduleMeetingDetailCard;
