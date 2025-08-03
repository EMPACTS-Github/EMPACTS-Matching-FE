'use client';
import React, { useState } from 'react';
import { create_new_password } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { addToast } from "@heroui/react";
import PasswordCreationForm from '@/components/Form/PasswordCreationForm';

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
    <PasswordCreationForm
      password={password}
      confirmPassword={confirmPassword}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onSubmit={handleCreatePassword}
    />
  );
}

export default CreatePassword;
