'use client';
import React, { useState } from 'react';
import { addToast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { updateAttachment, uploadAttachemt, uploadProfilePicture } from '@/apis/upload';
import { createNewProfile } from '@/apis/auth';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import { ROUTES, getStartupInvitationUrl, DEFAULT_AVATAR_URL } from '@/constants/link';
import { Form } from '@heroui/react';
import Input from '@/components/Input/Input';
import EmpactsLogoIcon from '@/components/Icons/EmpactsLogoIcon';
import FormTitle from '@/components/Form/FormTitle';
import UserAvatar from '@/components/Form/UserAvatar';
import FormLabel from '@/components/Form/FormLabel';
import Button from '@/components/Button/Button';
import AuthLink from '@/components/AuthLink';
import FormFooterAction from '@/components/Form/FormFooterAction';
import { TOAST_TIMEOUT, TOAST_COLORS, TOAST_MESSAGES } from '@/constants/api';

function RegisterInfo() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>('');
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (profilePictureUrl) {
      URL.revokeObjectURL(profilePictureUrl);
    }
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setProfilePictureUrl(fileUrl);
      setProfilePictureFile(file);
      setAvatarUrl(fileUrl);
      e.target.files = null;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = localStorage.getItem('email');
    let uploadAvatarId: string = '';
    let userProfileImgUrl = '';

    if (profilePictureFile) {
      try {
        const uploadAvatarResult: any = await uploadProfilePicture(profilePictureFile, 'USER');
        uploadAvatarId = uploadAvatarResult.data.id;
        userProfileImgUrl = uploadAvatarResult.data.attachmentUrl;
      } catch (error) {
        addToast({
          title: 'Error uploading image',
          color: 'danger',
          timeout: 3000,
        });
        return;
      }
    }

    if (email && username) {
      try {
        const requestBody = {
          avtUrl: userProfileImgUrl || DEFAULT_AVATAR_URL,
          email,
          name: username,
        };
        const response = await createNewProfile(requestBody);
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
            ownerId: response.data.user.id,
          });
        }
      } catch (error) {
        addToast({
          title: TOAST_MESSAGES.PROFILE_CREATE_ERROR,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.SHORT,
        });
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
          <UserAvatar handleAvatarChange={handleAvatarChange} avatarUrl={avatarUrl} />
          <FormLabel className='text-black text-medium' text='Upload your profile picture' />
        </div>

        <Input
          className='w-4/5'
          label='Your name'
          value={username}
          onChange={setUsername}
          errorMessage='Please enter your name'
          variant='text'
          preset='line-fill-sm'
          isRequired={true}
        />

        <Button variant='primary-full' className='w-4/5' type='submit'>
          Sign up
        </Button>
      </Form>
      <FormFooterAction
        text='Already have an account?'
        action={
          <AuthLink href={ROUTES.AUTH.LOGIN} className='text-md font-semibold text-primary'>
            Sign in
          </AuthLink>
        }
      />
    </div>
  );
}

export default RegisterInfo;
