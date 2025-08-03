'use client';
import { useEffect, useState } from 'react';
import { addToast } from "@heroui/react";
import { reset_password } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import PasswordInput from '@/components/FormInput/PasswordInput';
import AuthButton from '@/components/common/AuthButton';
import BackButton from '@/components/common/BackButton';
import LogoHeader from '@/components/common/LogoHeader';

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
  const [passwordDescription, setPasswordDescription] = useState('Password must contain at least 12 characters');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordColor, setPasswordColor] = useState<'default' | 'danger'>('default');
  const [confirmPasswordColor, setConfirmPasswordColor] = useState<'default' | 'danger'>('default');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 9) {
      setIsValidPassword(false);
      setPasswordError('Password must contain at least 9 characters');
      setPasswordColor('danger');
      addToast({
        title: 'Password must contain at least 9 characters',
        color: 'danger',
        timeout: 5000,
      });
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
      });
    } else {
      try {
        const response = await reset_password(email, password);
        if (response.code === "PASSWORD_RESETED") {
          addToast({
            title: 'Password reset successful',
            color: 'success',
            timeout: 3000,
          });
          setOpenResetPasswordScreen(false);
          router.push('/auth/login');
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
          title: 'An error occurred while resetting the password',
          color: 'danger',
          timeout: 5000,
        });
      }
    }
  };

  const handleGoBack = () => {
    setOpenResetPasswordScreen(false);
  };

  useEffect(() => {
    setPasswordError('');
    setPasswordDescription('');
    setIsValidPassword(true);
    setPasswordColor('default');
    setConfirmPasswordError('');
    setConfirmPasswordColor('default');
    setIsValidConfirmPassword(true);
  }, [password, confirmPassword]);

  return (
    <div>
      <div className="flex flex-col items-center text-center h-3/4">
        <BackButton onClick={handleGoBack} />
        <LogoHeader title="Create new password" />
      </div>
      <div className="flex justify-center space-x-2 mt-6">
        <form onSubmit={handleResetPassword} className="space-y-6 w-full max-w-xs">
          <PasswordInput
            value={password}
            onChange={setPassword}
            isInvalid={!isValidPassword}
            color={passwordColor}
            errorMessage={passwordError}
            description={passwordDescription}
            required
          />
          <PasswordInput
            value={confirmPassword}
            onChange={setConfirmPassword}
            label="Confirm Password"
            isInvalid={!isValidConfirmPassword}
            color={confirmPasswordColor}
            errorMessage={confirmPasswordError}
            required
          />
          <AuthButton type="submit">
            Reset Password
          </AuthButton>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
