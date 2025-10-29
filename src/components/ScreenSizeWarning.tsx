'use client';

import { useEffect, useState } from 'react';

export default function ScreenSizeWarning() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Prevent scrolling when overlay is shown
    if (isSmallScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSmallScreen]);

  if (!isSmallScreen) return null;

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center px-4'>
      <div className='text-center text-white'>
        <div className='flex justify-center mb-6'>
          <div className='w-16 h-16 flex items-center justify-center'>
            <svg
              width='53'
              height='53'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
              <path d='M12 8V12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
              <circle cx='12' cy='16' r='1' fill='currentColor' />
            </svg>
          </div>
        </div>
        <h1 className='text-2xl font-bold mb-4'>Your browser is too small</h1>
        <p className='text-lg'>Resize your browser to be atleast 1024px wide to get back</p>
      </div>
    </div>
  );
}
