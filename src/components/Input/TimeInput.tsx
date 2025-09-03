import { Select, SelectItem } from '@heroui/react';
import { timeOptionsPer15mn } from '@/constants/timeSelectOption';
import React from 'react';

interface TimeInputProps {
  selectedTime?: string | undefined;
  setSelectedTime: (time: string) => void;
  isRequired?: boolean;
  className?: string;
  placeholder?: string;
  selectorIcon?: React.ReactNode;
  timeOptions?: { key: string; label: string }[];
  labelPlacement?: 'inside' | 'outside' | 'outside-left';
  label?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  selectedTime = '',
  setSelectedTime,
  isRequired,
  className,
  placeholder,
  selectorIcon,
  timeOptions = timeOptionsPer15mn,
  labelPlacement,
  label,
}) => {
  return (
    <Select
      isVirtualized={false}
      isRequired={isRequired ? true : false}
      className={`${className}`}
      variant="bordered"
      selectedKeys={[selectedTime]}
      onSelectionChange={(keys) => setSelectedTime(Array.from(keys)[0] as string)}
      placeholder={placeholder || 'Select time'}
      selectorIcon={selectorIcon}
      labelPlacement={labelPlacement}
      label={label}
    >
      {timeOptions.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default TimeInput;
