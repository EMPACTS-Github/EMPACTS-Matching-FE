import React from 'react';
import Image from 'next/image';
import { Button } from '@heroui/react';

interface GoogleSignInButtonProps {
  onPress: () => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

function GoogleSignInButton({
  onPress,
  size = 'lg',
  disabled = false
}: GoogleSignInButtonProps) {
  return (
    <Button
      onPress={onPress}
      size={size}
      disabled={disabled}
      className="w-full mt-2 flex justify-center items-center rounded-lg bg-[#F4F4F4] text-black"
    >
      <Image
        src="/google-icon.svg"
        alt="Google icon"
        width={20}
        height={20}
        className="mr-2"
      />
      Sign in with Google
    </Button>
  );
}

export default GoogleSignInButton;
