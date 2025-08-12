'use client';
import React, { useState } from 'react';
import { createNewPassword } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { addToast } from '@heroui/react';
import { ROUTES } from '@/constants/link';
import Image from 'next/image';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import EmpactsLogo from '/public/empacts-logo.png';
import AuthLink from '@/components/AuthLink';
import FormFooterAction from '@/components/Form/FormFooterAction';
import { API_RESPONSE_CODES, TOAST_TIMEOUT, TOAST_COLORS, TOAST_MESSAGES } from '@/constants/api';

interface CreatePasswordProps {
  email?: string;
}

function CreatePassword({ email: propEmail }: CreatePasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const email = propEmail || localStorage.getItem('email');

  const handleCreatePassword = async () => {
    if (password !== confirmPassword) {
      addToast({
        title: TOAST_MESSAGES.PASSWORD_MISMATCH,
        color: TOAST_COLORS.DANGER,
        timeout: TOAST_TIMEOUT.MEDIUM,
      });
      return;
    }

    if (password && email) {
      try {
        const response = await createNewPassword(email, password);
        if (response.code === API_RESPONSE_CODES.PASSWORD_CREATED) {
          addToast({
            title: TOAST_MESSAGES.PASSWORD_CREATED_SUCCESS,
            color: TOAST_COLORS.SUCCESS,
            timeout: TOAST_TIMEOUT.SHORT,
          });
          router.push(`${ROUTES.AUTH.SIGNUP}?stage=registerinfo`);
        } else {
          addToast({
            title: response.message,
            color: TOAST_COLORS.DANGER,
            timeout: TOAST_TIMEOUT.MEDIUM,
          });
        }
      } catch (error) {
        addToast({
          title: TOAST_MESSAGES.PASSWORD_CREATE_ERROR,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.MEDIUM,
        });
      }
    }
  };

  return (
    <div className="text-center">
      <div className="flex flex-col items-center text-center">
        <Image src={EmpactsLogo} alt="EMPACTS Logo Image" priority width={120} height={120} />
        <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Sign up</h2>
      </div>
      <div className="space-y-4">
        <Input
          label="Password"
          variant="password"
          value={password}
          onChange={setPassword}
          preset="line-fill-sm"
          isRequired={true}
        />
        <Input
          variant="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          label="Confirm Password"
          preset="line-fill-sm"
          isRequired={true}
        />
        <Button onClick={handleCreatePassword} variant="primary-full">
          Continue
        </Button>
      </div>

      <FormFooterAction
        text="Already have an account?"
        action={
          <AuthLink href={ROUTES.AUTH.LOGIN} className="text-md font-semibold text-primary">
            Sign in
          </AuthLink>
        }
      />
    </div>
  );
}

export default CreatePassword;
