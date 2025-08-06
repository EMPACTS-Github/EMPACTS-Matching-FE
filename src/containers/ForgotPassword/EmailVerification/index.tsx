'use client';
import { useEffect, useState } from 'react';
import { sendForgotPasswordOTP, verifyForgotPasswordOTP } from '@/apis/auth';
import { addToast } from '@heroui/react';
import { ROUTES } from '@/constants/routes';
import Input from '@/components/FormInput/Input';
import BackButton from '@/components/common/BackButton';
import LogoHeader from '@/components/common/LogoHeader';
import ResendCodeButton from '@/components/common/ResendCodeButton';

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
      const response = await sendForgotPasswordOTP(email);
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
      const response = await verifyForgotPasswordOTP(email, otp);
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
    <div className="text-center">
      <div className="flex flex-col items-center text-center h-3/4">
        <BackButton onClick={handleGoBack} />
        <LogoHeader title={title} />
      </div>
      <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: description }} />
      <div className="flex justify-center space-x-2 mt-6">
        <Input
          variant="otp"
          value={otp}
          onChange={setOtp}
          onComplete={handleSubmitOtp}
        />
      </div>
      <div className="text-gray-500 mt-4">
        Did not receive code? <span> </span>
        <ResendCodeButton
          isDisabled={isResendDisabled}
          countdown={resendCountdown}
          onClick={handleResendCode}
        />
      </div>
    </div>
  );
}

export default EmailVerification;
