import React from 'react'
import { LanguagesSpoken, LANGUAGE_SPOKEN } from '@/constants/common';
import FormLabel from '@/components/Form/FormLabel';
import Select from '@/components/Select/Select';

interface LanguagesSpokenProps {
  languagesSpoken: string[];
  onSetLanguagesSpoken: (languages: LanguagesSpoken) => void;
}

const LanguagesSpokenSection = ({
  languagesSpoken,
  onSetLanguagesSpoken,
}: LanguagesSpokenProps) => {
  const languageItems = Object.entries(LANGUAGE_SPOKEN).map(([key, label]) => ({
    key,
    label,
    value: key,
  }));

  return (
    <div className='space-y-2'>
      <FormLabel
        text='Languages Spoken'
        className='text-regular font-bold text-secondary leading-[150%]'
        isRequired
      />
      <Select
        variant='form-field'
        placeholder='Select languages'
        items={languageItems}
        selectedKeys={languagesSpoken}
        onSelectionChange={(keys) => {
          if (keys !== 'all') {
            onSetLanguagesSpoken(Array.from(keys) as LanguagesSpoken);
          }
        }}
        selectionMode='multiple'
      />
    </div>
  );
};

export default LanguagesSpokenSection;
