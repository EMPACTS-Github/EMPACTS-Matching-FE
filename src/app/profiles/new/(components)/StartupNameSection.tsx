import React from 'react';
import { Input } from '@nextui-org/react';

interface StartupNameSectionProps {
  companyName?: string;
  onCompanyNameChange?: (value: string) => void;
}

const StartupNameSection: React.FC<StartupNameSectionProps> = ({
  companyName = '',
  onCompanyNameChange = () => {},
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="text-[14px] font-semibold text-[#09090b]">
        Startup name
      </label>
      
      <Input
        type="text"
        value={companyName}
        onChange={(e) => onCompanyNameChange(e.target.value)}
        placeholder="Company name"
        classNames={{
          input: "text-[14px] font-normal",
          inputWrapper: "h-12 border border-[#e4e4e7] bg-white rounded-lg px-3"
        }}
        fullWidth
      />

      <p className="text-[14px] font-normal text-[#71717a] leading-5">
        Your profile could be found with username <span className="text-empacts">@company_name</span>. You can change it later in Settings
      </p>
    </div>
  );
};

export default StartupNameSection;

