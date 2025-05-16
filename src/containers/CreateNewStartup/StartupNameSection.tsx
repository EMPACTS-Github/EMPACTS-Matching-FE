import React from 'react';
import { Input } from "@heroui/react";

interface StartupNameSectionProps {
  companyName: string;
  startupUsername: string;
  onCompanyNameChange: (value: string) => void;
  onChangeStartupUsername: (value: string) => void;
}

const StartupNameSection: React.FC<StartupNameSectionProps> = ({
  companyName,
  startupUsername,
  onCompanyNameChange,
  onChangeStartupUsername,
}) => {
  const handleChangeStartupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCompanyNameChange(e.target.value);
    onChangeStartupUsername(e.target.value);
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <label className="text-[14px] font-semibold text-[#09090b]">
        Startup name
      </label>
      
      <Input
        type="text"
        value={companyName}
        onChange={handleChangeStartupName}
        placeholder="Company name"
        classNames={{
          input: "text-[14px] font-normal",
          inputWrapper: "h-12 border border-[#e4e4e7] bg-white rounded-lg px-3"
        }}
        fullWidth
      />

      <p className="text-[14px] font-normal text-[#71717a] leading-5">
        Your profile could be found with username <span className="text-empacts">{startupUsername !== '' ? startupUsername : '@company_name'}</span>. You can change it later in Settings
      </p>
    </div>
  );
};

export default StartupNameSection;

