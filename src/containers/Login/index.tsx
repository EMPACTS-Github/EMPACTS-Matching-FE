'use client';

import React, { useEffect, useState } from 'react';
import { addToast } from "@heroui/react";
import { email_signin, loginWithGoogleAPI } from '@/apis/auth';
import { useSearchParams } from 'next/navigation';
import { getUserAuthInfoAPI } from '@/apis/user';
import { useRouter } from 'next/navigation';
import AuthHeader from '@/components/Header/AuthHeader';
import LoginForm from '@/components/Form/LoginForm';

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const isEmailValid = validateEmailFormat(email);
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

        const hasInvitationStatus = localStorage.getItem('status');
        if (hasInvitationStatus) {
          const invitationCode = localStorage.getItem('invitationCode');
          const invitedEmail = localStorage.getItem('invitedEmail');
          if (invitedEmail === response.data.email) {
            router.push(`/startup-invitation?code=${invitationCode}&email=${invitedEmail}`);
          } else {
            router.push('/profiles');
          }
        } else {
          if (response.data.user.hasProfile) {
            router.push('/profiles');
          } else {
            router.push('/profiles/new');
          }
        }
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
          const response = await getUserAuthInfoAPI();
          localStorage.setItem('user', JSON.stringify(response.data));

          const hasInvitationStatus = localStorage.getItem('status');
          if (hasInvitationStatus) {
            const invitationCode = localStorage.getItem('invitationCode');
            const invitedEmail = localStorage.getItem('invitedEmail');
            if (invitedEmail === response.data.email) {
              router.push(`/startup-invitation?code=${invitationCode}&email=${invitedEmail}`);
            }
          } else {
            if (response.data.hasProfile) {
              router.push('/profiles');
            } else {
              router.push('/profiles/new');
            }
          }
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
        <LoginForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleLogin}
          onGoogleLogin={loginWithGoogleAPI}
          isValidEmail={isValidEmail}
          emailError={emailError}
          emailColor={emailColor}
          isValidPassword={isValidPassword}
          passwordError={passwordError}
          passwordColor={passwordColor}
        />
      </div>
    </div>
  );
}

export default Login;
