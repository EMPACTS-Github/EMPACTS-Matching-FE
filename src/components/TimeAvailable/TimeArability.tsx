import React from 'react';
import LabelStartAndSwitchEnd from '@/components/Switch/LabelStartAndSwitchEnd';
import TimeInput from '@/components/Input/TimeInput';
import { PlusSquareIcon } from '@/components/Icons/PlusSquareIcon';
import Button from '@/components/Button/Button';

interface TimeArabilityProps {
  dayOfWeek: string;
  switchState: boolean;
  setSwitchState?: (state: boolean) => void;
  fromToValue?: string[][];
  setFromToValue?: (value: string[][]) => void;
}

const TimeArability: React.FC<TimeArabilityProps> = ({
  dayOfWeek,
  switchState,
  setSwitchState,
  fromToValue = [],
  setFromToValue,
}) => {
  // Thêm một cặp from-to mới
  const handleAddTimeRange = () => {
    setFromToValue?.([...fromToValue, ['', '']]);
  };

  // Cập nhật giá trị từng cặp
  const handleChangeTime = (idx: number, type: 'from' | 'to', value: string) => {
    if (!setFromToValue) return;
    const updated = fromToValue.map((pair, i) =>
      i === idx ? (type === 'from' ? [value, pair[1]] : [pair[0], value]) : pair
    );
    setFromToValue(updated);
  };

  return (
    <div className="grid grid-cols-4 gap-4 items-start">
      <div className="text-md">{dayOfWeek}</div>
      <LabelStartAndSwitchEnd
        label="Available"
        checked={switchState}
        onChange={setSwitchState ?? (() => {})}
      />
      {switchState && (
        <div className="flex flex-col gap-2 col-span-2">
          {fromToValue.map(([fromTime, toTime], idx) => (
            <div className="flex gap-2" key={idx}>
              <TimeInput
                selectedTime={fromTime}
                setSelectedTime={(time) => handleChangeTime(idx, 'from', time)}
                isRequired
                label="From"
                labelPlacement="outside-left"
              />
              <TimeInput
                selectedTime={toTime}
                setSelectedTime={(time) => handleChangeTime(idx, 'to', time)}
                isRequired
                label="To"
                labelPlacement="outside-left"
              />
            </div>
          ))}
          <Button variant="ghost-sm" onClick={handleAddTimeRange} isIconOnly={true}>
            <PlusSquareIcon className="text-primary" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TimeArability;
