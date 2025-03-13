import React from "react";
import TextLine from "./TextLine";

interface TitleWithDescriptionProps {
    title: string;
    description: string;
}

const TitleWithDescription: React.FC<TitleWithDescriptionProps> = ({ title, description }) => {
    return (
        <div>
            <TextLine text={title} className="text-black text-[16px] font-semibold" />
            <TextLine text={description} className="text-black text-[16px]" />
        </div>
    );
}

export default TitleWithDescription;
