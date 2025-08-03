'use client';
import React from 'react';
import { Input, Button } from "@heroui/react";
import Image from 'next/image';
import ArrowLeftIcon from '/public/assets/arrow_left.svg';

interface ForgotPasswordResetFormProps {
  password: string;
  confirmPassword: string;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoBack: () => void;
  
  // Validation states
  isValidPassword: boolean;
  isValidConfirmPassword: boolean;
  passwordError: string;
  passwordDescription: string;
  confirmPasswordError: string;
  passwordColor: 'default' | 'danger';
  confirmPasswordColor: 'default' | 'danger';
}

function ForgotPasswordResetForm({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onGoBack,
  isValidPassword,
  isValidConfirmPassword,
  passwordError,
  passwordDescription,
  confirmPasswordError,
  passwordColor,
  confirmPasswordColor
}: ForgotPasswordResetFormProps) {
  return (
    <div>
      <div className="flex flex-col items-center text-center h-3/4">
        <div className="absolute left-10 hover:bg-gray-300 rounded-lg" onClick={onGoBack}>
          <Image src={ArrowLeftIcon} alt="Arrow left icon" width={40} height={40} />
        </div>
        <Image
          src="/empacts-logo.png"
          alt="Background image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '50%', height: 'auto' }}
          priority
        />
        <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Create new password</h2>
      </div>
      <div className="flex justify-center space-x-2 mt-6">
        <form onSubmit={onSubmit} className="space-y-6 w-full max-w-xs">
          <Input
            variant='underlined'
            label="Password"
            type="password"
            radius='none'
            isInvalid={!isValidPassword}
            color={passwordColor}
            errorMessage={passwordError}
            description={passwordDescription}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            size="lg"
          />
          <Input
            variant='underlined'
            label="Confirm Password"
            type="password"
            radius='none'
            isInvalid={!isValidConfirmPassword}
            color={confirmPasswordColor}
            errorMessage={confirmPasswordError}
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            required
            size="lg"
          />
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full mt-4 rounded-lg bg-empacts border-empacts"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordResetForm;
