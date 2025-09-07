'use client';
import React, { useState, useEffect } from 'react';
import { addToast, Form } from '@heroui/react';
import { resetPassword } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/link';
import Image from 'next/image';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { API_RESPONSE_CODES, TOAST_TIMEOUT, TOAST_COLORS, TOAST_MESSAGES } from '@/constants/api';
import ArrowLeftIcon from '/public/assets/arrow_left.svg';

interface ResetPasswordProps {
  email: string;
  setOpenResetPasswordScreen: (arg0: boolean) => void;
}

function ResetPassword({ email, setOpenResetPasswordScreen }: ResetPasswordProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [passwordDescription, setPasswordDescription] = useState(
    'Password must contain at least 12 characters'
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!isValidPassword) return;

    try {
      const response = await resetPassword(email, password);
      if (response.code === API_RESPONSE_CODES.RESET_PASSWORD) {
        addToast({
          title: TOAST_MESSAGES.PASSWORD_RESET_SUCCESS,
          color: TOAST_COLORS.SUCCESS,
        });
        router.push(ROUTES.AUTH.LOGIN);
      } else {
        addToast({
          title: response.message || TOAST_MESSAGES.PASSWORD_RESET_FAILED,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.MEDIUM,
        });
      }
    } catch (error) {
      addToast({
        title: TOAST_MESSAGES.PASSWORD_RESET_ERROR,
        color: TOAST_COLORS.DANGER,
        timeout: TOAST_TIMEOUT.MEDIUM,
      });
    }
  };

  const handleGoBack = () => {
    setOpenResetPasswordScreen(false);
  };

  const BackButton = ({
    onClick,
    className = 'absolute left-10 hover:bg-gray-300 rounded-lg',
  }: {
    onClick: () => void;
    className?: string;
  }) => (
    <div className={className} onClick={onClick}>
      <Image src={ArrowLeftIcon} alt='Arrow left icon' width={40} height={40} />
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
    <div className='flex flex-col items-center text-center'>
      <Image
        src={logoSrc}
        alt='Logo'
        width={logoWidth}
        height={logoHeight}
        sizes='100vw'
        style={{ width: logoWidth === 0 ? '50%' : 'auto', height: 'auto' }}
        priority
      />
      <h2 className={titleClassName}>{title}</h2>
    </div>
  );

  useEffect(() => {
    setPasswordError('');
    setPasswordDescription('');
    setIsValidPassword(true);
    setConfirmPasswordError('');
    setIsValidConfirmPassword(true);
  }, [password, confirmPassword]);

  return (
    <div>
      <div className='flex flex-col items-center text-center h-3/4'>
        <BackButton onClick={handleGoBack} />
        <LogoHeader title='Create new password' />
      </div>
      <div className='flex justify-center space-x-2 mt-6'>
        <Form
          className='flex flex-col items-center justify-center w-full gap-10'
          onSubmit={handleResetPassword}
        >
          <Input
            label='Password'
            variant='password'
            value={password}
            onChange={setPassword}
            isInvalid={!isValidPassword}
            preset='line-fill-sm'
            errorMessage={passwordError}
            description={passwordDescription}
            isRequired
          />
          <Input
            label='Confirm Password'
            variant='password'
            value={confirmPassword}
            onChange={setConfirmPassword}
            isInvalid={!isValidConfirmPassword}
            preset='line-fill-sm'
            errorMessage={confirmPasswordError}
            isRequired
          />
          <Button variant='primary-full'>Reset Password</Button>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
