import React from 'react';

const ExpiredMeetingIcon = ({
  width = 22,
  height = 22,
  stroke = 'white',
}: {
  width: number;
  height: number;
  stroke: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.5 1.5L20.5 6.5M20.5 1.5L15.5 6.5M21 11V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H5.8C4.11984 21 3.27976 21 2.63803 20.673C2.07354 20.3854 1.6146 19.9265 1.32698 19.362C1 18.7202 1 17.8802 1 16.2V5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H11M1.14551 18.9263C1.61465 17.2386 3.16256 16 4.99977 16H11.9998C12.9291 16 13.3937 16 13.7801 16.0769C15.3669 16.3925 16.6073 17.6329 16.9229 19.2196C16.9998 19.606 16.9998 20.0707 16.9998 21M13 8.5C13 10.7091 11.2091 12.5 9 12.5C6.79086 12.5 5 10.7091 5 8.5C5 6.29086 6.79086 4.5 9 4.5C11.2091 4.5 13 6.29086 13 8.5Z'
        stroke={stroke}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};

export default ExpiredMeetingIcon;
