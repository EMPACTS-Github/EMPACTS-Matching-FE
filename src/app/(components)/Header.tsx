"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import EmpactsLogo from '/public/empacts-logo.svg';
import AvatarPlaceholder from '/public/assets/avatar-placeholder.png';
import { useRouter } from 'next/navigation';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@heroui/react";

import DropdownIcon from '/public/assets/dropdown-icon.svg'; 
import PlusSquareIcon from '/public/assets/plus-square.svg';
import SoleLogoEmpacts from '/public/assets/sole-logo-empacts.svg';
import BellIcon from '/public/assets/bell_icon.svg';

interface HeaderProps {
  onLogin?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogin = () => {
    // onLogin();
    router.push('auth/login');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <header className="w-full bg-white flex justify-center py-3">
      <nav className="w-full max-w-5xl flex justify-between items-center px-10">
        <div className="flex items-center gap-3">
          <Image 
            className='cursor-pointer'
            src={EmpactsLogo} 
            alt="Logo" 
            width={120} 
            height={120} 
            onClick={handleBackToHome}
          />
          <Dropdown>
            <DropdownTrigger className="p-1 rounded-full hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400">
              <Image src={DropdownIcon} alt="Dropdown Icon" width={30} height={30} />
            </DropdownTrigger>
            <DropdownMenu itemClasses={{
              base: [
                "h-10",
                "text-black",
                "font-semibold",
                "text-base",
              ]
            }}>
              <DropdownItem key="new-profile">
                <div className="flex items-center gap-2">
                  <Image src={PlusSquareIcon} alt="Plus Icon" width={20} height={20} />
                  <div className='text-sm'>Create New Profile </div>
                </div>
              </DropdownItem>
              <DropdownItem key="discover-sdgs">
                <div className="flex items-center gap-2">
                  <Image src={SoleLogoEmpacts} alt="Sole Logo" width={20} height={20} />
                  <div className='text-sm'>Discover SDGs Startups</div>
                </div>
              </DropdownItem>
              <DropdownItem key="option3">Option 3</DropdownItem>
              <DropdownItem key="option4">Option 4</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <Image 
              src={BellIcon} 
              alt="Notifications" 
              width={28} 
              height={28} 
              className="cursor-pointer"
            />
            <Dropdown>
              <DropdownTrigger>
                <Image 
                  src={AvatarPlaceholder} 
                  alt="Avatar" 
                  width={40} 
                  height={40} 
                  className="rounded-full cursor-pointer"
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="profile" className='text-black'>Profile</DropdownItem>
                <DropdownItem key="settings" className='text-black'>Settings</DropdownItem>
                <DropdownItem key="logout" className='text-black'>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        ) : (
          <button 
            className="border-2 border-gray-300 rounded-md px-6 py-2 text-gray-600 hover:bg-gray-100"
            onClick={handleLogin}
          >
            LOG IN
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
