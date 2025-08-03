import React from 'react';
import { Input } from '@heroui/react';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  color?: 'default' | 'danger';
  label?: string;
  placeholder?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function EmailInput({
  value,
  onChange,
  isInvalid = false,
  errorMessage = '',
  color = 'default',
  label = 'Email',
  placeholder,
  required = false,
  size = 'lg'
}: EmailInputProps) {
  return (
    <Input
      type="email"
      variant="underlined"
      radius="none"
      size={size}
      label={label}
      placeholder={placeholder}
      value={value}
      isInvalid={isInvalid}
      color={color}
      errorMessage={errorMessage}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  );
}

export default EmailInput;
