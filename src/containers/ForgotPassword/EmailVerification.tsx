'use client';
import React, { useState, useEffect } from 'react';
import { addToast, Form } from '@heroui/react';
import { verifyForgotPasswordOTP } from '@/apis/auth';
import Image from 'next/image';
import OtpInput from '@/components/Input/OtpInput';
import Button from '@/components/Button/Button';
import { API_RESPONSE_CODES, TOAST_TIMEOUT, TOAST_COLORS, TOAST_MESSAGES } from '@/constants/api';
import ArrowLeftIcon from '/public/assets/arrow_left.svg';

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
  description,
}: EmailVerificationProps) {
  const [otp, setOtp] = useState('');
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

  const handleResendCode = () => {
    // TODO: Implement resend OTP functionality
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

  const LogoHeader = ({
    title,
    logoSrc = '/empacts-logo.png',
    logoWidth = 0,
    logoHeight = 0,
    titleClassName = 'text-2xl font-bold mt-6 mb-6 text-black',
  }: {
    title: string;
    logoSrc?: string;
    logoWidth?: number;
    logoHeight?: number;
    titleClassName?: string;
  }) => (
    <div className="flex flex-col items-center text-center">
      <Image
        src={logoSrc}
        alt="Logo"
        width={logoWidth}
        height={logoHeight}
        sizes="100vw"
        style={{ width: logoWidth === 0 ? '50%' : 'auto', height: 'auto' }}
        priority
      />
      <h2 className={titleClassName}>{title}</h2>
    </div>
  );

  const ResendCodeButton = ({
    isDisabled,
    countdown = 0,
    onClick,
    className = '',
  }: {
    isDisabled: boolean;
    countdown?: number;
    onClick: () => void;
    className?: string;
  }) => {
    const baseClasses = 'cursor-pointer';
    const disabledClasses = 'text-purple-400 cursor-not-allowed';
    const enabledClasses = 'text-purple-600';

    const finalClasses = `${baseClasses} ${isDisabled ? disabledClasses : enabledClasses} ${className}`;

    return (
      <span onClick={isDisabled ? undefined : onClick} className={finalClasses}>
        {isDisabled ? `Resend code(${countdown}s)` : 'Resend code'}
      </span>
    );
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await verifyForgotPasswordOTP(email, otp);
      if (response.code === API_RESPONSE_CODES.OTP_VERIFIED) {
        addToast({
          title: TOAST_MESSAGES.OTP_VERIFIED_SUCCESS,
          color: TOAST_COLORS.SUCCESS,
          timeout: TOAST_TIMEOUT.SHORT,
        });
        setEmailSent(false);
        setResetPasswordScreen(true);
      } else if (response.code === API_RESPONSE_CODES.OTP_INCORRECT) {
        addToast({
          title: TOAST_MESSAGES.OTP_INCORRECT,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.MEDIUM,
        });
      } else if (response.code === API_RESPONSE_CODES.OTP_EXPIRED) {
        addToast({
          title: TOAST_MESSAGES.OTP_EXPIRED,
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
        title: TOAST_MESSAGES.OTP_VERIFY_ERROR,
        color: TOAST_COLORS.DANGER,
        timeout: TOAST_TIMEOUT.MEDIUM,
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
      <Form
        className="flex flex-col items-center justify-center w-full gap-10"
        onSubmit={handleVerifyOTP}
      >
        <OtpInput
          value={otp}
          onValueChange={setOtp}
          onComplete={handleVerifyOTP}
          length={6}
          className="w-full max-w-xs"
        />
        <Button variant="primary-full" type="submit">Verify</Button>
      </Form>
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
