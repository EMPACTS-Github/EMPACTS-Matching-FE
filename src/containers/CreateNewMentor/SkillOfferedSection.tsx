import React from 'react';
import { Select, SelectItem } from "@heroui/react";
import skill_offered from '@/utils/data/skillOffered.json';
import { SkillOffered } from '@/constants/skillOffered';

interface SkillOfferedSectionProps {
    skillOffered: SkillOffered;
    onSkillOfferedChange: (value: SkillOffered) => void;
}

const SkillOfferedSection: React.FC<SkillOfferedSectionProps> = ({
    skillOffered,
    onSkillOfferedChange,
}) => {
    return (
        <div className="flex flex-col w-full gap-2">
            <label className="text-[14px] font-semibold text-[#09090b]">
                Skill Offered
            </label>
            <Select
                aria-label="Select Skill Offered"
                selectionMode="multiple"
                selectedKeys={skillOffered.map(String)}
                onSelectionChange={(keys) =>
                    onSkillOfferedChange(Array.from(keys).map(String) as SkillOffered)
                }
                className="w-full"
                size="sm"
                classNames={{
                    trigger:
                        "h-12 border border-[#e4e4e7] bg-white rounded-lg px-3 flex justify-between text-empacts",
                    value: "text-[14px] text-empacts",
                    selectorIcon: "text-empacts",
                }}
                placeholder="Select Skill Offered"
            >
                {skill_offered.map((skill) => (
                    <SelectItem
                        key={skill.value}
                        className={`text-[14px] font-semibold ${(skillOffered as string[]).includes(skill.value)
                            ? "text-empacts"
                            : "text-gray-700 hover:text-gray-900"
                            }`}
                    >
                        {skill.label}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
};

export default SkillOfferedSection;