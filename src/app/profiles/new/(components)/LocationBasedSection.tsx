import React, { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import provinces from '../../../(utils)/(data)/provinces.json';
interface LocationBasedSectionProps {
  location?: string;
  onChange?: (value: string) => void;
}

const LocationBasedSection: React.FC<LocationBasedSectionProps> = ({
  location = 'Hanoi',
  onChange = () => {},
}) => {
  const [selectedLocation, setSelectedLocation] = useState(location);

  const handleChange = (value: string) => {
    setSelectedLocation(value);
    onChange(value);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <label className="text-[13px] font-semibold text-[#09090b]">
        Location Based
      </label>
      <div className="relative w-full">
        <Select
          selectedKeys={[selectedLocation]}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full"
          size="sm"
          classNames={{
            trigger:
              "h-[48px] bg-white border border-[#e4e4e7] rounded-lg px-3 flex justify-between items-center",
            value: "font-semibold text-[14px] text-empacts",
          }}
          placeholder="Select a location"
        >
          {provinces.map((province) => (
            <SelectItem
              key={province}
              value={province}
              className={`text-[14px] font-semibold ${
                selectedLocation === province
                  ? "text-empacts"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {province}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default LocationBasedSection;
