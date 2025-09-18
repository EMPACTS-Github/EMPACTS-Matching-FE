import React from 'react';
import { Button } from '@heroui/react';

const MeetingAction = () => {
  return (
    <div className='flex justify-between'>
      <div className='w-full flex justify-center'>
        <Button
          variant='solid'
          className='bg-black text-white'
          size='lg'
          radius='lg'
          onPress={() => {}}
        >
          <p className='text-base font-bold leading-6'>Meeting Members</p>
        </Button>
      </div>
      <div className='flex justify-center'>
        <Button
          variant='solid'
          className='bg-error text-white'
          size='lg'
          radius='lg'
          onPress={() => {}}
        >
          <p className='text-base font-bold leading-6'>Cancel Meeting</p>
        </Button>
      </div>
    </div>
  );
};

export default MeetingAction;
