import React from 'react'
import { MEETING_STATUS } from '@/constants/matching';

interface HostInfoProps {
  status: string;
}

const HostInfo = ({ status }: HostInfoProps) => {

  const renderDetailHostInfo = () => {
    if (status === MEETING_STATUS.EXPIRED) return null;

    if (status === MEETING_STATUS.COMPLETED) {
      return (
        <p className='text-base font-normal leading-6'>{"Monday, August 4th, 2025 at 1:30PM - 4:30PM"}</p>
      );
    }

    return (
      <>
        <p className='text-base font-normal leading-6'>{"Monday, August 4th, 2025 at 1:30PM - 4:30PM"}</p>
        <div>
          <span className='text-base font-bold leading-6'>Cancelled By: </span>
          <span className='text-base font-normal leading-6 text-primary'>The Amazing Team</span>
        </div>
        <div>
          <span className='text-base font-bold leading-6'>Reason: </span>
          <span className='text-base font-normal leading-6 text-wrap break-words'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis</span>
        </div>
      </>
    )
  };

  return (
    <div className='max-w-[500px] flex flex-col gap-1'>
      <p className='text-xl font-bold leading-8'>{"EMPACTS Connect: Le Phuong Nam <> The Amazing Team"}</p>
      {renderDetailHostInfo()}
    </div>
  )
}

export default HostInfo