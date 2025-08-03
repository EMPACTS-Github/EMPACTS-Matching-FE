'use client';
import React from 'react';
import { Input, Button } from "@heroui/react";

interface ForgotPasswordEmailFormProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  
  // Validation states
  isValidEmail: boolean;
  emailError: string;
  emailColor: 'default' | 'danger';
}

function ForgotPasswordEmailForm({
  email,
  onEmailChange,
  onSubmit,
  isValidEmail,
  emailError,
  emailColor
}: ForgotPasswordEmailFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        variant='underlined'
        fullWidth
        radius='none'
        size="lg"
        label="Email"
        value={email}
        isInvalid={!isValidEmail}
        color={emailColor}
        errorMessage={emailError}
        onChange={(e) => onEmailChange(e.target.value)}
        required
      />
      <Button
        type="submit"
        color="primary"
        size="lg"
        className="!text-white w-full mt-4 rounded-lg bg-empacts border-empacts"
      >
        Continue
      </Button>
    </form>
  );
}

export default ForgotPasswordEmailForm;
