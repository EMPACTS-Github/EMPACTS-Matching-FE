import React from 'react';

const Header = () => {
  return (
    <div className='flex flex-col items-center gap-2 w-full'>
      <h1 className='text-large font-bold text-secondary leading-[175%] text-center'>
        Startup profile
      </h1>
      <p className='text-regular font-bold text-neutral-80 leading-[160%] text-center'>
        Access to your desired company
      </p>
    </div>
  );
};

export default Header;
