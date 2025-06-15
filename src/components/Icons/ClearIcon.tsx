import React from "react";

interface IconProps {
    className?: string;
}

const ClearIcon: React.FC<IconProps> = ({ className }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className={className}>
            <rect y="0.5" width="24" height="24" rx="12" fill="#E5E5E5" />
            <path d="M12 11.3891L15.8891 7.5L17 8.61094L13.1109 12.5L17 16.3891L15.8891 17.5L12 13.6109L8.11094 17.5L7 16.3891L10.8891 12.5L7 8.61094L8.11094 7.5L12 11.3891Z" fill="currentcolor" />
        </svg>
    );
};

export default ClearIcon;
