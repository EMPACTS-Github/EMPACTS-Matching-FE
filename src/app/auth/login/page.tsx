'use client';

import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { Input, Button } from "@heroui/react";
import Link from 'next/link';
import EmpactsBg from '/public/empacts-bg.png';
import { toast } from 'react-toastify';
import { email_signin, loginWithGoogleAPI } from '@/apis/auth';
import { useSearchParams } from 'next/navigation';
import { getUserAuthInfoAPI } from '@/apis/user';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/app/ProtectedRoute';
import LogoAndTitle from '@/components/Auth/LogoAndTitle';

// Loading fallback component
const LoadingFallback = () => (
  <div className="grid grid-cols-3 min-h-screen">
    <div className="col-span-1 bg-white flex items-center justify-center">
      <div className="p-8 rounded-lg w-full max-w-sm">
        <p>Loading...</p>
      </div>
    </div>
    <div className="col-span-2 h-screen bg-[#1A1D1F]"></div>
  </div>
);

// Component that uses useSearchParams
function LoginContent() {
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

  // Function to validate email format
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
        toast.error(response.message || 'Invalid credentials');
      } else {
        setPasswordError('');
        setPasswordColor('default');
        setIsValidPassword(true);
        setEmailColor('default');
        setIsValidEmail(true);
        toast.success('Login successful');

        localStorage.setItem('user', JSON.stringify(response.data.user));

        router.push('/explore'); // Redirect to home page after successful login
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while logging in');
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
          toast.error('Login with Google failed!', {
            autoClose: 1000,
          });
        }
      } else if (success == 'false') {
        toast.error('Login with Google failed!', {
          autoClose: 1000,
        });
      }
    }
    getUserAuthInfo()
  }, [searchParams, router]);

  const renderForm = () => (
    <form onSubmit={handleLogin} className="space-y-4">
      {/* Email Input */}
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
      {/* Password Input */}
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
      {/* Forgot Password */}
      <div className="text-right !mt-1">
        <Link href="/auth/forgot-password" className="text-sm text-[#1A1D1F] font-bold">
          Forgot your password?
        </Link>
      </div>
      {/* Sign In Button */}
      <Button
        type="submit"
        color="primary"
        size="lg"
        className="w-full mt-4 rounded-lg bg-[#7f00ff] border-[#7f00ff]"
      >
        Sign in
      </Button>
    </form>
  );

  return (
    <div className="grid grid-cols-3 min-h-screen">
      {/* Left Side: Login Form */}
      <div className="col-span-1 bg-white flex items-center justify-center">
        <div className="login-form p-8 rounded-lg w-full max-w-sm h-3/4">
          <LogoAndTitle 
            title="Sign in"
            description=""
          />
          {renderForm()}
          {/* Divider */}
          <div className="my-6 text-gray-500 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-black text-sm">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          {/* Google Sign In Button */}
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
          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <span className="text-gray-500">Don&apos;t have an account? </span>
            <Link href="/auth/signup" color="secondary" className="text-empacts">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      {/* Right Side: Background with Content */}
      <div className="col-span-2 h-screen overflow-hidden relative bg-[#1A1D1F]">
        <Image
          src={EmpactsBg}
          alt="EMPACTS Background Image"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}

// Main page component with Suspense
const LoginPage = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<LoadingFallback />}>
        <LoginContent />
      </Suspense>
    </ProtectedRoute>
  );
};

export default LoginPage;