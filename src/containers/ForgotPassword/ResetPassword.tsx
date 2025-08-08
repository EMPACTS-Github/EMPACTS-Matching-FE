'use client';
import { useEffect, useState } from 'react';
import { addToast } from "@heroui/react";
import { resetPassword } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/link';
import Input from '@/components/FormInput/Input';
import Button from '@/components/Button/Button';
import Image from 'next/image';
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
  const [passwordDescription, setPasswordDescription] = useState('Password must contain at least 12 characters');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordColor, setPasswordColor] = useState<'default' | 'danger'>('default');
  const [confirmPasswordColor, setConfirmPasswordColor] = useState<'default' | 'danger'>('default');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!isValidPassword) return;

    try {
      const response = await resetPassword(email, password);
      if (response.code === "RESET_PASSWORD") {
        addToast({
          title: 'Password reset successfully',
          color: 'success',
        });
        router.push(ROUTES.AUTH.LOGIN);
      } else {
        addToast({
          title: response.message || 'Failed to reset password',
          color: 'danger',
          timeout: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      addToast({
        title: 'An error occurred while resetting password',
        color: 'danger',
        timeout: 5000,
      });
    }
  };

  const handleGoBack = () => {
    setOpenResetPasswordScreen(false);
  };

  const BackButton = ({ onClick, className = 'absolute left-10 hover:bg-gray-300 rounded-lg' }: { onClick: () => void; className?: string }) => (
    <div className={className} onClick={onClick}>
      <Image src={ArrowLeftIcon} alt="Arrow left icon" width={40} height={40} />
    </div>
  );

  const LogoHeader = ({ title, logoSrc = '/empacts-logo.png', logoWidth = 0, logoHeight = 0, titleClassName = 'text-2xl font-bold mt-6 mb-6 text-black' }: { title: string; logoSrc?: string; logoWidth?: number; logoHeight?: number; titleClassName?: string }) => (
    <div className="flex flex-col items-center text-center">
      <Image
        src={logoSrc}
        alt="Logo"
        width={logoWidth}
        height={logoHeight}
        sizes="100vw"
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
          <Input
            variant="password"
            value={password}
            onChange={setPassword}
            isInvalid={!isValidPassword}
            color={passwordColor}
            errorMessage={passwordError}
            description={passwordDescription}
            required
          />
          <Input
            variant="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            label="Confirm Password"
            isInvalid={!isValidConfirmPassword}
            color={confirmPasswordColor}
            errorMessage={confirmPasswordError}
            required
          />
          <Button type="submit" fullWidth color="primary" className="rounded-lg bg-empacts border-empacts !text-white">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
