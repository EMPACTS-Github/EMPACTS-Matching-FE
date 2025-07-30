'use client';
import React, { useState } from 'react';
import { Input, Button, addToast } from "@heroui/react";
import Link from 'next/link';
import { email_signup } from '@/apis/auth';
import { EmailVerification } from '@/containers/SignUp';
import { CreatePassword } from '@/containers/SignUp';
import { RegisterInfo } from '@/containers/SignUp';
import { useRouter } from 'next/navigation';
import AuthHeader from '@/components/Header/AuthHeader';

import { useSearchParams } from 'next/navigation';
import { checkEmailFormat } from '@/utils/checkValid';

function SignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentScreen = searchParams.get('stage');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [emailColor, setEmailColor] = useState<'default' | 'danger'>('default');

  const validateEmailFormat = (email: string): boolean => {
    if (!checkEmailFormat(email)) {
      setEmailError('Invalid email format');
      setEmailColor('danger');
      setIsValidEmail(false);
      return false;
    }
    setEmailError('');
    setEmailColor('default');
    setIsValidEmail(true);
    return true;
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = validateEmailFormat(email);
    if (!isEmailValid) return;
    try {
      const response = await email_signup(email);
      if (response.code == "VERIFICATION_EMAIL_SENT") {
        addToast({
          title: 'Verification code sent to your email',
          color: 'success',
          timeout: 3000,
        })
        localStorage.setItem('email', email);
        router.push('/auth/signup?stage=verification');
      } else {
        addToast({
          title: 'User already exist',
          color: 'danger',
          timeout: 5000,
        })
      }
    } catch (error) {
      addToast({
        title: 'An error occurred while signing up',
        color: 'danger',
        timeout: 5000,
      })
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSignup} className="space-y-4">
      <Input
        variant="underlined"
        size="lg"
        radius='none'
        label="Email"
        value={email}
        isInvalid={!isValidEmail}
        color={emailColor}
        errorMessage={emailError}
        onChange={(e) => setEmail(e.target.value)}
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
  );

  return (
    <div className="col-span-1 bg-white flex items-center justify-center h-screen">
      <div className="p-8 rounded-lg w-full max-w-sm h-screen flex flex-col justify-center">
        {currentScreen == 'verification' ? (
          <EmailVerification />
        ) : currentScreen == 'password' ? (
          <CreatePassword email={email} />
        ) : currentScreen == 'registerinfo' ? (
          <RegisterInfo />
        ) : (
          <div>
            <AuthHeader
              title="Sign up"
              description=""
            />
            {renderForm()}
            {/* Sign In Link */}
            <div className="text-center mt-8">
              <span className="text-gray-500">Already have an account? </span>
              <Link href="/auth/login" color="secondary" className="text-empacts">
                Sign in
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp; 
