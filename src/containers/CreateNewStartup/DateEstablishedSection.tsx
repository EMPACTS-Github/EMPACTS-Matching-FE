import React, { useMemo, useState } from 'react';
import FormLabel from '@/components/Form/FormLabel';

interface DateEstablishedSectionProps {
  formedTime: Date | null;
  onSetFormedTime: (date: Date | null) => void;
}

const DateEstablishedSection = ({ formedTime, onSetFormedTime }: DateEstablishedSectionProps) => {
  const [error, setError] = useState('');
  const todayString = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split('T')[0];
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setError('');
      onSetFormedTime(null);
      return;
    }

    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      setError('The Establishment Date cannot be a future date.');
      return;
    }

    setError('');
    onSetFormedTime(selectedDate);
  };

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
        onChange={handleDateChange}
        max={todayString}
        aria-invalid={!!error}
        className='h-12 border border-neutral-50 bg-neutral-20 rounded-lg px-3 text-regular w-full'
      />
      {error && <p className='text-error text-sm'>{error}</p>}
    </div>
  );
};

export default DateEstablishedSection;
