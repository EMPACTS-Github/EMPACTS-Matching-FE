import React from 'react'
import { Divider, Avatar, Autocomplete, AutocompleteItem } from '@heroui/react';
import LabelWithTextarea from '@/components/Input/LabelWithTextarea';
import { UI_LABELS } from '@/constants';
import sdgGoals from '@/utils/data/sdgGoals.json';
import provinces from '@/utils/data/provinces.json';
import Typography from '@/components/Typography';

interface BasicInformationProps {
  image: string;
  startupName: string;
  startupUsername: string;
  location: string;
  sdgGoal: string;
  description: string;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setStartupName: (name: string) => void;
  setStartupUsername: (username: string) => void;
  setLocation: (location: string) => void;
  setSdgGoal: (sdgGoal: string) => void;
  setDescription: (description: string) => void;
}

const BasicInformation = ({
  image,
  startupName,
  startupUsername,
  location,
  sdgGoal,
  description,
  handleImageChange,
  setStartupName,
  setStartupUsername,
  setLocation,
  setSdgGoal,
  setDescription,
}: BasicInformationProps) => {
  return (
    <div className='flex flex-col gap-4'> 
      <div>
        <Typography type='p' variant='body-28-bold' className='text-primary'>{UI_LABELS.BASIC_INFORMATION}</Typography>
        <Divider />
      </div>
      <div className='flex gap-4'>
        <Avatar
          alt='heroui logo'
          src={image}
          size='sm'
          radius='full'
          isBordered
          color='primary'
          className='bg-neutral-20'
        />
        <div className='flex flex-col justify-center items-center'>
          <label htmlFor='profile-upload' className='cursor-pointer'>
            <p className='font-semibold text-sm text-primary'>{UI_LABELS.CHANGE_PROFILE_PHOTO}</p>
          </label>
          <input
            id='profile-upload'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleImageChange}
          />
        </div>
      </div>
      <LabelWithTextarea
        label={UI_LABELS.STARTUP_NAME}
        content={startupName}
        setContent={setStartupName}
        minRows={1}
        placeholder={UI_LABELS.STARTUP_NAME}
      />
      <LabelWithTextarea
        label={UI_LABELS.STARTUP_USERNAME}
        content={startupUsername}
        setContent={setStartupUsername}
        minRows={1}
        placeholder={UI_LABELS.STARTUP_USERNAME}
      />
      <Autocomplete
        isVirtualized={false}
        labelPlacement='outside'
        label={UI_LABELS.LOCATION}
        placeholder={UI_LABELS.SELECT_LOCATION}
        onSelectionChange={(key) => {
          let selectedLocation = provinces.find((province) => province.value === key);
          setLocation(selectedLocation?.value || '');
        }}
        defaultItems={provinces}
        variant='bordered'
        defaultSelectedKey={location}
      >
        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>
      <Autocomplete
        labelPlacement='outside'
        label={UI_LABELS.SDG_GOALS}
        placeholder={UI_LABELS.SELECT_SDG_GOALS}
        onSelectionChange={(key) => {
          let selectedSdgGoal = sdgGoals.find((sdgGoal) => sdgGoal.value === key);
          setSdgGoal(selectedSdgGoal?.value || '');
        }}
        defaultItems={sdgGoals}
        variant='bordered'
        defaultSelectedKey={sdgGoal}
      >
        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>
      <div className='flex flex-col gap-1'>
        <label className='text-sm text-neutral-80 mb-1'>{UI_LABELS.DESCRIPTION}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className='border border-neutral-40 rounded-lg min-h-[120px] p-3 bg-neutral-20 text-secondary resize-none focus:outline-none focus:border-secondary transition-colors'
          placeholder={UI_LABELS.DESCRIPTION}
        />
      </div>
    </div>
  )
}

export default BasicInformation