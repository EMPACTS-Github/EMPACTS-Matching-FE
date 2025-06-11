import React from 'react';
import { DatePicker } from "@heroui/date-picker";
import { getLocalTimeZone, today, CalendarDate } from "@internationalized/date";
import CalendarIcon from "@/components/Icons/CalendarIcon";

interface FormedTimeSectionProps {
    formedTime: Date | null;
    onFormedTimeSelect: (value: Date | null) => void;
}

const FormedTimeSection: React.FC<FormedTimeSectionProps> = ({
    formedTime,
    onFormedTimeSelect
}) => {
    const calendarDate = formedTime
        ? new CalendarDate(
            formedTime.getFullYear(),
            formedTime.getMonth() + 1,
            formedTime.getDate()
        )
        : null;


    const handleDateChange = (date: CalendarDate | null) => {
        if (date) {
            onFormedTimeSelect(new Date(date.year, date.month - 1, date.day));
        } else {
            onFormedTimeSelect(null);
        }
    };

    return (
        <div className="flex flex-col w-full gap-2">
            <label className="text-[14px] font-semibold text-[#09090b]">
                Date established
            </label>
            <DatePicker
                isRequired
                variant="bordered"
                className="w-full"
                selectorIcon={<CalendarIcon className="text-black" />}
                value={calendarDate}
                onChange={handleDateChange}
            />
        </div>
    );
};

export default FormedTimeSection;