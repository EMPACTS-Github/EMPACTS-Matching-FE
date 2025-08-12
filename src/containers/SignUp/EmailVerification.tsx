'use client';
import React, { useState } from 'react';
import { addToast } from '@heroui/react';
import { verifyOTP } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/link';
import Image from 'next/image';
import OtpInput from '@/components/Input/OtpInput';
import ArrowLeftIcon from '/public/assets/arrow_left.svg';
import FormFooterAction from '@/components/Form/FormFooterAction';
import { API_RESPONSE_CODES, TOAST_TIMEOUT, TOAST_COLORS, TOAST_MESSAGES } from '@/constants/api';

function EmailVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const email = localStorage.getItem('email') || '';

  const handleSubmitOtp = async () => {
    if (email && otp) {
      try {
        const response = await verifyOTP(email, otp);
        if (response.code === API_RESPONSE_CODES.EMAIL_SUCCESSFULLY_VERIFIED) {
          addToast({
            title: TOAST_MESSAGES.OTP_VERIFIED_SUCCESS,
            color: TOAST_COLORS.SUCCESS,
            timeout: TOAST_TIMEOUT.MEDIUM,
          });
          router.replace(`${ROUTES.AUTH.SIGNUP}?stage=password`);
        } else if (response.code === API_RESPONSE_CODES.OTP_EXPIRED) {
          addToast({
            title: TOAST_MESSAGES.OTP_EXPIRED,
            color: TOAST_COLORS.DANGER,
            timeout: TOAST_TIMEOUT.MEDIUM,
          });
        } else if (response.code === API_RESPONSE_CODES.OTP_INCORRECT) {
          addToast({
            title: TOAST_MESSAGES.OTP_INCORRECT,
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
    }
  };

  const handleGoBack = () => {
    router.push(ROUTES.AUTH.SIGNUP);
  };

  const handleResendCode = () => {
    // TODO: Implement resend OTP functionality
  };

  return (
    <div className="text-center">
      <div className="flex flex-col items-center text-center">
        <div className="absolute left-10 hover:bg-gray-300 rounded-lg" onClick={handleGoBack}>
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
        A verification code has been sent to <strong>{email}</strong>. Please input your OTP code to
        finish the registration process.
      </p>
      <div className="flex justify-center space-x-2 mt-6">
        <OtpInput
          variant="otp-underline-lg"
          value={otp}
          onValueChange={setOtp}
          onComplete={handleSubmitOtp}
        />
      </div>
      <FormFooterAction
        text="Did not receive code?"
        action={
          <span className="text-purple-600 cursor-pointer" onClick={handleResendCode}>
            Resend code
          </span>
        }
      />
    </div>
  );
}

export default EmailVerification;
