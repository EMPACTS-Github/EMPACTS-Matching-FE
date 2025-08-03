'use client';
import React, { useState } from 'react';
import { addToast } from "@heroui/react";
import { email_signup } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import AuthHeader from '@/components/Header/AuthHeader';
import { checkEmailFormat } from '@/utils/checkValid';
import SignUpForm from '@/components/Form/SignUpForm';
import EmailVerification from '@/containers/SignUp/EmailVerification';
import CreatePassword from '@/containers/SignUp/CreatePassword';
import RegisterInfo from '@/containers/SignUp/RegisterInfo';

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
        });
        localStorage.setItem('email', email);
        router.push('/auth/signup?stage=verification');
      } else {
        addToast({
          title: 'User already exist',
          color: 'danger',
          timeout: 5000,
        });
      }
    } catch (error) {
      addToast({
        title: 'An error occurred while signing up',
        color: 'danger',
        timeout: 5000,
      });
    }
  };

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
            <SignUpForm
              email={email}
              onEmailChange={setEmail}
              onSubmit={handleSignup}
              isValidEmail={isValidEmail}
              emailError={emailError}
              emailColor={emailColor}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
