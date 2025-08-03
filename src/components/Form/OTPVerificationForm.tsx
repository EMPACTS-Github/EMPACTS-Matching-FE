'use client';
import React from 'react';
import Image from 'next/image';
import { InputOtp } from '@heroui/react';
import ArrowLeftIcon from '/public/assets/arrow_left.svg';

interface OTPVerificationFormProps {
  email: string;
  otp: string;
  onOtpChange: (otp: string) => void;
  onSubmitOtp: () => void;
  onGoBack: () => void;
  onResendCode?: () => void;
}

function OTPVerificationForm({
  email,
  otp,
  onOtpChange,
  onSubmitOtp,
  onGoBack,
  onResendCode
}: OTPVerificationFormProps) {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center text-center">
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
        <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Verification code</h2>
      </div>
      <p className="text-gray-600">
        A verification code has been sent to <strong>{email}</strong>.
        Please input your OTP code to finish the registration process.
      </p>
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
        Did not receive code? 
        <span 
          className="text-purple-600 cursor-pointer" 
          onClick={onResendCode}
        >
          Resend code
        </span>
      </div>
    </div>
  );
}

export default OTPVerificationForm;
