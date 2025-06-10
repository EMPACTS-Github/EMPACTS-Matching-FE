'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import EmpactsLogoIcon from '@/components/Icons/EmpactsLogoIcon'
import FormTitle from '@/components/Form/FormTitle'
import { addToast, Button, Form, Input } from '@heroui/react'
import UserAvatar from '@/components/Form/UserAvatar'
import FormLabel from '@/components/Form/FormLabel'
import Link from 'next/link'
import { updateAttachment, uploadAttachemt } from '@/apis/upload'
import { create_new_profile } from '@/apis/auth'
import { useRouter } from 'next/navigation'
import { UPLOAD_OWNER_TYPE } from '@/constants/upload'

function RegisterInfo() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [uploadAvatarId, setUploadAvatarId] = useState('');

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      addToast({
        title: 'Uploading your avatar. Please wait',
        promise: new Promise((resolve, reject) => {
          if (e.target.files) {
            uploadAttachemt({
              file: e.target.files[0],
              ownerType: UPLOAD_OWNER_TYPE.USER,
            })
              .then(response => {
                setAvatarUrl(response.data.attachmentUrl);
                setUploadAvatarId(response.data.id)
                addToast({
                  title: 'Avatar uploaded',
                  timeout: 3000,
                })
                resolve(response);
              })
              .catch(err => {
                console.log(err);
                addToast({
                  title: 'An error occured while uploading avatar. Please try again.',
                  timeout: 3000,
                })
                reject(err);
              })
              .finally(() => {
                e.target.files = null
              });
          }
        })
      })
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = localStorage.getItem('email')
    const userProfileImgUrl = avatarUrl || 'https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/avatar_placeholder.png'
    if (email && username) {
      try {
        const response = await create_new_profile(email, userProfileImgUrl, username);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.removeItem('email');

        const hasInvitationStatus = localStorage.getItem('status');
        if (hasInvitationStatus) {
          const invitationCode = localStorage.getItem('invitationCode');
          const invitedEmail = localStorage.getItem('invitedEmail');
          if (invitedEmail === email) {
            router.push(`/startup-invitation?code=${invitationCode}&email=${invitedEmail}`);
          } else {
            router.replace('/profiles/new');
          }
        } else {
          router.replace('/profiles/new');
        }
        updateAttachment({
          id: uploadAvatarId,
          ownerType: UPLOAD_OWNER_TYPE.USER,
          ownerId: response.data.user.id
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

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

        <Button
          type="submit"
          color="primary"
          className="interceptor-loading w-4/5 rounded-lg bg-empacts border-empacts"
        >
          Sign up
        </Button>
      </Form>
      <div className="text-center mt-8">
        <span className="text-gray-500">Already have an account? </span>
        <Link href="/auth/login" color="secondary" className="text-empacts font-bold">
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default RegisterInfo