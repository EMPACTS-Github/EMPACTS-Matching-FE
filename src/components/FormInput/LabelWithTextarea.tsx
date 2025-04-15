import { Textarea } from "@heroui/react";
import { useState } from "react";

interface LabelWithTextareaProps {
    label: string;
    content: string;
    placeholder: string;
    setContent: (text: string) => void;
    minRows: number;
}
const LabelWithTextarea: React.FC<LabelWithTextareaProps> = ({ label, content, placeholder, setContent, minRows }) => {
    return (
        <div className="flex flex-col gap-2">
            <Textarea
                label={label}
                labelPlacement="outside"
                minRows={minRows}
                maxRows={30}
                placeholder={placeholder}
                value={content}
                onValueChange={(value) => {
                    setContent(value);
                }}
                variant="bordered"
            />
        </div>
    )
}
export default LabelWithTextarea