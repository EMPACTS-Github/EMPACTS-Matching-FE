import React from 'react';
import { Textarea } from "@heroui/react";

interface DescriptionSectionProps {
    description: string;
    onDescriptionChange: (value: string) => void;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
    description,
    onDescriptionChange
}) => {
    const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        onDescriptionChange(e.target.value);
    }

    return (
        <div className="flex flex-col w-full gap-2">
            <label className="text-[14px] font-semibold text-[#09090b]">
                Description
            </label>

            <textarea
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                placeholder="Add your description here..."
                className="border border-[#e4e4e7] bg-white rounded-lg px-3 py-2 h-24 text-[14px] font-normal resize-none"
            />
        </div>
    );
};

export default DescriptionSection;

