'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { addToast } from "@heroui/react";
import { emailSignin, loginWithGoogleAPI } from '@/apis/auth';
import { useSearchParams } from 'next/navigation';
import { getUserAuthInfoAPI } from '@/apis/user';
import { useRouter } from 'next/navigation';
import AuthHeader from '@/components/Header/AuthHeader';
import Input from '@/components/FormInput/Input';
import Button from '@/components/Button/Button';
import AuthLink from '@/components/common/AuthLink';
import GoogleSignInButton from '@/components/common/GoogleSignInButton';
import FormDivider from '@/components/common/FormDivider';
import AuthFormFooter from '@/components/common/AuthFormFooter';
import { getEmailValidationState } from '@/utils/emailValidation';
import { ROUTES } from '@/constants/routes';
import { getStartupInvitationUrl } from '@/constants/routes';

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
    const validation = getEmailValidationState(email);
    setEmailError(validation.error);
    setEmailColor(validation.color);
    setIsValidEmail(validation.isValid);
    return validation.isValid;
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



  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="login-form p-8 rounded-lg w-full max-w-sm h-screen flex flex-col justify-center">
        <AuthHeader
          title="Sign in"
          description=""
        />
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            variant="email"
            value={email}
            onChange={setEmail}
            isInvalid={!isValidEmail}
            color={emailColor}
            errorMessage={emailError}
          />
          <Input
            variant="password"
            value={password}
            onChange={setPassword}
            isInvalid={!isValidPassword}
            color={passwordColor}
            errorMessage={passwordError}
          />
          <div className="text-right !mt-1">
            <AuthLink href="/auth/forgot-password" className="text-sm font-bold">
              Forgot your password?
            </AuthLink>
          </div>
          <Button type="submit" fullWidth color="primary" className="mt-4 rounded-lg bg-empacts border-empacts !text-white">
            Sign in
          </Button>
        </form>
        
        <FormDivider />
        <GoogleSignInButton onPress={loginWithGoogleAPI} />
        <AuthFormFooter
          text="Don't have an account?"
          linkText="Sign Up"
          linkHref={ROUTES.AUTH.SIGNUP}
        />
      </div>
    </div>
  );
}

export default Login;
