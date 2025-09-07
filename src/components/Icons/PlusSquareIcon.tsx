import React from 'react';

interface IconProps {
  className?: string; // Tùy chỉnh CSS class
}
export const PlusSquareIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='17'
    height='17'
    viewBox='0 0 17 17'
    fill='none'
    className={className}
  >
    <path
      d='M8.5 4.58984L8.5 12.5898'
      stroke='currentcolor'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <path
      d='M12.5 8.58984L4.5 8.58984'
      stroke='currentcolor'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);
