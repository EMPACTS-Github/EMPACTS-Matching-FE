'use client';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  message: string;
};

const InvitationStatus = ({ message }: Props) => {
  const router = useRouter();

  const handleReturnToHome = () => {
    localStorage.removeItem('inviteeEmail');
    localStorage.removeItem('invitationCode');
    localStorage.removeItem('status');
    router.replace('/');
  };

  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="rounded-xl p-8 bg-white flex flex-col gap-2 justify-center items-center">
        <p className="text-xl text-center font-[600] text-[#09090B]">
          {message} Please ask your inviter to resend the invitation
        </p>
        <Button
          onPress={handleReturnToHome}
          variant="solid"
          className="bg-empacts rounded-lg pl-6 pr-6 text-white"
        >
          Return to home
        </Button>
      </div>
    </div>
  );
};

export default InvitationStatus;
