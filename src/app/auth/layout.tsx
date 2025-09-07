import React from 'react';
import Image from 'next/image';
import EmpactsBg from '/public/empacts-bg.png';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='md:grid md:grid-cols-3 flex flex-col min-h-screen'>
      <div className='w-full md:col-span-1 flex flex-col flex-grow'>{children}</div>
      <div className='w-full col-span-2 md:h-screen overflow-hidden relative bg-secondary'>
        <Image
          src={EmpactsBg}
          alt='EMPACTS Background Image'
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}

export default AuthLayout;
