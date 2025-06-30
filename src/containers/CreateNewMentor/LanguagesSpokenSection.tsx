import React from 'react';
import { Select, SelectItem } from "@heroui/react";
import languages from '@/utils/data/languages.json';
import { LanguagesSpoken } from '@/constants/common';

interface LanguagesSpokenSectionProps {
    languagesSpoken: LanguagesSpoken;
    onLanguagesSpokenChange: (value: LanguagesSpoken) => void;
}


const LanguagesSpokenSection: React.FC<LanguagesSpokenSectionProps> = ({
    languagesSpoken,
    onLanguagesSpokenChange,
}) => {
    return (
        <div className="flex flex-col w-full gap-2">
            <label className="text-[14px] font-semibold text-[#09090b]">
                Languages Spoken
            </label>
            <Select
                aria-label="Select Languages Spoken"
                selectionMode="multiple"
                selectedKeys={languagesSpoken}
                onSelectionChange={(keys) =>
                    onLanguagesSpokenChange(Array.from(keys).map(String) as LanguagesSpoken)
                }
                className="w-full"
                size="sm"
                classNames={{
                    trigger:
                        "h-12 border border-[#e4e4e7] bg-white rounded-lg px-3 flex justify-between text-empacts",
                    value: "text-[14px] text-empacts",
                    selectorIcon: "text-empacts",
                }}
                placeholder="Select languages"
            >
                {languages.map((lang) => (
                    <SelectItem
                        key={lang.value}
                        className={`text-[14px] font-semibold ${(languagesSpoken as string[]).includes(lang.value)
                                ? "text-empacts"
                                : "text-gray-700 hover:text-gray-900"
                            }`}
                    >
                        {lang.label}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
};

export default LanguagesSpokenSection;