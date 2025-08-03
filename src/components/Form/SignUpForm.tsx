'use client';
import React from 'react';
import { Input, Button } from "@heroui/react";
import Link from 'next/link';

interface SignUpFormProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isValidEmail: boolean;
  emailError: string;
  emailColor: 'default' | 'danger';
}

function SignUpForm({
  email,
  onEmailChange,
  onSubmit,
  isValidEmail,
  emailError,
  emailColor
}: SignUpFormProps) {
  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          variant="underlined"
          size="lg"
          radius='none'
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
          className="!text-white w-full rounded-lg bg-empacts border-empacts"
        >
          Sign up
        </Button>
      </form>
      
      {/* Sign In Link */}
      <div className="text-center mt-8">
        <span className="text-gray-500">Already have an account? </span>
        <Link href="/auth/login" color="secondary" className="text-empacts">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default SignUpForm;
