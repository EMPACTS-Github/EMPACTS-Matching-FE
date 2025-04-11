import React from 'react';
import { Input, Select, SelectItem } from '@heroui/react';
import { PROVINCES } from '@/constants/provinces';

interface SearchWithLocationProps {
  placeholder?: string;
  value: string;
  location: string;
  onChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  className?: string;
}

const SearchWithLocation: React.FC<SearchWithLocationProps> = ({
  placeholder = 'Search',
  value,
  location,
  onChange,
  onLocationChange,
  className = '',
}) => {
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLocationChange(e.target.value);
  }

  return (
    <div className={`${className}`}>
      {/* Outer container with better hover/focus styling */}
      <div className="flex items-center justify-between bg-white rounded-[64px] border border-gray-200 h-[52px] w-[808px] transition-all duration-200 hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30">
        {/* Search Input – full width with no internal focus/hover highlighting */}
        <div className="flex flex-grow items-center pl-8">
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            classNames={{
              base: "w-full",
              mainWrapper: "w-full",
              input: "text-base pl-2 focus:outline-none bg-transparent hover:bg-transparent focus:bg-transparent",
              inputWrapper: "h-[40px] min-h-[40px] border-0 bg-transparent shadow-none rounded-none focus:shadow-none hover:shadow-none data-[focus=true]:bg-transparent focus:outline-none focus:bg-transparent hover:bg-transparent data-[hover=true]:bg-transparent",
              innerWrapper: "bg-transparent"
            }}
            aria-label="Search input"
            variant="flat"
          />
        </div>
        
        {/* Divider Line */}
        <div className="h-6 w-px bg-gray-300 mx-3"></div>
        
        {/* Location Dropdown */}
        <div className="flex-shrink-0 w-[170px] pr-6">
          <div className="flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" 
              xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M12 13.4299C13.7231 13.4299 15.12 12.0331 15.12 10.3099C15.12 8.58681 13.7231 7.18994 12 7.18994C10.2769 7.18994 8.88 8.58681 8.88 10.3099C8.88 12.0331 10.2769 13.4299 12 13.4299Z" 
                stroke="#292D32" strokeWidth="1.5"/>
              <path d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159998 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z" 
                stroke="#292D32" strokeWidth="1.5"/>
            </svg>
            <Select
              placeholder="Location"
              value={location}
              onChange={handleLocationChange}
              variant="flat"
              size="md"
              classNames={{
                base: "min-w-0 w-full",
                trigger: "h-[40px] min-h-[40px] border-0 bg-transparent shadow-none p-0 cursor-pointer",
                value: "text-sm font-normal",
                listbox: "text-base bg-white py-2 px-2"
              }}
              popoverProps={{
                classNames: {
                  content: "bg-white w-[220px] shadow-lg border border-gray-200 rounded-lg max-h-[300px] overflow-y-auto z-50"
                },
                placement: "bottom-end",
                offset: 5,
                backdrop: "transparent"
              }}
              listboxProps={{
                itemClasses: {
                  base: "text-gray-800 py-2 px-3 hover:bg-gray-100 rounded cursor-pointer"
                }
              }}
              isVirtualized={false}
            >
              {PROVINCES.map((province) => (
                <SelectItem key={province.key}>
                  {province.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWithLocation;