import React from 'react'
import FormLabel from '@/components/Form/FormLabel'

interface DateEstablishedSectionProps {
  formedTime: Date | null;
  onSetFormedTime: (date: Date | null) => void;
}

const DateEstablishedSection = ({
  formedTime,
  onSetFormedTime,
}: DateEstablishedSectionProps) => {
  return (
    <div className='space-y-2'>
      <FormLabel
        text='Date established'
        className='text-regular font-bold text-secondary leading-[150%]'
        isRequired
      />
      <input
        type='date'
        value={formedTime ? formedTime.toISOString().split('T')[0] : ''}
        onChange={(e) => onSetFormedTime(e.target.value ? new Date(e.target.value) : null)}
        className='h-12 border border-neutral-50 bg-neutral-20 rounded-lg px-3 text-regular w-full'
      />
    </div>
  )
}

export default DateEstablishedSection