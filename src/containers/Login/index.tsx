'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input, Button, addToast } from "@heroui/react";
import Link from 'next/link';
import { email_signin, loginWithGoogleAPI } from '@/apis/auth';
import { useSearchParams } from 'next/navigation';
import { getUserAuthInfoAPI } from '@/apis/user';
import { useRouter } from 'next/navigation';
import AuthHeader from '@/components/Header/AuthHeader';

// Component that uses useSearchParams
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

  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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

  // eslint-disable-next-line no-unused-vars
  const handleBackButton = () => {
    router.back()
  }

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const isEmailValid = validateEmailFormat(email);
    if (!isEmailValid) return;

    // Step 2: Send request and validate credentials
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

        router.push('/explore'); // Redirect to home page after successful login
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
      validateEmailFormat(email);
    }
  }, [email, hasSubmitted, isValidEmail]);

  useEffect(() => {
    async function getUserAuthInfo() {
      const success = searchParams.get('success');
      if (success === 'true') {
        try {
          const userInfo = await getUserAuthInfoAPI();
          localStorage.setItem('user', JSON.stringify(userInfo.data));
          router.push('/');
        } catch (error) {
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

  const renderForm = () => (
    <form onSubmit={handleLogin} className="space-y-4">
      <Input
        variant="underlined"
        size="lg"
        label="Email"
        value={email}
        radius='none'
        isInvalid={!isValidEmail}
        color={emailColor}
        errorMessage={emailError}
        onChange={(e) => setEmail(e.target.value)}
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
        onChange={(e) => setPassword(e.target.value)}
        style={{ borderRadius: '0px' }}
      />
      <div className="text-right !mt-1">
        <Link href="/auth/forgot-password" className="text-sm text-[#1A1D1F] font-bold">
          Forgot your password?
        </Link>
      </div>
      <Button
        type="submit"
        color="primary"
        size="lg"
        className="!text-white w-full mt-4 rounded-lg bg-[#7f00ff] border-[#7f00ff]"
      >
        Sign in
      </Button>
    </form>
  );

  return (
    <div className="bg-white flex items-center justify-center h-full">
      <div className="login-form p-8 rounded-lg w-full max-w-sm h-3/4">
        <AuthHeader
          title="Sign in"
          description=""
        />
        {renderForm()}
        <div className="my-6 text-gray-500 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-black text-sm">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        {/* Google Sign In Button */}
        <Button
          onPress={loginWithGoogleAPI}
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
    </div>
  );
}

export default Login;