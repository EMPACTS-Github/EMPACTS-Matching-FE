'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Button, addToast } from "@heroui/react";
import EnterEmail from '@/containers/ForgotPassword/EnterEmail';
import ResetPassword from '@/containers/ForgotPassword/ResetPassword';
import ArrowLeftIcon from '/public/assets/arrow_left.svg';
import { useRouter, useSearchParams } from 'next/navigation';
import { send_forgot_password_otp } from '@/apis/auth';
import AuthHeader from '@/components/Header/AuthHeader';
import { checkEmailFormat } from '@/utils/checkValid';

function ForgotPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentScreen = searchParams.get('stage');
  const [email, setEmail] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [emailColor, setEmailColor] = useState<'default' | 'danger'>('default');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Function to validate email format
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

  const handleBackButton = () => {
    router.back()
  }

  const handleSentCode = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setHasSubmitted(true);
    const isEmailValid = validateEmailFormat(email);
    if (isEmailValid) {
      try {
        const response = await send_forgot_password_otp(email);
        if (response.code === "VERIFICATION_CODE_SENT") {
          addToast({
            title: 'Verification code sent to your email',
            color: 'success',
            timeout: 3000,
          });
          localStorage.setItem('email', email); // Store email in localStorage
          router.push('/auth/forgot-password?stage=verification');
        } else if (response.code === "EMAIL_ALREADY_SENT") {
          addToast({
            title: 'Email already sent. Please wait before requesting again.',
            color: 'danger',
            timeout: 5000,
          });
        } else {
          addToast({
            title: response.message,
            color: 'danger',
            timeout: 5000,
          });
        }
      } catch (error) {
        console.error(error);
        addToast({
          title: 'An error occurred while sending the verification code',
          color: 'danger',
          timeout: 5000,
        });
      }
    } else {
      addToast({
        title: 'Invalid email format',
        color: 'danger',
        timeout: 5000,
      });
    }
  };

  useEffect(() => {
    // Get email from localStorage if available
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }

    if (hasSubmitted && !isValidEmail) {
      validateEmailFormat(email);
    }
  }, [email, hasSubmitted, isValidEmail]);

  const renderForm = () => (
    <form onSubmit={handleSentCode} className="space-y-4">
      <Input
        variant='underlined'
        fullWidth
        radius='none'
        size="lg"
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
        className="!text-white w-full mt-4 rounded-lg bg-[#7f00ff] border-[#7f00ff]"
      >
        Continue
      </Button>
    </form>
  );

  return (
    <div className=" bg-white flex items-center justify-center h-full">
      <div className="p-8 rounded-lg w-full max-w-sm h-3/4">
        <div className="absolute left-10 hover:bg-gray-300 rounded-lg" onClick={handleBackButton}>
          <Image src={ArrowLeftIcon} alt="Arrow left icon" width={40} height={40} />
        </div>
        {currentScreen == 'verification' ? (
          <EnterEmail
            email={email}
            setEmailSent={() => { }}
            setResetPasswordScreen={() => router.push('/auth/forgot-password?stage=reset')}
            title="Verification code"
            description={`A verification code has been sent to <strong>${email}</strong>. Please input your OTP code to finish reset password.`}
          />
        ) : currentScreen == 'reset' ? (
          <ResetPassword email={email} setOpenResetPasswordScreen={() => { }} />
        ) : (
          <div>
            <AuthHeader
              title="Forgot password"
              description="Enter your email address and we will send you instructions to reset your password."
            />
            {renderForm()}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;