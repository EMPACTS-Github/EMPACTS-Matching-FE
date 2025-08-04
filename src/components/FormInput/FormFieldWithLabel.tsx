import React from 'react';
import { Input } from "@heroui/react";

interface FormFieldWithLabelProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
}

function FormFieldWithLabel({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  helperText,
  required = false,
  fullWidth = true,
  className = ""
}: FormFieldWithLabelProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`flex flex-col w-full gap-2 ${className}`}>
      <label className="text-[14px] font-semibold text-[#09090b]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <Input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        classNames={{
          input: "text-[14px] font-normal",
          inputWrapper: "h-12 border border-[#e4e4e7] bg-white rounded-lg px-3"
        }}
        fullWidth={fullWidth}
      />

      {helperText && (
        <p className="text-[14px] font-normal text-[#71717a] leading-5">
          {helperText}
        </p>
      )}
    </div>
  );
}

export default FormFieldWithLabel;
