import React from 'react';

interface ArrowRightIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const ArrowRightIcon = ({ className = '', width = 24, height = 24 }: ArrowRightIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.91016 19.92L15.4302 13.4C16.2002 12.63 16.2002 11.37 15.4302 10.6L8.91016 4.07999"
        stroke="#A1A1AA"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRightIcon;
