import React from 'react';
import { Select, SelectItem } from "@heroui/react";
import sdgGoals from '../../app/(utils)/(data)/sdgGoals.json';

interface SDGGoalSectionProps {
  selectedGoal?: string;
  onGoalChange?: (value: string) => void;
}

const SDGGoalSection: React.FC<SDGGoalSectionProps> = ({
  selectedGoal = 'ZERO_HUNGER',
  onGoalChange = () => { },
}) => {
  const isValidGoal = sdgGoals.some(goal => goal.value === selectedGoal);

  return (
    <div className="flex flex-col w-full gap-2">
      <label className="text-[14px] font-semibold text-[#09090b]">
        SDG Goal
      </label>
      <Select
        aria-label="Select an SDG Goal"
        selectedKeys={isValidGoal ? [selectedGoal] : []}
        onChange={(e) => onGoalChange(e.target.value)}
        className="w-full"
        size="sm"
        classNames={{
          trigger:
            "h-12 border border-[#e4e4e7] bg-white rounded-lg px-3 flex justify-between text-empacts",
          value: "text-[14px] font-semibold text-empacts",
          selectorIcon: "text-empacts",
        }}
        placeholder="Select an SDG Goal"
      >
        {sdgGoals.map((goal) => (
          <SelectItem
            key={goal.value}
            value={goal.value}
            className={`text-[14px] font-semibold ${selectedGoal === goal.value
                ? "text-empacts"
                : "text-gray-700 hover:text-gray-900"
              }`}
          >
            {goal.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default SDGGoalSection;
