import React from 'react'
import FormLabel from '@/components/Form/FormLabel';
import Select from '@/components/Select/Select';
import provinces from '@/utils/data/provinces.json';

interface LocationBasedSectionProps {
  location: string;
  onSetLocation: (location: string) => void;
}

const LocationBasedSection = ({ location, onSetLocation }: LocationBasedSectionProps) => {
  const locationItems = provinces.map((province) => ({
    key: province.value,
    label: province.label,
    value: province.value,
  }));

  return (
    <div className='space-y-2'>
      <FormLabel
        text='Location based'
        className='text-regular font-bold text-secondary leading-[150%]'
        isRequired
      />
      <Select
        variant='form-field'
        placeholder='Search location'
        items={locationItems}
        selectedKeys={location ? [location] : []}
        onSelectionChange={(keys) => {
          if (keys !== 'all' && keys.size > 0) {
            const selectedKey = Array.from(keys)[0];
            onSetLocation(selectedKey.toString());
          }
        }}
        isRequired
      />
    </div>
  );
}

export default LocationBasedSection