import { Calendar as HeroCalendar } from '@heroui/react';
import { today, getLocalTimeZone, CalendarDate, getDayOfWeek } from '@internationalized/date';
import { DayOfWeek } from '@/interfaces/mentor';
import React from 'react';

interface CalendarProps {
  onDateSelect?: (date: CalendarDate, dayOfWeek: DayOfWeek) => void;
  selectedDate?: CalendarDate | null;
}

// Map day index (0 = Sunday, 1 = Monday, ...) to day name
const dayIndexToName: DayOfWeek[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, selectedDate }) => {
  // Handle date change
  const handleDateChange = (date: CalendarDate) => {
    const dayIndex = getDayOfWeek(date, 'en-US');
    const dayName = dayIndexToName[dayIndex];

    if (onDateSelect) {
      onDateSelect(date, dayName);
    }
  };

  return (
    <HeroCalendar
      aria-label='Date'
      value={selectedDate ?? today(getLocalTimeZone())}
      minValue={today(getLocalTimeZone())}
      maxValue={today(getLocalTimeZone()).add({ days: 28 })}
      firstDayOfWeek='mon'
      weekdayStyle='short'
      onChange={handleDateChange}
      classNames={{
        base: 'w-[360px]',
        content: 'w-[360px]',
        cell: 'w-12 h-14',
        cellButton:
          'w-full h-full data-[hovered=true]:data-[disabled=false]:bg-primary-20 data-[hovered=true]:data-[disabled=false]:text-black',
        gridHeaderCell: 'w-full',
        gridWrapper: 'w-full',
        header: 'w-full',
      }}
    />
  );
};
export default Calendar;
