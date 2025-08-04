import React from 'react';
import { DatePicker } from "@heroui/date-picker";
import { CalendarDate } from "@internationalized/date";
import CalendarIcon from "@/components/Icons/CalendarIcon";

interface FormDatePickerWithLabelProps {
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  required?: boolean;
  className?: string;
}

function FormDatePickerWithLabel({
  label,
  value,
  onChange,
  required = false,
  className = ""
}: FormDatePickerWithLabelProps) {
  const calendarDate = value
    ? new CalendarDate(
        value.getFullYear(),
        value.getMonth() + 1,
        value.getDate()
      )
    : null;

  const handleDateChange = (date: CalendarDate | null) => {
    if (date) {
      onChange(new Date(date.year, date.month - 1, date.day));
    } else {
      onChange(null);
    }
  };

  return (
    <div className={`flex flex-col w-full gap-2 ${className}`}>
      <label className="text-[14px] font-semibold text-[#09090b]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <DatePicker
        isRequired={required}
        variant="bordered"
        className="w-full"
        selectorIcon={<CalendarIcon className="text-black" />}
        value={calendarDate}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default FormDatePickerWithLabel;
