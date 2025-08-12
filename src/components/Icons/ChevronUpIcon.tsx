import React from 'react';

interface IconProps {
  className?: string; // Tùy chỉnh CSS class
}

const ChevronUpIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M18 15L12 9L6 15"
        stroke="currentcolor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ChevronUpIcon;
