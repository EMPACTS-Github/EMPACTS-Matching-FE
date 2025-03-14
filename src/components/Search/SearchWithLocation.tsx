import FilledSearchIcon from '/public/assets/filled-search-icon.svg';
import Image from 'next/image';
import LocationPinIcon from '/public/assets/location-pin-icon.svg';
import { ChangeEvent } from 'react';
import { Divider } from '@heroui/react';

interface SearchWithLocationProps {
  placeholder?: string;
  location?: string;
  onChange?: (value: string) => void;
  onLocationChange?: (value: string) => void;
  value?: string;
  className?: string;
  onSearch?: () => void;
}

const SearchWithLocation: React.FC<SearchWithLocationProps> = ({
  placeholder = 'Mentor name',
    location,
    onChange,
    onLocationChange,
    value = '',
    className = '',
    onSearch,
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
        onChange(e.target.value);
        }
    };
    
    const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onLocationChange) {
        onLocationChange(e.target.value);
        }
    };
    
    return (
        <div className={`bg-white rounded-full flex items-center px-4 py-1 border-1 ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className="flex-grow text-base text-gray-600 placeholder-gray-400 focus:outline-none"
            />
            <Divider orientation="vertical" className='text-black h-10' />
            <Image 
                src={LocationPinIcon}
                alt="Location"
                width={24}
                height={24}
                className="mr-2 ml-4"
            />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={handleLocationChange}
                className="flex-grow text-base text-gray-600 placeholder-gray-400 focus:outline-none"
            />
            <Image 
                src={FilledSearchIcon}
                alt="Search"
                width={44}
                height={44}
                className="cursor-pointer"
                onClick={onSearch}
            />
        </div>
    );
};

export default SearchWithLocation;
