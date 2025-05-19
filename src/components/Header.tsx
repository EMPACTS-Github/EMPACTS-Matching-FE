"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AvatarPlaceholder from '/public/assets/avatar-placeholder.png';
import { useRouter } from 'next/navigation';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@heroui/react";
import { Divider } from "@heroui/react";
import { Button } from "@heroui/button";
import PlusSquareIcon from '/public/assets/plus-square.svg';
import SoleLogoEmpacts from '/public/assets/sole-logo-empacts.svg';
import BellIcon from '/public/assets/bell_icon.svg';
import { logout } from '@/apis/auth';
import Link from 'next/link';
import { startup_list } from '@/apis/startup-profile';
import { StartupOfUser } from '@/interfaces/StartupOfUser'
import ChevronSelectorVerticalIcon from '@/components/Icons/ChevronSelectorVerticalIcon';
import EmpactsLogoIcon from '@/components/Icons/EmpactsLogoIcon';

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
      <div className='flex-col gap-3 w-full'>
        <nav className="w-full flex justify-between items-center xl:px-56 lg:px-48 md:px-32 sm:px-16 xs:px-8 px-4">
          <div className="flex items-center gap-3">
            <Button
              isIconOnly
              aria-label="LogoEmpactsIcon"
              onPress={handleBackToHome}
              className='w-36 p-1 bg-transparent'
              radius='md'
            >
              <EmpactsLogoIcon />
            </Button>
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
                <Popover placement="bottom-end">
                  <PopoverTrigger className="p-1 rounded-full">
                    <Button isIconOnly aria-label="Dropdown" variant="light">
                      <ChevronSelectorVerticalIcon className='text-empacts' />
                    </Button>
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
                            <Link href={`/startup-detail/${mentor.startup_id.id}`}>
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
                            <Link href={`/startup-detail/${startup.startup_id.id}`}>
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
                </Popover>
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
            <Button color="primary" variant="ghost" onPress={handleLogin} radius='md' size='md' className='font-bold'>
              LOG IN
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
