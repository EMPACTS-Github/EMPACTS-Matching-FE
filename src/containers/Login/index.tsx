'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { addToast } from "@heroui/react";
import { email_signin, loginWithGoogleAPI } from '@/apis/auth';
import { useSearchParams } from 'next/navigation';
import { getUserAuthInfoAPI } from '@/apis/user';
import { useRouter } from 'next/navigation';
import AuthHeader from '@/components/Header/AuthHeader';
import EmailInput from '@/components/FormInput/EmailInput';
import PasswordInput from '@/components/FormInput/PasswordInput';
import AuthButton from '@/components/common/AuthButton';
import AuthLink from '@/components/common/AuthLink';
import GoogleSignInButton from '@/components/common/GoogleSignInButton';
import FormDivider from '@/components/common/FormDivider';
import AuthFormFooter from '@/components/common/AuthFormFooter';
import { getEmailValidationState } from '@/utils/emailValidation';
import { handlePostLoginRouting } from '@/utils/authRouting';

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
    const validation = getEmailValidationState(email, hasSubmitted);
    setEmailError(validation.error);
    setEmailColor(validation.color);
    setIsValidEmail(validation.isValid);
    return validation.isValid;
  }, [hasSubmitted]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const isEmailValid = updateEmailValidation(email);
    if (!isEmailValid) return;

    try {
      const response = await email_signin(email, password);

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
        handlePostLoginRouting(router, response.data);
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
    if (hasSubmitted && !isValidEmail) {
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

          handlePostLoginRouting(router, response.data);
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
          <EmailInput
            value={email}
            onChange={setEmail}
            isInvalid={!isValidEmail}
            color={emailColor}
            errorMessage={emailError}
          />
          <PasswordInput
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
          <AuthButton type="submit" className="mt-4">
            Sign in
          </AuthButton>
        </form>
        
        <FormDivider />
        <GoogleSignInButton onPress={loginWithGoogleAPI} />
        <AuthFormFooter
          text="Don't have an account?"
          linkText="Sign Up"
          linkHref="/auth/signup"
        />
      </div>
    </div>
  );
}

export default Login;
