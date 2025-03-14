import React from "react";

interface TextLineProps {
    text: string;
    className?: string;
}

const TextLine: React.FC<TextLineProps> = ({ text, className = '' }) => {
    return (
        <p className={className}>
            {text}
        </p>
    );
}

export default TextLine;
