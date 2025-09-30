import React from 'react'
import FormLabel from '@/components/Form/FormLabel';
import Input from '@/components/Input/Input';

interface StartupNameSectionProps {
  companyName: string;
  startupUsername: string;
  onSetCompanyName: (value: string) => void;
  onChangeStartupUsername: (value: string) => void;
}

const StartupNameSection = ({ companyName, onSetCompanyName, onChangeStartupUsername, startupUsername }: StartupNameSectionProps) => {
  return (
    <div className='space-y-2'>
      <FormLabel
        text='Startup name'
        className='text-regular font-bold text-secondary leading-[150%]'
      />
      <Input
        variant='text'
        preset='default-md'
        value={companyName}
        onChange={(value) => {
          onSetCompanyName(value);
          onChangeStartupUsername(value);
        }}
        placeholder='Enter name company'
        isRequired
      />
      <p className='text-small font-normal text-neutral-80 leading-[143%]'>
        Your profile could be found with username{' '}
        <span className='text-primary'>{startupUsername || '@company_name'}</span>. You can change it
        later in Settings
      </p>
    </div>
  )
};

export default StartupNameSection;
