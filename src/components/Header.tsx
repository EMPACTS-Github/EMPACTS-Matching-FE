'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Avatar } from '@heroui/react';
import AvatarPlaceholder from '/public/assets/avatar-placeholder.png';
import { useRouter } from 'next/navigation';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { Divider } from '@heroui/react';
import { Button } from '@heroui/button';
import PlusSquareIcon from '/public/assets/plus-square.svg';
import SoleLogoEmpacts from '/public/assets/sole-logo-empacts.svg';
import { logout } from '@/apis/auth';
import Link from 'next/link';
import { startup_list } from '@/apis/startup-profile';
import { mentor_list } from '@/apis/mentor-profile';
import { StartupOfUserResponse, MentorOfUserResponse } from '@/interfaces/StartupOfUser';
import ChevronSelectorVerticalIcon from '@/components/Icons/ChevronSelectorVerticalIcon';
import EmpactsLogoIcon from '@/components/Icons/EmpactsLogoIcon';

const PopoverContentItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-black hover:bg-slate-200 w-full px-1.5 py-1.5 rounded-lg transition-all">
      {children}
    </div>
  );
};

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [startups, setStartups] = useState<StartupOfUserResponse[]>([]);
  const [mentors, setMentors] = useState<MentorOfUserResponse[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  useEffect(() => {
    const user = localStorage.getItem('user') as string;
    const userAvatar = JSON.parse(user)?.avtUrl;
    setAvatarUrl(userAvatar);
    setIsLoggedIn(!!user);
    //api for get list_startup for user
    const fetchStartups = async () => {
      try {
        const startupData = await startup_list();
        setStartups(startupData.data); // Lưu danh sách startup vào state
        const mentorData = await mentor_list();
        setMentors(mentorData.data); // Lưu danh sách mentor vào state
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
    logout().then(() => {
      setIsLoggedIn(false);
      router.push('/');
    });
  };

  const renderAccountOptions = () => {
    return (
      <PopoverContent className="w-[200px] block">
        <div className="px-1 py-2 flex flex-col gap-1 items-start">
          {/* <Link className='text-black hover:bg-slate-200 w-full px-1.5 py-1.5 rounded-lg transition-all' href={'/'}>Account</Link> */}
          <Link
            className="text-black hover:bg-slate-200 w-full px-1.5 py-1.5 rounded-lg transition-all"
            href={'/'}
          >
            Setting
          </Link>
          <div
            onClick={handleLogout}
            className="cursor-pointer text-black hover:bg-slate-200 w-full px-1.5 py-1.5 rounded-lg transition-all"
          >
            Logout
          </div>
        </div>
      </PopoverContent>
    );
  };

  return (
    <header className="w-full bg-white flex justify-center py-3">
      <div className="flex-col gap-3 w-full">
        <nav className="w-full flex justify-between items-center xl:px-56 lg:px-48 md:px-32 sm:px-16 xs:px-8 px-4">
          <div className="flex items-center gap-3">
            <Button
              isIconOnly
              aria-label="LogoEmpactsIcon"
              onPress={handleBackToHome}
              className="w-36 p-1 bg-transparent"
              radius="md"
            >
              <EmpactsLogoIcon />
            </Button>
            <Popover placement="bottom" isOpen={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger className="p-1 rounded-full">
                <Button isIconOnly aria-label="Dropdown" variant="light">
                  <ChevronSelectorVerticalIcon className="text-secondary" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[380px] block">
                <div className="px-1 py-2 flex flex-col gap-1 items-start">
                  <PopoverContentItem>
                    <Link href="/profiles/new" onClick={() => setPopoverOpen(false)}>
                      <div className="flex items-center gap-2">
                        <Image src={PlusSquareIcon} alt="Plus Icon" width={20} height={20} />
                        <div className="text-sm">Create New Profile </div>
                      </div>
                    </Link>
                  </PopoverContentItem>
                  <PopoverContentItem>
                    <Link href="/" onClick={() => setPopoverOpen(false)}>
                      <div className="flex items-center gap-2">
                        <Image src={SoleLogoEmpacts} alt="Sole Logo" width={20} height={20} />
                        <div className="text-sm">Discover SDGs Startups</div>
                      </div>
                    </Link>
                  </PopoverContentItem>
                  <Divider />
                  <p className="text-small text-default-500">Mentor</p>
                  <div className="w-full max-h-40 overflow-y-auto">
                    {mentors.map((mentor) => (
                      <PopoverContentItem key={mentor.mentorId}>
                        <Link
                          href={`/mentor-detail/${mentor.mentorId}`}
                          onClick={() => setPopoverOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <Avatar
                              src={mentor.avtUrl}
                              alt="Logo"
                              size="sm"
                              className="bg-white"
                              radius="sm"
                            />
                            <div className="text-sm">{mentor.name}</div>
                          </div>
                        </Link>
                      </PopoverContentItem>
                    ))}
                  </div>
                  <Divider />
                  <p className="text-small text-default-500">Startup</p>
                  <div className="w-full max-h-40 overflow-y-auto">
                    {startups.map((startup) => (
                      <PopoverContentItem key={startup.startupId}>
                        <Link
                          href={`/startup-detail/${startup.startupId}`}
                          onClick={() => setPopoverOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <Avatar
                              src={startup.avtUrl}
                              alt="Logo"
                              size="sm"
                              className="bg-white"
                              radius="sm"
                            />
                            <div className="text-sm">{startup.name}</div>
                          </div>
                        </Link>
                      </PopoverContentItem>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-3">
                <Popover placement="bottom-end">
                  <PopoverTrigger>
                    <Avatar
                      src={avatarUrl}
                      size="sm"
                      radius="full"
                      className="bg-white"
                      color="primary"
                      isBordered
                    />
                  </PopoverTrigger>
                  {renderAccountOptions()}
                </Popover>
              </div>
            </>
          ) : (
            <Button
              color="primary"
              variant="bordered"
              onPress={handleLogin}
              radius="md"
              size="md"
              className="font-bold"
            >
              LOG IN
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
