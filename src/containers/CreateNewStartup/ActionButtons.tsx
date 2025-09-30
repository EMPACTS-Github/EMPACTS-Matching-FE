import React from 'react';
import Button from '@/components/Button/Button';

interface ActionButtonsProps {
  handleCancelCreateProfile: () => void;
  handleCreateProfile: () => void;
}

const ActionButtons = ({ handleCancelCreateProfile, handleCreateProfile }: ActionButtonsProps) => {
  return (
    <div className='flex flex-row justify-between w-full gap-4 h-12'>
      <div className='flex-1'>
        <Button
          variant='secondary-full'
          onClick={handleCancelCreateProfile}
          className='border border-primary text-primary bg-neutral-20 hover:bg-neutral-40'
        >
          Back
        </Button>
      </div>
      <div className='flex-1'>
        <Button
          variant='primary-full'
          onClick={handleCreateProfile}
          className='bg-primary text-neutral-20 hover:bg-primary-80'
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
