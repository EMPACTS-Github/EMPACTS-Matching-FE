import React from 'react';
import { Select, SelectItem } from "@heroui/react";
import sdgGoals from '@/utils/data/sdgGoals.json';

interface SDGGoalSectionProps {
  selectedGoals: string[];
  onGoalsChange: (value: string[]) => void;
}

const SDGGoalSection: React.FC<SDGGoalSectionProps> = ({
  selectedGoals,
  onGoalsChange,
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="text-[14px] font-semibold text-[#09090b]">
        SDG Goals
      </label>
      <Select
        aria-label="Select SDG Goals"
        selectionMode="multiple"
        selectedKeys={selectedGoals}
        onSelectionChange={(keys) => onGoalsChange(Array.from(keys).map(String))}
        className="w-full"
        size="sm"
        classNames={{
          trigger:
            "h-12 border border-[#e4e4e7] bg-white rounded-lg px-3 flex justify-between text-empacts",
          value: "text-[14px] font-semibold text-empacts",
          selectorIcon: "text-empacts",
        }}
        placeholder="Select SDG Goals"
      >
        {sdgGoals.map((goal) => (
          <SelectItem
            key={goal.value}
            className={`text-[14px] font-semibold ${selectedGoals.includes(goal.value)
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