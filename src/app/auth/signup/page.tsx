'use client';
import { useState, Suspense } from 'react';
import Image from 'next/image';
import EmpactsBg from '/public/empacts-bg.png';
import { Input, Button, addToast } from "@heroui/react";
import Link from 'next/link';
import { email_signup } from '@/apis/auth';
import VerificationScreen from '@/container/Auth/VerificationSreen';
import CreatePasswordScreen from '@/container/Auth/CreatePasswordScreen';
import RegisterInfoScreen from '@/container/Auth/RegisterInfoScreen';
import { useRouter } from 'next/navigation';
import LogoAndTitle from '@/components/Auth/LogoAndTitle';

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
import { useSearchParams } from 'next/navigation';
import { checkEmailFormat } from '@/utils/checkValid';

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentScreen = searchParams.get('stage');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [emailColor, setEmailColor] = useState<'default' | 'danger'>('default');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateEmailFormat = (email: string): boolean => {
    if (!checkEmailFormat(email)) {
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

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setHasSubmitted(true);
    const isEmailValid = validateEmailFormat(email);
    if (!isEmailValid) {
      addToast({
        title: 'Invalid email format',
        color: 'danger',
        timeout: 5000,
      })
      return;
    }
    try {
      const response = await email_signup(email);
      if (response.code == "VERIFICATION_EMAIL_SENT") {
        addToast({
          title: 'Verification code sent to your email',
          color: 'success',
          timeout: 3000,
        })
        localStorage.setItem('email', email);
        router.push('/auth/signup?stage=verification');
      } else {
        addToast({
          title: 'User already exist',
          color: 'danger',
          timeout: 5000,
        })
      }
    } catch (error) {
      addToast({
        title: 'An error occurred while signing up',
        color: 'danger',
        timeout: 5000,
      })
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSignup} className="space-y-4">
      <Input
        variant="underlined"
        size="lg"
        radius='none'
        label="Email"
        value={email}
        isInvalid={!isValidEmail}
        color={emailColor}
        errorMessage={emailError}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button
        type="submit"
        color="primary"
        size="lg"
        className="!text-white w-full rounded-lg bg-[#7f00ff] border-[#7f00ff]"
      >
        Sign up
      </Button>
    </form>
  );

  return (
    <div className="grid grid-cols-3 min-h-screen">
      {/* Left Side: Signup Form */}
      <div className="col-span-1 bg-white flex items-center justify-center">
        <div className="p-8 rounded-lg w-full max-w-sm h-3/4">
          {currentScreen == 'verification' ? (
            <VerificationScreen />
          ) : currentScreen == 'password' ? (
            <CreatePasswordScreen email={email} />
          ) : currentScreen == 'registerinfo' ? (
            <RegisterInfoScreen />
          ) : (
            <div>
              <LogoAndTitle 
                title="Sign up" 
                description=""
              />
              {renderForm()}
              {/* Sign In Link */}
              <div className="text-center mt-8">
                <span className="text-gray-500">Already have an account? </span>
                <Link href="/auth/login" color="secondary" className="text-empacts">
                  Sign in
                </Link>
              </div>
            </div>
          )}
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

// Main page component that uses Suspense
const SignupPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SignupContent />
    </Suspense>
  );
};

export default SignupPage;