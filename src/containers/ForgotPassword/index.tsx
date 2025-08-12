'use client';
import { useState, useEffect, useCallback } from 'react';
import { addToast } from '@heroui/react';
import EmailVerification from '@/containers/ForgotPassword/EmailVerification';
import ResetPassword from '@/containers/ForgotPassword/ResetPassword';
import { useRouter, useSearchParams } from 'next/navigation';
import { sendForgotPasswordOTP } from '@/apis/auth';
import AuthHeader from '@/components/Header/AuthHeader';
import { ROUTES } from '@/constants/link';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import ArrowLeftIcon from '/public/assets/arrow_left.svg';
import Image from 'next/image';
import { checkEmailFormat } from '@/utils/checkValid';
import { API_RESPONSE_CODES, TOAST_TIMEOUT, TOAST_COLORS, TOAST_MESSAGES } from '@/constants/api';

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
    const isValid = checkEmailFormat(email);
    setEmailError(isValid ? '' : 'Invalid email format');
    setEmailColor(isValid ? 'default' : 'danger');
    setIsValidEmail(isValid);
    return isValid;
  }, []);

  const handleBackButton = () => {
    router.back();
  };

  const handleSentCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    const isEmailValid = email ? updateEmailValidation(email) : false;
    if (isEmailValid) {
      try {
        const response = await sendForgotPasswordOTP(email);
        if (response.code === API_RESPONSE_CODES.FORGOT_PASSWORD_EMAIL_SENT) {
          addToast({
            title: TOAST_MESSAGES.VERIFICATION_EMAIL_SENT,
            color: TOAST_COLORS.SUCCESS,
            timeout: TOAST_TIMEOUT.SHORT,
          });
          localStorage.setItem('email', email); // Store email in localStorage
          router.push(`${ROUTES.AUTH.FORGOT_PASSWORD}?stage=verification`);
        } else if (response.code === API_RESPONSE_CODES.EMAIL_ALREADY_SENT) {
          addToast({
            title: TOAST_MESSAGES.EMAIL_ALREADY_SENT,
            color: TOAST_COLORS.DANGER,
            timeout: TOAST_TIMEOUT.MEDIUM,
          });
        } else {
          addToast({
            title: response.message,
            color: TOAST_COLORS.DANGER,
            timeout: TOAST_TIMEOUT.MEDIUM,
          });
        }
      } catch (error) {
        addToast({
          title: TOAST_MESSAGES.FORGOT_PASSWORD_ERROR,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.MEDIUM,
        });
      }
    } else {
      addToast({
        title: TOAST_MESSAGES.INVALID_EMAIL_FORMAT,
        color: TOAST_COLORS.DANGER,
        timeout: TOAST_TIMEOUT.MEDIUM,
      });
    }
  };

  const BackButton = ({
    onClick,
    className = 'absolute left-10 hover:bg-gray-300 rounded-lg',
  }: {
    onClick: () => void;
    className?: string;
  }) => (
    <div className={className} onClick={onClick}>
      <Image src={ArrowLeftIcon} alt="Arrow left icon" width={40} height={40} />
    </div>
  );

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
    <div className="bg-white h-full flex justify-center">
      <div className="p-8 rounded-lg w-full max-w-sm flex flex-col justify-start mt-[30%]">
        <BackButton onClick={handleBackButton} />
        {currentScreen == 'verification' ? (
          <EmailVerification
            email={email}
            setEmailSent={() => {}}
            setResetPasswordScreen={() => router.push('/auth/forgot-password?stage=reset')}
            title="Verification code"
            description={`A verification code has been sent to <strong>${email}</strong>. Please input your OTP code to finish reset password.`}
          />
        ) : currentScreen == 'reset' ? (
          <ResetPassword email={email} setOpenResetPasswordScreen={() => {}} />
        ) : (
          <div className="space-y-[12.5%]">
            <AuthHeader
              title="Forgot password"
              description="Enter your email address and we will send you instructions to reset your password."
            />
            <form onSubmit={handleSentCode} className="space-y-4">
              <Input
                label="Email"
                variant="email"
                value={email}
                onChange={setEmail}
                isInvalid={!isValidEmail}
                color={emailColor}
                errorMessage={emailError}
                required
              />
              <Button variant="submit-lg-fullwidth" className="mt-4">
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
