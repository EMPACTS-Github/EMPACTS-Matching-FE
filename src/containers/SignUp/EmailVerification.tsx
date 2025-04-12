'use client'
import { useState } from 'react';
import Image from 'next/image';
import { addToast, InputOtp } from '@heroui/react';
import ArrowLeftIcon from '/public/assets/arrow_left.svg';
import { verify_OTP } from '@/apis/auth';
import { useRouter } from 'next/navigation';

const EmailVerification = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const email = localStorage.getItem('email')

  const handleSubmitOtp = async () => {
    if (email && otp) {
      try {
        const response = await verify_OTP(email, otp);
        if (response.code === "EMAIL_SUCCESSFULLY_VERIFIED") {
          addToast({
            title: 'OTP code verified successfully',
            color: 'success',
            timeout: 5000,
          })
          router.replace('/auth/signup?stage=password');
        } else if (response.code === "OTP_EXPIRED") {
          addToast({
            title: 'OTP code has expired. Please request a new one.',
            color: 'danger',
            timeout: 5000,
          })
        } else if (response.code === "OTP_INCORRECT") {
          addToast({
            title: 'Incorrect OTP code. Please try again.',
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
    }
  }

  return (
    <div className="text-center">
      <div className="flex flex-col items-center text-center h-3/4">
        <div className="absolute left-10 hover:bg-gray-300 rounded-lg" onClick={() => router.push('/signup')}>
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
          onValueChange={setOtp}
          onComplete={handleSubmitOtp}
          variant='underlined'
        />
      </div>
      <div className="text-gray-500 mt-4">
        Did not receive code? <span className="text-purple-600 cursor-pointer">Resend code</span>
      </div>
    </div>
  )
}

export default EmailVerification;
