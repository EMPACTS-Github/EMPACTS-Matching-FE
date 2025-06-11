import React from "react";
import Image from "next/image";
import TextLine from "./TextLine";

interface IconTextProps {
    icon: string;
    text?: string | number;
    alt: string;
}

const IconText: React.FC<IconTextProps> = ({ icon, text, alt }) => {
    return (
        <div className="flex items-center gap-x-2">
            {text && <TextLine text={text.toString()} className="text-black font-semibold text-[16px]" />
            }
            <Image
                src={icon}
                alt={alt}
                width={24}
                height={24}
            />
        </div>
    );
}

export default IconText;
