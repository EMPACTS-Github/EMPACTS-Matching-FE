import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import SearchIcon from '/public/assets/search-icon.png';

interface SearchBarProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void; // New prop for triggering search
  value?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search for anything',
  onChange,
  onSearch, // New prop for triggering search
  value = '',
  className = '',
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(); // Trigger search on Enter key
    }
  };

  return (
    <div className={`bg-white rounded-lg flex items-center p-4 ${className}`}>
      <Image 
        src={SearchIcon}
        alt="Search"
        width={24}
        height={24}
        className="mr-2 cursor-pointer"
        onClick={onSearch} // Trigger search on icon click
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Listen for Enter key
        className="flex-grow text-lg text-gray-600 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
