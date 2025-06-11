import React from "react";

interface IconProps {
    className?: string; // Tùy chỉnh CSS class
}

const ChevronSelectorVerticalIcon: React.FC<IconProps> = ({ className }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none" className={className}>
            <path d="M12 20L17 25L22 20M12 14L17 9L22 14" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};

export default ChevronSelectorVerticalIcon;