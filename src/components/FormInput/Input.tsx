import React from 'react';
import { Input as HeroInput, InputOtp } from '@heroui/react';

interface BaseInputProps {
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
  className?: string;
}

interface TextInputProps extends BaseInputProps {
  variant: 'text' | 'email' | 'password';
  type?: 'text' | 'email' | 'password';
}

interface OTPInputProps extends BaseInputProps {
  variant: 'otp';
  onComplete?: () => void;
  length?: number;
  otpVariant?: 'flat' | 'bordered' | 'underlined' | 'faded';
}

type InputProps = TextInputProps | OTPInputProps;

function Input(props: InputProps) {
  const {
    value,
    onChange,
    isInvalid = false,
    errorMessage = '',
    color = 'default',
    label,
    placeholder,
    required = false,
    size = 'lg',
    description,
    className
  } = props;

  // Handle OTP Input
  if (props.variant === 'otp') {
    const { onComplete, length = 6, otpVariant = 'underlined' } = props;
    return (
      <InputOtp
        length={length}
        value={value}
        onValueChange={onChange}
        onComplete={onComplete}
        variant={otpVariant}
      />
    );
  }

  // Handle Text Inputs (text, email, password)
  const { variant, type } = props;
  
  // Determine input type based on variant
  const inputType = type || (variant === 'email' ? 'email' : variant === 'password' ? 'password' : 'text');

  return (
    <HeroInput
      type={inputType}
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
      className={className}
    />
  );
}

export default Input; 
