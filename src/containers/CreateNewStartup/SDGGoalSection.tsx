import React from 'react';
import FormLabel from '@/components/Form/FormLabel';
import Select from '@/components/Select/Select';
import { STARTUP_SDG_GOALS } from '@/constants/sdgs';

interface SDGGoalSectionProps {
  selectedGoal: string;
  onSetSelectedGoal: (goal: string) => void;
}

const SDGGoalSection = ({ selectedGoal, onSetSelectedGoal }: SDGGoalSectionProps) => {
  const goalItems = Object.entries(STARTUP_SDG_GOALS).map(([key, goal]) => ({
    key: goal.textValue,
    label: goal.label,
    value: goal.textValue,
  }));

  return (
    <div className='space-y-2'>
      <FormLabel
        text='SDG Goal'
        className='text-regular font-bold text-secondary leading-[150%]'
        isRequired
      />
      <Select
        variant='form-field'
        placeholder='Search goal'
        items={goalItems}
        selectedKeys={selectedGoal ? [selectedGoal] : []}
        onSelectionChange={(keys) => {
          if (keys !== 'all' && keys.size > 0) {
            const selectedKey = Array.from(keys)[0];
            onSetSelectedGoal(selectedKey.toString());
          }
        }}
      />
    </div>
  );
};

export default SDGGoalSection;
