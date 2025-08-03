'use client';
import React, { useState } from 'react';
import { create_new_password } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { addToast } from "@heroui/react";
import Image from 'next/image';
import PasswordInput from '@/components/FormInput/PasswordInput';
import AuthButton from '@/components/common/AuthButton';
import AuthFormFooter from '@/components/common/AuthFormFooter';
import EmpactsLogo from '/public/empacts-logo.png';

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
        const response = await create_new_password(email, password);
        if (response.code === "PASSWORD_CREATED") {
          addToast({
            title: 'Password created successfully',
            color: 'success',
            timeout: 3000,
          });
          router.push('/auth/signup?stage=registerinfo');
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
        <PasswordInput
          value={password}
          onChange={setPassword}
        />
        <PasswordInput
          value={confirmPassword}
          onChange={setConfirmPassword}
          label="Confirm Password"
        />
        <AuthButton onClick={handleCreatePassword}>
          Sign up
        </AuthButton>
      </div>

      <AuthFormFooter
        text="Already have an account?"
        linkText="Sign in"
        linkHref="/auth/login"
      />
    </div>
  );
}

export default CreatePassword;
