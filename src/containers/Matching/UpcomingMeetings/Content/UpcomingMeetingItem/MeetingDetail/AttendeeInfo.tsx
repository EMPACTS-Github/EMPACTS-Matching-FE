import React from 'react'
import { Avatar } from "@heroui/react";

const AttendeeInfo = () => {
  return (
    <div className='max-w-[300px] flex gap-3'>
      <Avatar
        src={process.env.NEXT_PUBLIC_DEFAULT_AVT_URL}
        className='w-[64px] h-[64px]'
        radius='full'
      />
      <div className='flex flex-col px-3'>
        <p className='text-xl font-bold leading-8'>John Doe</p>
        <p className='text-sm leading-5 font-normal text-neutral-80'>Hanoi, Vietnam</p>
      </div>
    </div>
  )
}

export default AttendeeInfo;
