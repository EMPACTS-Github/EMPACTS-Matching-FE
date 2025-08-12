import { CalendarDate, Time } from '@internationalized/date';
// Helper để chuyển đổi schedule sang CalendarDate và Time
export function getCalendarDateAndTime(schedule: Date | string | undefined) {
  if (!schedule) return { calendarDate: undefined, time: undefined };
  let dateObj: Date;
  if (typeof schedule === 'string') {
    dateObj = new Date(schedule);
  } else {
    dateObj = schedule;
  }
  // Lấy ngày tháng năm
  const calendarDate = new CalendarDate(
    dateObj.getFullYear(),
    dateObj.getMonth() + 1,
    dateObj.getDate()
  );
  // Lấy giờ phút
  const time = new Time(dateObj.getHours(), dateObj.getMinutes());
  return { calendarDate, time };
}
