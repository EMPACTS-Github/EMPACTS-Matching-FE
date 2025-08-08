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
import FormFooterAction from '@/components/Form/FormFooterAction';
import { ROUTES } from '@/constants/link';
import { getStartupInvitationUrl } from '@/constants/link';
import { checkEmailFormat } from '@/utils/checkValid';
import { API_RESPONSE_CODES, TOAST_TIMEOUT, TOAST_COLORS, TOAST_MESSAGES } from '@/constants/api';
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

      if (response.code !== API_RESPONSE_CODES.LOGIN) {
        setPasswordError(response.message || TOAST_MESSAGES.INVALID_CREDENTIALS);
        setPasswordColor('danger');
        setIsValidPassword(false);
        setEmailColor('danger');
        setIsValidEmail(false);
        addToast({
          title: response.message || TOAST_MESSAGES.INVALID_CREDENTIALS,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.MEDIUM,
        });
      } else {
        setPasswordError('');
        setPasswordColor('default');
        setIsValidPassword(true);
        setEmailColor('default');
        setIsValidEmail(true);
        addToast({
          title: TOAST_MESSAGES.LOGIN_SUCCESS,
          color: TOAST_COLORS.SUCCESS,
        });

        localStorage.setItem('user', JSON.stringify(response.data.user));
        routeAfterLoginWithInvitation(router, response.data);
      }
    } catch (error) {
      console.error(error);
      addToast({
        title: TOAST_MESSAGES.LOGIN_ERROR,
        color: TOAST_COLORS.DANGER,
        timeout: TOAST_TIMEOUT.MEDIUM,
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
            title: TOAST_MESSAGES.GOOGLE_LOGIN_FAILED,
            color: TOAST_COLORS.DANGER,
            timeout: TOAST_TIMEOUT.MEDIUM,
          });
        }
      } else if (success == 'false') {
        addToast({
          title: TOAST_MESSAGES.GOOGLE_LOGIN_FAILED,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.MEDIUM,
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
      variant="google"
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
            <AuthLink href={ROUTES.AUTH.FORGOT_PASSWORD} className="text-sm font-bold text-[#1A1D1F]">
              Forgot your password?
            </AuthLink>
          </div>
          <Button 
            variant="submit-lg"
            className="mt-4"
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
