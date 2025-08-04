import React from 'react';

interface FormTextareaWithLabelProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  className?: string;
}

function FormTextareaWithLabel({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  required = false,
  className = ""
}: FormTextareaWithLabelProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`flex flex-col w-full gap-2 ${className}`}>
      <label className="text-[14px] font-semibold text-[#09090b]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className="border border-[#e4e4e7] bg-white rounded-lg px-3 py-2 text-[14px] font-normal resize-none"
      />
    </div>
  );
}

export default FormTextareaWithLabel;
