import React from 'react';

const Header = () => {
  return (
    <div className='flex flex-col gap-1'>
      <p className='text-primary text-2xl font-bold leading-9'>Upcoming Meetings</p>
      <p className='text-base leading-6 font-normal'>
        Your confirmed meetings and scheduled calls.
      </p>
    </div>
  );
};

export default Header;
