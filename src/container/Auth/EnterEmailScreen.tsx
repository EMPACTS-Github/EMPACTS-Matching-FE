'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { send_forgot_password_otp, verify_forgot_password_otp } from '@/apis/auth';
import { addToast, InputOtp } from '@heroui/react';
import ArrowLeftIcon from '/public/assets/arrow_left.svg';

const EnterEmailScreen = (props: {
  email: string,
  setEmailSent: (arg0: boolean) => void,
  setResetPasswordScreen: (arg0: boolean) => void,
  title: string,
  description: string
}) => {
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
      const response = await send_forgot_password_otp(props.email);
      if (response.code === "VERIFICATION_CODE_SENT") {
        addToast({
          title: 'Verification code sent successfully',
          color: 'success',
          timeout: 3000,
        })
        setIsResendDisabled(true);
      } else if (response.code === "EMAIL_ALREADY_SENT") {
        addToast({
          title: 'Email already sent. Please wait before requesting again.',
          color: 'danger',
          timeout: 5000,
        })
      } else {
        addToast({
          title: response.message,
          color: 'danger',
          timeout: 5000,
        })
      }
    } catch (error) {
      console.error(error);
      addToast({
        title: 'An error occurred while resending the code',
        color: 'danger',
        timeout: 5000,
      })
    }
  };

  const handleSubmitOtp = async () => {
    try {
      const response = await verify_forgot_password_otp(props.email, otp);
      if (response.code === "OTP_VERIFIED") {
        addToast({
          title: 'OTP code verified successfully',
          color: 'success',
          timeout: 3000,
        })
        props.setEmailSent(false);
        props.setResetPasswordScreen(true);
      } else if (response.code === "OTP_INCORRECT") {
        addToast({
          title: 'Incorrect OTP code. Please try again.',
          color: 'danger',
          timeout: 5000,
        })
      } else if (response.code === "OTP_EXPIRED") {
        addToast({
          title: 'OTP code has expired. Please request a new one.',
          color: 'danger',
          timeout: 5000,
        })
      } else {
        addToast({
          title: response.message,
          color: 'danger',
          timeout: 5000,
        })
      }
    } catch (error) {
      console.error(error);
      addToast({
        title: 'An error occurred while verifying the OTP',
        color: 'danger',
        timeout: 5000,
      })
    }
  };

  return (
    <div className="text-center">
      <div className="flex flex-col items-center text-center h-3/4">
        <div className="absolute left-10 hover:bg-gray-300 rounded-lg" onClick={() => props.setEmailSent(false)}>
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
        <h2 className="text-2xl font-bold mt-6 mb-6 text-black">{props.title}</h2>
      </div>
      <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: props.description }} />
      <div className="flex justify-center space-x-2 mt-6">
        <InputOtp
          length={6}
          value={otp}
          onValueChange={setOtp}
          onComplete={handleSubmitOtp}
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
            onClick={handleResendCode}
            className="text-purple-600 cursor-pointer"
          >
            Resend code
          </span>
        )}
      </div>
    </div>
  );
};

export default EnterEmailScreen;
