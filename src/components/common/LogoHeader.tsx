import React from 'react';
import Image from 'next/image';

interface LogoHeaderProps {
  title: string;
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  titleClassName?: string;
}

function LogoHeader({
  title,
  logoSrc = '/empacts-logo.png',
  logoWidth = 0,
  logoHeight = 0,
  titleClassName = 'text-2xl font-bold mt-6 mb-6 text-black'
}: LogoHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <Image
        src={logoSrc}
        alt="Logo"
        width={logoWidth}
        height={logoHeight}
        sizes="100vw"
        style={{ width: logoWidth === 0 ? '50%' : 'auto', height: 'auto' }}
        priority
      />
      <h2 className={titleClassName}>{title}</h2>
    </div>
  );
}

export default LogoHeader;
