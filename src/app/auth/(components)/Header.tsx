"use client";

import React from 'react';
import Image from 'next/image';
import EmpactsLogo from '../../../../public/empacts-logo.svg';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onLogin?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogin = () => alert('Login clicked!') }) => {
  const router = useRouter();
  const handleLogin = () => {
    onLogin();
    router.push('auth/login');
  }
  return (
    <header className="w-full bg-white flex justify-center py-3">
      <nav className="w-full max-w-5xl flex justify-between items-center px-10">
        <div className="flex items-center gap-3">
          <Image 
            src={EmpactsLogo} 
            alt="Logo" 
            width={120} 
            height={120} 
          />
        </div>
        <button 
          className="border-2 border-gray-300 rounded-md px-6 py-2 text-gray-600 hover:bg-gray-100"
          onClick={handleLogin}
        >
          LOG IN
        </button>
      </nav>
    </header>
  );
};

export default Header;
