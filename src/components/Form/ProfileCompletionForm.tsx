'use client';
import React from 'react';
import { Button, Form, Input } from '@heroui/react';
import Link from 'next/link';
import EmpactsLogoIcon from '@/components/Icons/EmpactsLogoIcon';
import FormTitle from '@/components/Form/FormTitle';
import UserAvatar from '@/components/Form/UserAvatar';
import FormLabel from '@/components/Form/FormLabel';

interface ProfileCompletionFormProps {
  username: string;
  avatarUrl?: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function ProfileCompletionForm({
  username,
  avatarUrl,
  onUsernameChange,
  onAvatarChange,
  onSubmit
}: ProfileCompletionFormProps) {
  return (
    <div className='flex flex-col items-center justify-center gap-12 w-full'>
      <div>
        <Button
          isIconOnly
          aria-label="EMPACTS Logo Image"
          className='w-48 p-1 bg-transparent'
          radius='md'
        >
          <EmpactsLogoIcon />
        </Button>
      </div>
      <div>
        <FormTitle className='font-bold text-2xl text-black' text='Complete your profile' />
      </div>
      <Form
        className='flex flex-col items-center justify-center w-full gap-10'
        onSubmit={onSubmit}
      >
        <div className='flex flex-col items-center justify-center gap-3'>
          <UserAvatar
            handleAvatarChange={onAvatarChange}
            avatarUrl={avatarUrl}
          />
          <FormLabel className='text-black text-medium' text='Upload your profile picture' />
        </div>

        <Input
          variant="underlined"
          className='w-4/5'
          radius='none'
          label="Your name"
          value={username}
          onChange={onUsernameChange}
        />

        <Button
          type="submit"
          color="primary"
          className="interceptor-loading w-4/5 rounded-lg bg-empacts border-empacts"
        >
          Sign up
        </Button>
      </Form>
      <div className="text-center">
        <span className="text-gray-500">Already have an account? </span>
        <Link href="/auth/login" color="secondary" className="text-empacts font-bold">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default ProfileCompletionForm;
