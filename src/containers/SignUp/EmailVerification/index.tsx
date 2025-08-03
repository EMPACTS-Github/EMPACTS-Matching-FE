'use client';
import React, { useState } from 'react';
import { addToast } from '@heroui/react';
import { verify_OTP } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import OTPVerificationForm from '@/components/Form/OTPVerificationForm';

function EmailVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const email = localStorage.getItem('email') || '';

  const handleSubmitOtp = async () => {
    if (email && otp) {
      try {
        const response = await verify_OTP(email, otp);
        if (response.code === "EMAIL_SUCCESSFULLY_VERIFIED") {
          addToast({
            title: 'OTP code verified successfully',
            color: 'success',
            timeout: 5000,
          });
          router.replace('/auth/signup?stage=password');
        } else if (response.code === "OTP_EXPIRED") {
          addToast({
            title: 'OTP code has expired. Please request a new one.',
            color: 'danger',
            timeout: 5000,
          });
        } else if (response.code === "OTP_INCORRECT") {
          addToast({
            title: 'Incorrect OTP code. Please try again.',
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
    }
  };

  const handleGoBack = () => {
    router.push('/auth/signup');
  };

  const handleResendCode = () => {
    // TODO: Implement resend OTP functionality
    addToast({
      title: 'Resend code functionality not implemented yet',
      color: 'warning',
      timeout: 3000,
    });
  };

  return (
    <OTPVerificationForm
      email={email}
      otp={otp}
      onOtpChange={setOtp}
      onSubmitOtp={handleSubmitOtp}
      onGoBack={handleGoBack}
      onResendCode={handleResendCode}
    />
  );
}

export default EmailVerification;
