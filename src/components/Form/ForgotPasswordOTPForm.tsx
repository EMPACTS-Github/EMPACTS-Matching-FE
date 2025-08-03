'use client';
import React from 'react';
import Image from 'next/image';
import { InputOtp } from '@heroui/react';
import ArrowLeftIcon from '/public/assets/arrow_left.svg';

interface ForgotPasswordOTPFormProps {
  email: string;
  otp: string;
  title: string;
  description: string;
  isResendDisabled: boolean;
  resendCountdown: number;
  onOtpChange: (otp: string) => void;
  onSubmitOtp: () => void;
  onResendCode: () => void;
  onGoBack: () => void;
}

function ForgotPasswordOTPForm({
  email,
  otp,
  title,
  description,
  isResendDisabled,
  resendCountdown,
  onOtpChange,
  onSubmitOtp,
  onResendCode,
  onGoBack
}: ForgotPasswordOTPFormProps) {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center text-center h-3/4">
        <div className="absolute left-10 hover:bg-gray-300 rounded-lg" onClick={onGoBack}>
          <Image src={ArrowLeftIcon} alt="Arrow left icon" width={40} height={40} />
        </div>
        <Image
          src="/empacts-logo.png"
          alt="Background image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '50%', height: 'auto' }}
          priority
        />
        <h2 className="text-2xl font-bold mt-6 mb-6 text-black">{title}</h2>
      </div>
      <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: description }} />
      <div className="flex justify-center space-x-2 mt-6">
        <InputOtp
          length={6}
          value={otp}
          onValueChange={onOtpChange}
          onComplete={onSubmitOtp}
          variant='underlined'
        />
      </div>
      <div className="text-gray-500 mt-4">
        Did not receive code? <span> </span>
        {isResendDisabled ? (
          <span className='text-purple-400 cursor-not-allowed'>
            Resend code({resendCountdown}s)
          </span>
        ) : (
          <span
            onClick={onResendCode}
            className="text-purple-600 cursor-pointer"
          >
            Resend code
          </span>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordOTPForm;
