'use client';
import { useEffect, useState } from 'react';
import { send_forgot_password_otp, verify_forgot_password_otp } from '@/apis/auth';
import { addToast } from '@heroui/react';
import ForgotPasswordOTPForm from '@/components/Form/ForgotPasswordOTPForm';

interface EmailVerificationProps {
  email: string;
  setEmailSent: (arg0: boolean) => void;
  setResetPasswordScreen: (arg0: boolean) => void;
  title: string;
  description: string;
}

function EmailVerification({
  email,
  setEmailSent,
  setResetPasswordScreen,
  title,
  description
}: EmailVerificationProps) {
  const [otp, setOtp] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isResendDisabled) {
      timer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev === 1) {
            setIsResendDisabled(false);
            clearInterval(timer!);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer!);
  }, [isResendDisabled]);

  const handleResendCode = async () => {
    try {
      const response = await send_forgot_password_otp(email);
      if (response.code === "FORGOT_PASSWORD_EMAIL_SENT") {
        addToast({
          title: 'Verification code sent successfully',
          color: 'success',
          timeout: 3000,
        });
        setIsResendDisabled(true);
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
        title: 'An error occurred while resending the code',
        color: 'danger',
        timeout: 5000,
      });
    }
  };

  const handleSubmitOtp = async () => {
    try {
      const response = await verify_forgot_password_otp(email, otp);
      if (response.code === "OTP_VERIFIED") {
        addToast({
          title: 'OTP code verified successfully',
          color: 'success',
          timeout: 3000,
        });
        setEmailSent(false);
        setResetPasswordScreen(true);
      } else if (response.code === "OTP_INCORRECT") {
        addToast({
          title: 'Incorrect OTP code. Please try again.',
          color: 'danger',
          timeout: 5000,
        });
      } else if (response.code === "OTP_EXPIRED") {
        addToast({
          title: 'OTP code has expired. Please request a new one.',
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
        title: 'An error occurred while verifying the OTP',
        color: 'danger',
        timeout: 5000,
      });
    }
  };

  const handleGoBack = () => {
    setEmailSent(false);
  };

  return (
    <ForgotPasswordOTPForm
      email={email}
      otp={otp}
      title={title}
      description={description}
      isResendDisabled={isResendDisabled}
      resendCountdown={resendCountdown}
      onOtpChange={setOtp}
      onSubmitOtp={handleSubmitOtp}
      onResendCode={handleResendCode}
      onGoBack={handleGoBack}
    />
  );
}

export default EmailVerification;
