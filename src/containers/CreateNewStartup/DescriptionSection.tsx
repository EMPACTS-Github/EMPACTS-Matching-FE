import React from 'react';
import { Input } from "@heroui/react";

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

            <Input
                type="text"
                value={description}
                onChange={handleChangeDescription}
                placeholder="Description"
                classNames={{
                    input: "text-[14px] font-normal",
                    inputWrapper: "h-12 border border-[#e4e4e7] bg-white rounded-lg px-3"
                }}
                fullWidth
            />
        </div>
    );
};

export default DescriptionSection;

