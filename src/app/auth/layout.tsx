import React from 'react';
import Image from 'next/image';
import EmpactsBg from '/public/empacts-bg.png';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 min-h-screen">
      <div className="col-span-1">
        {children}
      </div>
      <div className="col-span-2 h-screen overflow-hidden relative bg-[#1A1D1F]">
        <Image
          src={EmpactsBg}
          alt="EMPACTS Background Image"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}

export default AuthLayout;
