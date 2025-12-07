import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@heroui/card';
import TextLine from '@/components/common/TextLine';
import Avatar from '@/components/Avatar/Avatar';
import { Spacer } from '@heroui/spacer';
import Button from '@/components/Button/Button';
import Calendar from '@/components/Calendar/Calendar';
import { get_mentor_availability } from '@/apis/mentor-profile';
import { MentorAvailability, DayOfWeek, TimeSlot } from '@/interfaces/mentor';
import { CalendarDate } from '@internationalized/date';
import ScheduleMeetingModal from '@/components/Modal/ScheduleMeetingModal';

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
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch mentor availability when mentorId changes
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!mentorId) return;
      console.log('mentorId', mentorId);
      setIsLoading(true);
      try {
        const response = await get_mentor_availability(mentorId);
        if (response?.data?.mentorAvailability) {
          setAvailability(response.data.mentorAvailability);
        }
      } catch (error) {
        console.error('Failed to fetch mentor availability:', error);
        setAvailability(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
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
  const handleMeetingSuccess = () => {
    setSelectedSlotId(null);
    setSelectedSlot(null);
    if (onMeetingScheduled) {
      onMeetingScheduled();
    }
  };

  // Get available time slots for selected day
  const getAvailableSlots = (): TimeSlot[] => {
    if (!availability || !selectedDay) return [];
    return (availability[selectedDay] || []).filter((slot) => slot.isAvailable);
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
