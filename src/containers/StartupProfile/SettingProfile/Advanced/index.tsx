import React from 'react';
import DeleteProfileModal from '@/containers/StartupProfile/SettingProfile/Advanced/DeleteProfileModal';
import HideProfileModal from '@/containers/StartupProfile/SettingProfile/Advanced/HideProfileModal';
import Button from '@/components/Button/Button';
import { UI_LABELS } from '@/constants';
import { Startup } from '@/interfaces/StartupProfile';

interface AdvancedTabProps {
  startup: Startup;
  onOpenHideProfileModal: () => void;
  onOpenDeleteProfileModal: () => void;
  onOpenChangeHideProfileModal: () => void;
  onOpenChangeDeleteProfileModal: () => void;
  handleHideProfileClick: () => void;
  handleDeleteProfileClick: () => void;
  isHideProfileModalOpen: boolean;
  isDeleteProfileModalOpen: boolean;
}

const AdvancedTab = ({
  startup,
  onOpenHideProfileModal,
  onOpenDeleteProfileModal,
  onOpenChangeHideProfileModal,
  onOpenChangeDeleteProfileModal,
  handleHideProfileClick,
  handleDeleteProfileClick,
  isHideProfileModalOpen,
  isDeleteProfileModalOpen,
}: AdvancedTabProps) => {
  return (
    <>
      {!startup.isHide ? (
        <div className='flex justify-between'>
          <div className='flex flex-col justify-center'>
            <p className='font-semibold text-sm text-secondary'>{UI_LABELS.HIDE_PROFILE}</p>
            <p className='text-neutral-50 font-normal text-xs'>
              {UI_LABELS.HIDE_PROFILE_DESCRIPTION}
            </p>
          </div>
          <Button variant='tertiary-md' onClick={onOpenHideProfileModal} className='w-32'>
            {UI_LABELS.HIDE_PROFILE}
          </Button>
        </div>
      ) : (
        <div className='flex justify-between'>
          <div className='flex flex-col justify-center'>
            <p className='font-semibold text-sm text-secondary'>Profile is hidden</p>
            <p className='text-neutral-50 font-normal text-xs'>
              {UI_LABELS.PROFILE_HIDDEN_DESCRIPTION}
            </p>
          </div>
          <Button variant='primary-md' onClick={onOpenHideProfileModal} className='w-32'>
            {UI_LABELS.UNHIDE_PROFILE}
          </Button>
        </div>
      )}
      <div className='flex justify-between'>
        <div className='flex flex-col justify-center'>
          <p className='font-semibold text-sm text-secondary'>{UI_LABELS.DELETE_PROFILE}</p>
          <p className='text-neutral-50 font-normal text-xs'>
            {UI_LABELS.DELETE_PROFILE_DESCRIPTION}
          </p>
        </div>
        <Button variant='warning-md' onClick={onOpenDeleteProfileModal} className='w-32'>
          {UI_LABELS.DELETE_PROFILE}
        </Button>
      </div>
      <HideProfileModal
        isOpen={isHideProfileModalOpen}
        onOpenChange={onOpenChangeHideProfileModal}
        onHideProfile={handleHideProfileClick}
        isHide={startup.isHide}
      />
      <DeleteProfileModal
        isOpen={isDeleteProfileModalOpen}
        onOpenChange={onOpenChangeDeleteProfileModal}
        onDeleteProfile={handleDeleteProfileClick}
      />
    </>
  );
};

export default AdvancedTab;
