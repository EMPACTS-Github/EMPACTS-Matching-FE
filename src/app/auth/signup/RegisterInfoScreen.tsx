'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import EmpactsLogo from '../../../../public/empacts-logo.svg'
import FormTitle from '@/components/Form/FormTitle'
import { Button, Form, Input } from '@heroui/react'
import UserAvatar from '@/components/Form/UserAvatar'
import FormLabel from '@/components/Form/FormLabel'
import Link from 'next/link'
import { upload_image } from '@/apis/upload'
import { toast } from 'react-toastify'
import { create_new_profile } from '@/apis/auth'
import { useRouter } from 'next/navigation'

function RegisterInfoScreen() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      toast.promise(
        upload_image(e.target.files[0]),
        { pending: 'Uploading your avatar. Please wait' }
      ).then((response) => {
        toast.success('Avatar uploaded')
        setAvatarUrl(response.data.fileUrl);
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        e.target.files = null
      })
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = localStorage.getItem('email')
    const userProfileImgUrl = avatarUrl || 'https://www.svgrepo.com/show/452030/avatar-default.svg'
    if (email && username) {
      try {
        const response = await create_new_profile(email, userProfileImgUrl, username);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.replace('/');
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='flex flex-col items-center justify-center gap-12 w-full'>
      <div>
        <Image
          src={EmpactsLogo}
          alt="EMPACTS Logo Image"
          priority
          width={200}
          height={200}
        />
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
          className="interceptor-loading w-4/5 rounded-lg bg-[#7f00ff] border-[#7f00ff]"
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

export default RegisterInfoScreen