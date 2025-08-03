'use client';
import React from 'react';
import Image from 'next/image';
import { Input, Button } from "@heroui/react";
import Link from 'next/link';

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleLogin: () => void;
  
  // Validation states
  isValidEmail: boolean;
  emailError: string;
  emailColor: 'default' | 'danger';
  
  isValidPassword: boolean;
  passwordError: string;
  passwordColor: 'default' | 'danger';
}

function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleLogin,
  isValidEmail,
  emailError,
  emailColor,
  isValidPassword,
  passwordError,
  passwordColor
}: LoginFormProps) {
  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          variant="underlined"
          size="lg"
          label="Email"
          value={email}
          radius='none'
          isInvalid={!isValidEmail}
          color={emailColor}
          errorMessage={emailError}
          onChange={(e) => onEmailChange(e.target.value)}
        />
        <Input
          variant="underlined"
          radius='none'
          size="lg"
          type="password"
          label="Password"
          value={password}
          isInvalid={!isValidPassword}
          color={passwordColor}
          errorMessage={passwordError}
          onChange={(e) => onPasswordChange(e.target.value)}
          style={{ borderRadius: '0px' }}
        />
        <div className="text-right !mt-1">
          <Link href="/auth/forgot-password" className="text-sm text-secondary font-bold">
            Forgot your password?
          </Link>
        </div>
        <Button
          type="submit"
          color="primary"
          size="lg"
          className="!text-white w-full mt-4 rounded-lg bg-empacts border-empacts"
        >
          Sign in
        </Button>
      </form>
      
      <div className="my-6 text-gray-500 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-black text-sm">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      
      {/* Google Sign In Button */}
      <Button
        onPress={onGoogleLogin}
        size="lg"
        className="w-full mt-2 flex justify-center items-center rounded-lg bg-[#F4F4F4] text-black"
      >
        <Image
          src="/google-icon.svg"
          alt="Google icon"
          width={20}
          height={20}
          className="mr-2"
        />
        Sign in with Google
      </Button>
      
      {/* Sign Up Link */}
      <div className="text-center mt-4">
        <span className="text-gray-500">Don&apos;t have an account? </span>
        <Link href="/auth/signup" color="secondary" className="text-empacts">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
