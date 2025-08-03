import React from 'react';
import { Input } from '@heroui/react';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  color?: 'default' | 'danger';
  label?: string;
  placeholder?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  description?: string;
}

function PasswordInput({
  value,
  onChange,
  isInvalid = false,
  errorMessage = '',
  color = 'default',
  label = 'Password',
  placeholder,
  required = false,
  size = 'lg',
  description
}: PasswordInputProps) {
  return (
    <Input
      type="password"
      variant="underlined"
      radius="none"
      size={size}
      label={label}
      placeholder={placeholder}
      value={value}
      isInvalid={isInvalid}
      color={color}
      errorMessage={errorMessage}
      description={description}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  );
}

export default PasswordInput;
