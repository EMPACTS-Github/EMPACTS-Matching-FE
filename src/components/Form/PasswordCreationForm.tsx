'use client';
import React from 'react';
import Image from 'next/image';
import { Input, Button } from "@heroui/react";
import EmpactsLogo from '/public/empacts-logo.png';
import Link from 'next/link';

interface PasswordCreationFormProps {
  password: string;
  confirmPassword: string;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  onSubmit: () => void;
}

function PasswordCreationForm({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit
}: PasswordCreationFormProps) {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center text-center">
        <Image
          src={EmpactsLogo}
          alt="EMPACTS Logo Image"
          priority
          width={120}
          height={120}
        />
        <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Sign up</h2>
      </div>
      <div className="space-y-4">
        <Input
          variant="underlined"
          radius='none'
          size="lg"
          type='password'
          label="Password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
        />
        <Input
          variant="underlined"
          radius='none'
          size="lg"
          type='password'
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          required
        />
        <Button
          type="submit"
          color="primary"
          size="lg"
          className="w-full rounded-lg bg-empacts border-empacts"
          onClick={onSubmit}
        >
          Sign up
        </Button>
      </div>

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

export default PasswordCreationForm;
