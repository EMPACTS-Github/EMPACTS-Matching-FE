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
      weekdayStyle='short'
      classNames={{
        base: 'w-[360px]', // Calendar wrapper
        content: 'w-[360px]',
        cell: 'w-12 h-14', // Tăng kích thước cell (ô chứa ngày)
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
