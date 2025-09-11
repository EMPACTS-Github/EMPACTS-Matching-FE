import { Calendar as HeroCalendar } from '@heroui/react';
import { today, getLocalTimeZone } from '@internationalized/date';

const Calendar = () => {
  return (
    <HeroCalendar
      aria-label='Date'
      defaultValue={today(getLocalTimeZone())}
      minValue={today(getLocalTimeZone())}
      maxValue={today(getLocalTimeZone()).add({ days: 28 })}
      firstDayOfWeek='mon'
      calendarWidth={100}
      weekdayStyle='short'
      classNames={{
        base: 'w-[600px]', // Calendar wrapper
        content: 'w-[600px]',
        cell: 'w-20 h-20', // Tăng kích thước cell (ô chứa ngày) - từ w-16 h-16 lên w-20 h-20
        cellButton: 'w-full h-full', // Tăng kích thước button và text size
        gridHeaderRow: 'w-full',
        gridHeaderCell: 'w-full',
        gridWrapper: 'w-full',
        header: 'w-full',
      }}
    />
  );
};
export default Calendar;
