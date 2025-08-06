'use client';
import { useState, useEffect, useCallback } from 'react';
import { addToast } from "@heroui/react";
import EmailVerification from '@/containers/ForgotPassword/EmailVerification';
import ResetPassword from '@/containers/ForgotPassword/ResetPassword';
import { useRouter, useSearchParams } from 'next/navigation';
import { sendForgotPasswordOTP } from '@/apis/auth';
import AuthHeader from '@/components/Header/AuthHeader';
import { getEmailValidationState } from '@/utils/emailValidation';
import { ROUTES } from '@/constants/routes';
import Input from '@/components/FormInput/Input';
import Button from '@/components/Button/Button';
import BackButton from '@/components/common/BackButton';

function ForgotPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentScreen = searchParams.get('stage');
  const [email, setEmail] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [emailColor, setEmailColor] = useState<'default' | 'danger'>('default');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const updateEmailValidation = useCallback((email: string) => {
    const validation = getEmailValidationState(email);
    setEmailError(validation.error);
    setEmailColor(validation.color);
    setIsValidEmail(validation.isValid);
    return validation.isValid;
  }, []);

  const handleBackButton = () => {
    router.back()
  }

  const handleSentCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    const isEmailValid = email ? updateEmailValidation(email) : false;
    if (isEmailValid) {
      try {
        const response = await sendForgotPasswordOTP(email);
        if (response.code === "FORGOT_PASSWORD_EMAIL_SENT") {
          addToast({
            title: 'Verification code sent to your email',
            color: 'success',
            timeout: 3000,
          });
          localStorage.setItem('email', email); // Store email in localStorage
          router.push(`${ROUTES.AUTH.FORGOT_PASSWORD}?stage=verification`);
        } else if (response.code === "EMAIL_ALREADY_SENT") {
          addToast({
            title: 'Email already sent. Please wait 1 minutes before requesting again.',
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

    if (hasSubmitted && email) {
      updateEmailValidation(email);
    }
  }, [email, hasSubmitted, isValidEmail, updateEmailValidation]);



  return (
    <div className=" bg-white flex items-center justify-center h-full">
      <div className="p-8 rounded-lg w-full max-w-sm h-3/4">
        <BackButton onClick={handleBackButton} />
        {currentScreen == 'verification' ? (
          <EmailVerification
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
            <form onSubmit={handleSentCode} className="space-y-4">
              <Input
                variant="email"
                value={email}
                onChange={setEmail}
                isInvalid={!isValidEmail}
                color={emailColor}
                errorMessage={emailError}
                required
              />
              <Button type="submit" fullWidth color="primary" className="mt-4 rounded-lg bg-empacts border-empacts !text-white">
                Continue
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
