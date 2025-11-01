'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { addToast, Form } from '@heroui/react';
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
import {
  API_RESPONSE_CODES,
  TOAST_TIMEOUT,
  TOAST_COLORS,
  TOAST_MESSAGES,
  API_RESPONSE_NUMBER_CODES,
} from '@/constants/api';
import Image from 'next/image';

function routeAfterLoginWithInvitation(router: any, userInfo: any) {
  const hasInvitationStatus = localStorage.getItem('status');

  if (hasInvitationStatus) {
    const invitationCode = localStorage.getItem('invitationCode');
    const invitedEmail = localStorage.getItem('invitedEmail');

    if (invitedEmail === userInfo.email) {
      router.push(getStartupInvitationUrl(invitationCode || '', invitedEmail || ''));
    } else {
      router.push(ROUTES.PROFILES.NEW);
    }
  } else {
    if (userInfo?.hasProfile) {
      router.push(ROUTES.PROFILES.GENERAL);
    } else {
      router.push(ROUTES.PROFILES.NEW);
    }
  }
}

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasHandledAuth = useRef(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailError, setEmailError] = useState('');

  const [isValidPassword, setIsValidPassword] = useState(true);
  const [passwordError, setPasswordError] = useState('');

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const updateEmailValidation = useCallback((email: string) => {
    const isValid = checkEmailFormat(email);
    setEmailError(isValid ? '' : 'Invalid email format');
    setIsValidEmail(isValid);
    return isValid;
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Email is required');
      setIsValidEmail(false);
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      setIsValidPassword(false);
      return;
    }

    setHasSubmitted(true);

    const isEmailValid = email ? updateEmailValidation(email) : false;
    if (!isEmailValid) return;

    try {
      const response = await emailSignin(email, password);
      if (response.code == API_RESPONSE_CODES.LOGIN) {
        setPasswordError('');
        setIsValidPassword(true);
        setIsValidEmail(true);
        addToast({
          title: TOAST_MESSAGES.LOGIN_SUCCESS,
          color: TOAST_COLORS.SUCCESS,
        });
        localStorage.setItem('user', JSON.stringify(response.data.user));
        routeAfterLoginWithInvitation(router, response.data);
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.status === API_RESPONSE_NUMBER_CODES.LOGIN_INVALID_CREDENTIALS
      ) {
        setPasswordError(TOAST_MESSAGES.INVALID_CREDENTIALS);
        setIsValidPassword(false);
        setIsValidEmail(false);
        setEmail('');
        setPassword('');
        addToast({
          title: TOAST_MESSAGES.INVALID_CREDENTIALS,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.MEDIUM,
        });
      } else {
        addToast({
          title: TOAST_MESSAGES.LOGIN_ERROR,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.MEDIUM,
        });
      }
    }
  };

  useEffect(() => {
    if (email) {
      setEmailError('');
      setIsValidEmail(true);
    }
  }, [email]);

  useEffect(() => {
    if (password) {
      setPasswordError('');
      setIsValidPassword(true);
    }
  }, [password]);

  useEffect(() => {
    if (hasSubmitted && email) {
      updateEmailValidation(email);
    }
  }, [email, hasSubmitted, updateEmailValidation]);

  useEffect(() => {
    async function getUserAuthInfo() {
      const success = searchParams.get('success');
      if (!success || hasHandledAuth.current) return;
      hasHandledAuth.current = true;
      if (success === 'true') {
        try {
          const response = await getUserAuthInfoAPI();
          localStorage.setItem('user', JSON.stringify(response.data));

          routeAfterLoginWithInvitation(router, response.data);
          addToast({
            title: TOAST_MESSAGES.GOOGLE_LOGIN_SUCCESS,
            color: TOAST_COLORS.SUCCESS,
            timeout: TOAST_TIMEOUT.MEDIUM,
          });
        } catch (error) {
          addToast({
            title: TOAST_MESSAGES.GOOGLE_LOGIN_FAILED,
            color: TOAST_COLORS.DANGER,
            timeout: TOAST_TIMEOUT.MEDIUM,
          });
        }
      } else if (success === 'false') {
        addToast({
          title: TOAST_MESSAGES.GOOGLE_LOGIN_FAILED,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.MEDIUM,
        });
      }
    }

    getUserAuthInfo();
  }, [searchParams, router]);

  // Inline components
  const FormDivider = () => (
    <div className='mt-8 mb-4 text-gray-500 flex items-center'>
      <div className='flex-grow border-t border-gray-300'></div>
      <span className='mx-4 text-black text-base font-normal'>Or</span>
      <div className='flex-grow border-t border-gray-300'></div>
    </div>
  );

  const GoogleSignInButton = () => (
    <Button onClick={loginWithGoogleAPI} variant='google'>
      <Image src='/google-icon.svg' alt='Google icon' width={20} height={20} className='mr-2' />
      Sign in with Google
    </Button>
  );

  return (
    <div className='bg-white h-screen flex justify-center'>
      <div className='login-form p-8 rounded-lg w-full max-w-sm flex flex-col justify-start mt-[30%]'>
        <AuthHeader title='Sign in' description='' />
        <Form onSubmit={handleLogin} className='space-y-6'>
          <Input
            label='Email'
            variant='email'
            type='email'
            value={email}
            onChange={setEmail}
            isInvalid={!isValidEmail}
            preset='line-fill-md'
            errorMessage={emailError}
          />
          <Input
            label='Password'
            variant='password'
            value={password}
            onChange={setPassword}
            isInvalid={!isValidPassword}
            preset='line-fill-md'
            errorMessage={passwordError}
          />
          <div className='text-right !mt-1 w-full'>
            <AuthLink
              href={ROUTES.AUTH.FORGOT_PASSWORD}
              className='text-xs font-semibold text-black'
            >
              Forgot your password?
            </AuthLink>
          </div>
          <Button variant='primary-full' className='mt-4 text-[16px] h-[48px]' type='submit'>
            Sign in
          </Button>
        </Form>

        <FormDivider />
        <GoogleSignInButton />
        <FormFooterAction
          text="Don't have an account?"
          action={
            <AuthLink href={ROUTES.AUTH.SIGNUP} className='text-base font-normal text-primary'>
              Sign Up
            </AuthLink>
          }
        />
      </div>
    </div>
  );
}

export default Login;
