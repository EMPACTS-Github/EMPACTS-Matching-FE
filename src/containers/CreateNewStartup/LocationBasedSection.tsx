import React from 'react';
import { Select, SelectItem } from '@heroui/react';
import provinces from '@/utils/data/provinces.json';

interface LocationBasedSectionProps {
  selectedLocation?: string;
  onChange?: (value: string) => void;
}

const LocationBasedSection: React.FC<LocationBasedSectionProps> = ({
  selectedLocation = 'HA_NOI',
  onChange = () => {},
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="text-[13px] font-semibold text-[#09090b]">Location Based</label>
      <div className="relative w-full">
        <Select
          selectedKeys={[selectedLocation]}
          onChange={(e) => onChange(e.target.value)}
          className="w-full"
          size="sm"
          classNames={{
            trigger:
              'h-12 border border-[#e4e4e7] bg-white rounded-lg px-3 flex justify-between text-empacts',
            value: 'text-[14px] text-empacts',
            selectorIcon: 'text-empacts',
          }}
          placeholder="Select a location"
          isVirtualized={false}
        >
          {provinces.map((province) => (
            <SelectItem
              key={province.value}
              className={`text-[14px] font-semibold ${
                selectedLocation === province.value
                  ? 'text-empacts'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {province.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default LocationBasedSection;
