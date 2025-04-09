"use client";

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import EmpactsLogo from '/public/empacts-logo.svg';
import AvatarPlaceholder from '/public/assets/avatar-placeholder.png';
import { useRouter } from 'next/navigation';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@heroui/react";
import { Divider } from "@heroui/react";
import DropdownIcon from '/public/assets/dropdown-icon.svg';
import PlusSquareIcon from '/public/assets/plus-square.svg';
import SoleLogoEmpacts from '/public/assets/sole-logo-empacts.svg';
import BellIcon from '/public/assets/bell_icon.svg';
import { logout } from '@/apis/auth';
import Link from 'next/link';
import { startup_list } from '@/apis/startup-profile';
import { StartupOfUser } from '@/utils/interfaces/StartupOfUser'

const PopoverContentItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='text-black hover:bg-slate-200 w-full px-1.5 py-1.5 rounded-lg transition-all'>
      {children}
    </div>
  )
}

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [startups, setStartups] = useState<StartupOfUser[]>([]);
  //example test (have to change MentorOfUser)
  const [mentors, setMentors] = useState<StartupOfUser[]>([])

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
    //api for get list_startup for user
    const fetchStartups = async () => {
      try {
        const data = await startup_list();
        setStartups(data.data); // Lưu danh sách startup vào state
        setMentors(data.data);
      } catch (error) {
        console.error('Failed to fetch startups:', error);
      }
    };

    if (isLoggedIn) {
      fetchStartups();
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    router.push('auth/login');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        setIsLoggedIn(false);
        router.push('/');
      })
  }



  const renderAccountOptions = () => {
    return (
      <PopoverContent className='w-[200px] block'>
        <div className='px-1 py-2 flex flex-col gap-1 items-start'>
          <Link className='text-black hover:bg-slate-200 w-full px-1.5 py-1.5 rounded-lg transition-all' href={'/'}>Account</Link>
          <Link className='text-black hover:bg-slate-200 w-full px-1.5 py-1.5 rounded-lg transition-all' href={'/'}>Setting</Link>
          <div onClick={handleLogout} className='cursor-pointer text-black hover:bg-slate-200 w-full px-1.5 py-1.5 rounded-lg transition-all'>Logout</div>
        </div>
      </PopoverContent>
    )
  }

  return (
    <header className="w-full bg-white flex justify-center py-3">
      <div className='flex-col gap-3 w-full max-w-5xl'>
        <nav className="w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              className='cursor-pointer'
              src={EmpactsLogo}
              alt="Logo"
              width={120}
              height={120}
              onClick={handleBackToHome}
            />
            {isLoggedIn && (
              <Popover>
                <PopoverTrigger className="p-1 rounded-full hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400">
                  <Image src={DropdownIcon} alt="Dropdown Icon" width={30} height={30} />
                </PopoverTrigger>
                <PopoverContent className='w-[380px] block'>
                  <div className='px-1 py-2 flex flex-col gap-1 items-start'>
                    <PopoverContentItem>
                      <Link href="/profiles/new">
                        <div className="flex items-center gap-2">
                          <Image src={PlusSquareIcon} alt="Plus Icon" width={20} height={20} />
                          <div className='text-sm'>Create New Profile </div>
                        </div>
                      </Link>
                    </PopoverContentItem>
                    <PopoverContentItem>
                      <Link href="/">
                        <div className="flex items-center gap-2">
                          <Image src={SoleLogoEmpacts} alt="Sole Logo" width={20} height={20} />
                          <div className='text-sm'>Discover SDGs Startups</div>
                        </div>
                      </Link>
                    </PopoverContentItem>
                    <Divider />
                    <p className="text-small text-default-500">Mentor</p>
                    <div className="w-full max-h-40 overflow-y-auto"> {/* Giới hạn chiều cao và cho phép cuộn */}
                      {/* //example only (have to change to real mentor attributes) */}
                      {mentors.map((mentor) => (
                        <PopoverContentItem key={mentor.startup_id.id}>
                          <Link href={`/startup-profile/${mentor.startup_id.id}`}>
                            <div className="flex items-center gap-2">
                              <Image src={mentor.startup_id.avt_url} alt="Logo" width={20} height={20} />
                              <div className="text-sm">{mentor.startup_id.name}</div>
                            </div>
                          </Link>
                        </PopoverContentItem>
                      ))}
                    </div>
                    <Divider />
                    <p className="text-small text-default-500">Startup</p>
                    <div className="w-full max-h-40 overflow-y-auto"> {/* Giới hạn chiều cao và cho phép cuộn */}
                      {startups.map((startup) => ( // Giới hạn tổng mentors + startups tối đa 10 mục
                        <PopoverContentItem key={startup.startup_id.id}>
                          <Link href={`/startup-profile/${startup.startup_id.id}`}>
                            <div className="flex items-center gap-2">
                              <Image src={startup.startup_id.avt_url} alt="Logo" width={20} height={20} />
                              <div className="text-sm">{startup.startup_id.name}</div>
                            </div>
                          </Link>
                        </PopoverContentItem>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>)}
          </div>
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-3">
                <Image
                  src={BellIcon}
                  alt="Notifications"
                  width={28}
                  height={28}
                  className="cursor-pointer"
                />
                <Popover>
                  <PopoverTrigger>
                    <Image
                      src={AvatarPlaceholder}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="rounded-full cursor-pointer"
                    />
                  </PopoverTrigger>
                  {renderAccountOptions()}
                </Popover>
              </div>
            </>
          ) : (
            <button
              className="border-2 border-gray-300 rounded-md px-6 py-2 text-gray-600 hover:bg-gray-100"
              onClick={handleLogin}
            >
              LOG IN
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
