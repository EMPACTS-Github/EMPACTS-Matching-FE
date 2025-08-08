'use client';
import React, { useState } from 'react';
import { createNewPassword } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { addToast } from "@heroui/react";
import { ROUTES } from '@/constants/link';
import Image from 'next/image';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import EmpactsLogo from '/public/empacts-logo.png';
import AuthLink from '@/components/AuthLink';
import FormFooterAction from '@/components/FormFooterAction';

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
        title: 'Passwords do not match',
        color: 'danger',
        timeout: 5000,
      });
      return;
    }
    
    if (password && email) {
      try {
        const response = await createNewPassword(email, password);
        if (response.code === "PASSWORD_CREATED") {
          addToast({
            title: 'Password created successfully',
            color: 'success',
            timeout: 3000,
          });
          router.push(`${ROUTES.AUTH.SIGNUP}?stage=registerinfo`);
        } else {
          addToast({
            title: response.message,
            color: 'danger',
            timeout: 5000,
          });
        }
      } catch (error) {
        addToast({
          title: "An error occurred while creating the password",
          color: 'danger',
          timeout: 5000,
        });
      }
    }
  };

  return (
    <div className="text-center">
      <div className="flex flex-col items-center text-center">
        <Image
          src={EmpactsLogo}
          alt="EMPACTS Logo Image"
          priority
          width={120}
          height={120}
        />
        <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Sign up</h2>
      </div>
      <div className="space-y-4">
        <Input
          label="Password"
          variant="password"
          value={password}
          onChange={setPassword}
        />
        <Input
          variant="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          label="Confirm Password"
        />
        <Button 
          onClick={handleCreatePassword} 
          fullWidth 
          customVariant="primary" 
          customStyle="solid"
          className="rounded-lg"
        >
          Sign up
        </Button>
      </div>

      <FormFooterAction
        text="Already have an account?"
        action={<AuthLink href={ROUTES.AUTH.LOGIN}>Sign in</AuthLink>}
      />
    </div>
  );
}

export default CreatePassword; 
