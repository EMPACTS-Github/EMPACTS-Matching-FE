import React from 'react';
import { Select, SelectItem } from "@heroui/react";

interface Option {
  value: string;
  label: string;
}

interface FormMultiSelectWithLabelProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}

function FormMultiSelectWithLabel({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  className = ""
}: FormMultiSelectWithLabelProps) {
  return (
    <div className={`flex flex-col w-full gap-2 ${className}`}>
      <label className="text-[14px] font-semibold text-[#09090b]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        aria-label={`Select ${label}`}
        selectionMode="multiple"
        selectedKeys={value}
        onSelectionChange={(keys) =>
          onChange(Array.from(keys).map(String))
        }
        className="w-full"
        size="sm"
        classNames={{
          trigger:
            "h-12 border border-[#e4e4e7] bg-white rounded-lg px-3 flex justify-between text-empacts",
          value: "text-[14px] text-empacts",
          selectorIcon: "text-empacts",
        }}
        placeholder={placeholder}
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            className={`text-[14px] font-semibold ${value.includes(option.value)
                ? "text-empacts"
                : "text-gray-700 hover:text-gray-900"
              }`}
          >
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

export default FormMultiSelectWithLabel;
