'use client';
import React, { useState } from 'react';
import { addToast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { updateAttachment, uploadAttachemt } from '@/apis/upload';
import { createNewProfile } from '@/apis/auth';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import { ROUTES, getStartupInvitationUrl, DEFAULT_AVATAR_URL } from '@/constants/routes';
import { Form, Input } from '@heroui/react';
import AuthFormFooter from '@/components/common/AuthFormFooter';
import EmpactsLogoIcon from '@/components/Icons/EmpactsLogoIcon';
import FormTitle from '@/components/Form/FormTitle';
import UserAvatar from '@/components/Form/UserAvatar';
import FormLabel from '@/components/Form/FormLabel';
import Button from '@/components/Button/Button';

function RegisterInfo() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [uploadAvatarId, setUploadAvatarId] = useState('');

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadResult = await uploadAttachemt({
        file: e.target.files[0],
        ownerType: UPLOAD_OWNER_TYPE.USER,
      });
      
      if (uploadResult.data.attachmentUrl) {
        setAvatarUrl(uploadResult.data.attachmentUrl);
        setUploadAvatarId(uploadResult.data.id);
        addToast({
          title: 'Avatar uploaded',
          timeout: 3000,
        });
      } else {
        addToast({
          title: 'An error occured while uploading avatar. Please try again.',
          timeout: 3000,
        });
      }
      e.target.files = null;
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = localStorage.getItem('email');
    const userProfileImgUrl = avatarUrl || DEFAULT_AVATAR_URL;
    
    if (email && username) {
      try {
        const response = await createNewProfile(email, userProfileImgUrl, username);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.removeItem('email');

        const hasInvitationStatus = localStorage.getItem('status');
        if (hasInvitationStatus) {
          const invitationCode = localStorage.getItem('invitationCode');
          const invitedEmail = localStorage.getItem('invitedEmail');
          if (invitedEmail === email) {
            router.push(getStartupInvitationUrl(invitationCode!, invitedEmail!));
          } else {
            router.replace(ROUTES.PROFILES.NEW);
          }
        } else {
          router.replace(ROUTES.PROFILES.NEW);
        }
        
        if (uploadAvatarId) {
          updateAttachment({
            id: uploadAvatarId,
            ownerType: UPLOAD_OWNER_TYPE.USER,
            ownerId: response.data.user.id
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-12 w-full'>
      <div>
        <div className='w-48 p-1 bg-transparent'>
          <EmpactsLogoIcon />
        </div>
      </div>
      <div>
        <FormTitle className='font-bold text-2xl text-black' text='Complete your profile' />
      </div>
      <Form
        className='flex flex-col items-center justify-center w-full gap-10'
        onSubmit={handleFormSubmit}
      >
        <div className='flex flex-col items-center justify-center gap-3'>
          <UserAvatar
            handleAvatarChange={handleAvatarChange}
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
          onChange={handleUsernameChange}
        />

        <Button type="submit" fullWidth color="primary" className="w-4/5 rounded-lg bg-empacts border-empacts !text-white">
          Sign up
        </Button>
      </Form>
      <AuthFormFooter
        text="Already have an account?"
        linkText="Sign in"
        linkHref={ROUTES.AUTH.LOGIN}
        linkClassName="font-bold"
      />
    </div>
  );
}

export default RegisterInfo; 
