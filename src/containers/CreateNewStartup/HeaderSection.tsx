import React from 'react';

interface HeaderSectionProps {
  title?: string;
  subtitle?: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  title = 'Startup profile',
  subtitle = 'Access to your desired company',
}) => {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <h1 className="text-[28px] font-bold text-secondary leading-[109%] text-center">{title}</h1>
      <p className="text-sm text-empacts-grey-100 leading-[120%] text-center">{subtitle}</p>
    </div>
  );
};

export default HeaderSection;
