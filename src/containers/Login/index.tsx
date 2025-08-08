'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { addToast } from "@heroui/react";
import { emailSignin, loginWithGoogleAPI } from '@/apis/auth';
import { useSearchParams } from 'next/navigation';
import { getUserAuthInfoAPI } from '@/apis/user';
import { useRouter } from 'next/navigation';
import AuthHeader from '@/components/Header/AuthHeader';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import AuthLink from '@/components/AuthLink';
import FormFooterAction from '@/components/FormFooterAction';
import { ROUTES } from '@/constants/link';
import { getStartupInvitationUrl } from '@/constants/link';
import { checkEmailFormat } from '@/utils/checkValid';
import Image from 'next/image';

function routeAfterLoginWithInvitation(router: any, response: any) {
  const hasInvitationStatus = localStorage.getItem("status");

  if (hasInvitationStatus) {
    const invitationCode = localStorage.getItem("invitationCode");
    const invitedEmail = localStorage.getItem("invitedEmail");

    if (invitedEmail === response.email) {
      router.push(getStartupInvitationUrl(invitationCode || '', invitedEmail || ''));
    } else {
      router.push(ROUTES.PROFILES.NEW); 
    }
  } else {
    if (response.user.hasProfile) {
      router.push(ROUTES.PROFILES.NEW);
    } else {
      router.push(ROUTES.PROFILES.NEW);
    }
  }
}

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [emailColor, setEmailColor] = useState<'default' | 'danger'>('default');

  const [isValidPassword, setIsValidPassword] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [passwordColor, setPasswordColor] = useState<'default' | 'danger'>('default');

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const updateEmailValidation = useCallback((email: string) => {
    const isValid = checkEmailFormat(email);
    setEmailError(isValid ? '' : 'Invalid email format');
    setEmailColor(isValid ? 'default' : 'danger');
    setIsValidEmail(isValid);
    return isValid;
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const isEmailValid = email ? updateEmailValidation(email) : false;
    if (!isEmailValid) return;

    try {
      const response = await emailSignin(email, password);

      if (response.code !== "LOGIN") {
        setPasswordError(response.message || 'Invalid credentials');
        setPasswordColor('danger');
        setIsValidPassword(false);
        setEmailColor('danger');
        setIsValidEmail(false);
        addToast({
          title: response.message || 'Invalid credentials',
          color: 'danger',
          timeout: 5000,
        });
      } else {
        setPasswordError('');
        setPasswordColor('default');
        setIsValidPassword(true);
        setEmailColor('default');
        setIsValidEmail(true);
        addToast({
          title: 'Login successful',
          color: 'success',
        });

        localStorage.setItem('user', JSON.stringify(response.data.user));
        routeAfterLoginWithInvitation(router, response.data);
      }
    } catch (error) {
      console.error(error);
      addToast({
        title: 'An error occurred while logging in',
        color: 'danger',
        timeout: 5000,
      });
    }
  };

  useEffect(() => {
    if (hasSubmitted && email) {
      updateEmailValidation(email);
    }
  }, [email, hasSubmitted, isValidEmail, updateEmailValidation]);

  useEffect(() => {
    async function getUserAuthInfo() {
      const success = searchParams.get('success');
      if (success === 'true') {
        try {
          const response = await getUserAuthInfoAPI();
          localStorage.setItem('user', JSON.stringify(response.data));

          routeAfterLoginWithInvitation(router, response.data);
        } catch (error) {
          console.error('Error fetching user auth info:', error);
          addToast({
            title: 'Login with Google failed!',
            color: 'danger',
            timeout: 5000,
          });
        }
      } else if (success == 'false') {
        addToast({
          title: 'Login with Google failed!',
          color: 'danger',
          timeout: 5000,
        });
      }
    }
    getUserAuthInfo()
  }, [searchParams, router]);

  // Inline components
  const FormDivider = () => (
    <div className="my-6 text-gray-500 flex items-center">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-black text-sm">Or</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );

  const GoogleSignInButton = () => (
    <Button
      onClick={loginWithGoogleAPI}
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
  );

  return (
    <div className="bg-white h-screen flex justify-center">
      <div className="login-form p-8 rounded-lg w-full max-w-sm flex flex-col justify-start mt-[30%]">
        <AuthHeader
          title="Sign in"
          description=""
        />
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email"
            variant="email"
            value={email}
            onChange={setEmail}
            isInvalid={!isValidEmail}
            color={emailColor}
            errorMessage={emailError}
          />
          <Input
            label="Password"
            variant="password"
            value={password}
            onChange={setPassword}
            isInvalid={!isValidPassword}
            color={passwordColor}
            errorMessage={passwordError}
          />
          <div className="text-right !mt-1">
            <AuthLink href="/auth/forgot-password" className="text-sm font-bold text-[#1A1D1F]">
              Forgot your password?
            </AuthLink>
          </div>
          <Button 
            type="submit" 
            fullWidth 
            customVariant="primary" 
            customStyle="solid"
            className="mt-4 rounded-lg"
          >
            Sign in
          </Button>
        </form>
        
        <FormDivider />
        <GoogleSignInButton />
        <FormFooterAction
          text="Don't have an account?"
          action={<AuthLink href={ROUTES.AUTH.SIGNUP}>Sign Up</AuthLink>}
        />
      </div>
    </div>
  );
}

export default Login;
