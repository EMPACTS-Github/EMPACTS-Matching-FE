import React from 'react';
import FormLabel from '@/components/Form/FormLabel';

interface DescriptionProps {
  description: string;
  onSetDescription: (value: string) => void;
}

const Description = ({ description, onSetDescription }: DescriptionProps) => {
  return (
    <div className='space-y-2'>
      <FormLabel
        text='Description'
        className='text-regular font-bold text-secondary leading-[150%]'
        isRequired
      />
      <textarea
        value={description}
        onChange={(e) => onSetDescription(e.target.value)}
        placeholder='Enter company description'
        className='h-24 border border-neutral-50 bg-neutral-20 rounded-lg px-3 py-2 text-regular w-full resize-none'
        rows={4}
      />
    </div>
  );
};

export default Description;
