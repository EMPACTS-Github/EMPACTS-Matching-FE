import React from "react";
import TextLine from "./TextLine";

interface TitleWithDescriptionProps {
    title: string;
    description: string;
}

const TitleWithDescription: React.FC<TitleWithDescriptionProps> = ({ title, description }) => {
    return (
        <div className="flex-col">
            <TextLine text={title} className="text-black text-[16px] font-semibold text-justify grow-0" />
            <TextLine text={description} className="text-black text-[16px] text-justify grow-0" />
        </div>
    );
}

export default TitleWithDescription;
