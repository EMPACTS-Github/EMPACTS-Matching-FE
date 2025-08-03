import React from 'react';
import { InputOtp } from '@heroui/react';

interface OTPInputProps {
  value: string;
  onValueChange: (value: string) => void;
  onComplete?: () => void;
  length?: number;
  variant?: 'flat' | 'bordered' | 'underlined' | 'faded';
}

function OTPInput({
  value,
  onValueChange,
  onComplete,
  length = 6,
  variant = 'underlined'
}: OTPInputProps) {
  return (
    <InputOtp
      length={length}
      value={value}
      onValueChange={onValueChange}
      onComplete={onComplete}
      variant={variant}
    />
  );
}

export default OTPInput;
