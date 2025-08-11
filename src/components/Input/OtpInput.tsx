import React from "react";
import { InputOtp as HeroInputOtp } from "@heroui/react";

// Complete preset configurations including both styling and button props
export const otpInputPresets = {
  // underline otp input
  "otp-underline-lg": {
    variant: "underlined",
    size: "lg" as const,
  },
  "otp-underline-md": {
    variant: "underlined",
    size: "md" as const,
  },
  "otp-underline-sm": {
    variant: "underlined",
    size: "sm" as const,
  },
} as const;

// Type for button preset configuration
type OtpInputPreset = {
  variant: "underlined" | "bordered" | "flat" | "faded";
  size?: "sm" | "md" | "lg";
};

interface OtpInputProps {
  value: string;
  onValueChange: (value: string) => void;
  onComplete?: () => void;
  isInvalid?: boolean;
  errorMessage?: string;
  required?: boolean;
  className?: string;
  length?: number;
  isReadOnly?: boolean;
  // Custom variant props for predefined styles
  variant?: keyof typeof otpInputPresets;
}

const OtpInput = ({
  value,
  onValueChange,
  onComplete,
  isInvalid = false,
  errorMessage = "",
  required = false,
  className = "",
  length = 6,
  isReadOnly = false,
  variant,
}: OtpInputProps) => {
  // If using preset variant, apply complete preset configuration
  if (variant && otpInputPresets[variant]) {
    const preset = otpInputPresets[variant] as OtpInputPreset;

    return (
      <HeroInputOtp
        value={value}
        onValueChange={onValueChange}
        onComplete={onComplete}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        required={required}
        className={className}
        length={length}
        isReadOnly={isReadOnly}
        variant={preset.variant}
        size={preset.size}
      />
    );
  }
  // Default OTP input rendering
  return (
    <HeroInputOtp
      value={value}
      onValueChange={onValueChange}
      onComplete={onComplete}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      required={required}
      className={className}
      length={length}
      isReadOnly={isReadOnly}
    />
  );
};

export default OtpInput;
