import React from 'react';
import { Divider } from '@heroui/react';
import Button from '@/components/Button/Button';
import { UI_LABELS } from '@/constants';

interface ActionButtonProps {
  onOpenChange: () => void;
  onUpdateProfileClick: () => void;
}

const ActionButton = ({ onOpenChange, onUpdateProfileClick }: ActionButtonProps) => {
  return (
    <>
      <Divider />
      <div className='flex justify-end gap-4'>
        <Button variant='secondary-md' onClick={onOpenChange}>
          {UI_LABELS.CANCEL}
        </Button>
        <Button variant='primary-md' onClick={onUpdateProfileClick}>
          {UI_LABELS.UPDATE_PROFILE}
        </Button>
      </div>
    </>
  );
};

export default ActionButton;
