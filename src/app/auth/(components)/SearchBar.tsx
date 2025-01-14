import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import SearchIcon from '../../../../public/assets/search-icon.png';

interface SearchBarProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search for anything',
  onChange,
  value = '',
  className = '',
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`bg-white rounded-lg flex items-center p-4 ${className}`}>
      <Image 
        src={SearchIcon}
        alt="Search"
        width={24}
        height={24}
        className="mr-2"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="flex-grow text-lg text-gray-600 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
