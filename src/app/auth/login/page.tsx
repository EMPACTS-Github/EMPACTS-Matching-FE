'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input, Button } from '@nextui-org/react';
import Link from 'next/link';
import EmpactsBg from '../../../../public/empacts-bg.png';
import EmpactsLogo from '../../../../public/empacts-logo.png';
import { Divider } from 'antd';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [emailColor, setEmailColor] = useState<'default' | 'danger'>('default');

  const [isValidPassword, setIsValidPassword] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [passwordColor, setPasswordColor] = useState<'default' | 'danger'>('default');

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

  // Mock Login Function for validating credentials
  const mockLogin = (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'test@example.com' && password === '123') {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: 'Invalid email or password' });
        }
      }, 1000);
    });
  };

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Validate email format before sending request
    const isEmailValid = validateEmailFormat(email);
    if (!isEmailValid) return;

    // Step 2: Send request and validate credentials
    const response = await mockLogin(email, password);

    if (!response.success) {
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
      console.log('Login successful:', { email, password });
    }
  };

  return (
    <div className="grid grid-cols-3 min-h-screen">
      {/* Left Side: Login Form */}
      <div className="col-span-1 bg-white flex items-center justify-center">
        <div className="login-form p-8 rounded-lg w-full max-w-sm h-3/4">
          <div className="flex flex-col items-center text-center">
            <Image
              src={EmpactsLogo}
              alt="EMPACTS Logo Image"
              priority
              width={120}
              height={120}
            />
            <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Sign in</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <Input
              variant="underlined"
              size="lg"
              label="Email"
              value={email}
              isInvalid={!isValidEmail}
              color={emailColor}
              errorMessage={emailError}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Password Input */}
            <Input
              variant="underlined"
              size="lg"
              type="password"
              label="Password"
              value={password}
              isInvalid={!isValidPassword}
              color={passwordColor}
              errorMessage={passwordError}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Divider */}
          <Divider className="my-6 text-gray-500">
            <span className="text-black text-sm">Or</span>
          </Divider>

          {/* Google Sign In Button */}
          <Button
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
};

export default LoginPage;
