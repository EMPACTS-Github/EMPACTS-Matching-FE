'use client';
import React, { useState } from 'react';
import { addToast, Form } from '@heroui/react';
import { verifyOTP } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/link';
import EmpactsLogo from '/public/empacts-logo.png';
import Image from 'next/image';
import OtpInput from '@/components/Input/OtpInput';
import Button from '@/components/Button/Button';
import FormFooterAction from '@/components/Form/FormFooterAction';
import { API_RESPONSE_CODES, TOAST_TIMEOUT, TOAST_COLORS, TOAST_MESSAGES } from '@/constants/api';
import ArrowLeftIcon from '/public/assets/arrow_left.svg';

function EmailVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const email = localStorage.getItem('email') || '';

  const handleVerifyOTP = async () => {
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

  const ResendAction = () => (
    <span className="text-purple-600 cursor-pointer" onClick={handleResendCode}>
      Resend code
    </span>
  );

  return (
    <div className="text-center">
      <div className="flex flex-col items-center text-center">
        <div className="absolute left-10 hover:bg-gray-300 rounded-lg" onClick={handleGoBack}>
          <Image src={ArrowLeftIcon} alt="Arrow left icon" width={40} height={40} />
        </div>
        <Image
          src={EmpactsLogo}
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
      <FormFooterAction
        text="Did not receive code?"
        action={<ResendAction />}
      />
    </div>
  );
}

export default EmailVerification;
