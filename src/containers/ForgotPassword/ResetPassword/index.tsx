'use client';
import { useEffect, useState } from 'react';
import { addToast } from "@heroui/react";
import { reset_password } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import ForgotPasswordResetForm from '@/components/Form/ForgotPasswordResetForm';

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
    <ForgotPasswordResetForm
      password={password}
      confirmPassword={confirmPassword}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onSubmit={handleResetPassword}
      onGoBack={handleGoBack}
      isValidPassword={isValidPassword}
      isValidConfirmPassword={isValidConfirmPassword}
      passwordError={passwordError}
      passwordDescription={passwordDescription}
      confirmPasswordError={confirmPasswordError}
      passwordColor={passwordColor}
      confirmPasswordColor={confirmPasswordColor}
    />
  );
}

export default ResetPassword;
