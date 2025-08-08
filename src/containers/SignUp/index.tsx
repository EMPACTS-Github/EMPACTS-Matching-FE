'use client';
import React, { useState } from 'react';
import { addToast } from "@heroui/react";
import { emailSignup } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import AuthHeader from '@/components/Header/AuthHeader';
import { ROUTES } from '@/constants/link';
import Input from '@/components/FormInput/Input';
import Button from '@/components/Button/Button';
import EmailVerification from '@/containers/SignUp/EmailVerification';
import CreatePassword from '@/containers/SignUp/CreatePassword';
import RegisterInfo from '@/containers/SignUp/RegisterInfo';
import { checkEmailFormat } from '@/utils/checkValid';
import AuthLink from '@/components/AuthLink';
import FormFooterAction from '@/components/FormFooterAction';

function SignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentScreen = searchParams.get('stage');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [emailColor, setEmailColor] = useState<'default' | 'danger'>('default');

  const updateEmailValidation = (email: string) => {
    const isValid = checkEmailFormat(email);
    setEmailError(isValid ? '' : 'Invalid email format');
    setEmailColor(isValid ? 'default' : 'danger');
    setIsValidEmail(isValid);
    return isValid;
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = updateEmailValidation(email);
    if (!isEmailValid) return;
    
    try {
      const response = await emailSignup(email);
      if (response.code == "VERIFICATION_EMAIL_SENT") {
        addToast({
          title: 'Verification code sent to your email',
          color: 'success',
          timeout: 3000,
        });
        localStorage.setItem('email', email);
        router.push(`${ROUTES.AUTH.SIGNUP}?stage=verification`);
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
            <form onSubmit={handleSignup} className="space-y-4">
              <Input
                variant="email"
                value={email}
                onChange={setEmail}
                isInvalid={!isValidEmail}
                color={emailColor}
                errorMessage={emailError}
                required
              />
              <Button type="submit" fullWidth color="primary" className="rounded-lg bg-empacts border-empacts !text-white">
                Sign up
              </Button>
            </form>
            
            <FormFooterAction
              text="Already have an account?"
              action={<AuthLink href={ROUTES.AUTH.LOGIN}>Sign in</AuthLink>}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
