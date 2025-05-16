'use client';
import { useState } from 'react';
import { Input, Button, addToast } from "@heroui/react";
import Image from 'next/image';
import { reset_password } from '@/apis/auth';
import ArrowLeftIcon from '/public/assets/arrow_left.svg';

const ResetPassword = (props: { email: string, setOpenResetPasswordScreen: (arg0: boolean) => void }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [passwordDescription, setPasswordDescription] = useState('Password must contain at least 12 characters');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordColor, setPasswordColor] = useState<'default' | 'danger'>('default');
  const [confirmPasswordColor, setConfirmPasswordColor] = useState<'default' | 'danger'>('default');

  const handleResetPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password.length < 12) {
      setIsValidPassword(false);
      setPasswordError('Password must contain at least 12 characters');
      setPasswordColor('danger');
      addToast({
        title: 'Password must contain at least 12 characters',
        color: 'danger',
        timeout: 5000,
      })
    } else if (password !== confirmPassword) {
      setPasswordError('');
      setPasswordDescription('');
      setIsValidPassword(false);
      setPasswordColor('danger');
      setIsValidConfirmPassword(false);
      setConfirmPasswordColor('danger');
      setConfirmPasswordError('Passwords do not match');
      addToast({
        title: 'Passwords do not match',
        color: 'danger',
        timeout: 5000,
      })
    } else {
      try {
        const response = await reset_password(props.email, password);
        if (response.code === "PASSWORD_RESETED") {
          addToast({
            title: 'Password reset successful',
            color: 'success',
            timeout: 3000,
          })
          props.setOpenResetPasswordScreen(false);
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
          title: 'An error occurred while resetting the password',
          color: 'danger',
          timeout: 5000,
        })
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center text-center h-3/4">
        <div className="absolute left-10 hover:bg-gray-300 rounded-lg" onClick={() => props.setOpenResetPasswordScreen(false)}>
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
        <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Create new password</h2>
      </div>
      <div className="flex justify-center space-x-2 mt-6">
        <form onSubmit={handleResetPassword} className="space-y-6 w-full max-w-xs">
          <Input
            variant='underlined'
            label="Password"
            type="password"
            radius='none'
            isInvalid={!isValidPassword}
            color={passwordColor}
            errorMessage={passwordError}
            description={passwordDescription}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            size="lg"
          />
          <Input
            variant='underlined'
            label="Confirm Password"
            type="password"
            radius='none'
            isInvalid={!isValidConfirmPassword}
            color={confirmPasswordColor}
            errorMessage={confirmPasswordError}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            size="lg"
          />
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full mt-4 rounded-lg bg-[#7f00ff] border-[#7f00ff]"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
