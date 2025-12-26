import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className='text-center py-medium'>
      <div className='bg-neutral-30 rounded-xl p-medium animate-pulse'>
        <div className='flex items-start gap-regular'>
          <div className='w-12 h-12 bg-neutral-50 rounded-full'></div>
          <div className='flex-1'>
            <div className='h-4 bg-neutral-50 rounded mb-2 w-1/3'></div>
            <div className='h-3 bg-neutral-50 rounded mb-4 w-1/4'></div>
            <div className='h-3 bg-neutral-50 rounded w-3/4'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;

