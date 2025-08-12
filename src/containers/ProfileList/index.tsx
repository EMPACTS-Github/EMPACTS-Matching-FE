'use client';
import React, { useEffect, useState } from 'react';
import { Button, Tabs, Tab, Spinner } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { Startup } from '@/interfaces/startup';
import { Mentor } from '@/interfaces/mentor';
import ProfileCard from './ProfileCard';
import { startup_list } from '@/apis/startup-profile';
import { mentor_list } from '@/apis/mentor-profile';
import { Divider } from '@heroui/react';

const ProfileList = () => {
  const router = useRouter();
  const [startupProfileList, setStartupProfileList] = useState<Startup[]>([]);
  const [mentorProfileList, setMentorProfileList] = useState<Mentor[]>([]);
  const [isLoadingStartup, setIsLoadingStartup] = useState(false);
  const [isLoadingMentor, setIsLoadingMentor] = useState(false);

  const handleNavigateToCreateProfile = () => {
    router.push('/profiles/new');
  };

  const fetchStartupProfileList = async () => {
    setIsLoadingStartup(true);
    const response = await startup_list();
    const modifiedResponse = response.data.map((startupProfile: any) => {
      const startupDetail = startupProfile;
      return {
        id: startupDetail.startupId,
        name: startupDetail.name,
        avtUrl: startupDetail.avtUrl,
      };
    });
    setStartupProfileList(modifiedResponse);
    setIsLoadingStartup(false);
  };

  const fetchMentorProfileList = async () => {
    setIsLoadingMentor(true);
    const response = await mentor_list();
    const modifiedResponse = response.data.map((mentorProfile: any) => {
      const mentorDetail = mentorProfile;
      return {
        id: mentorDetail.mentorId,
        name: mentorDetail.name,
        avtUrl: mentorDetail.avtUrl,
      };
    });
    setMentorProfileList(modifiedResponse);
    setIsLoadingMentor(false);
  };

  useEffect(() => {
    fetchStartupProfileList();
    fetchMentorProfileList();
  }, []);

  return (
    <div className="max-w-lg w-full mx-auto mt-8 p-8 rounded-lg shadow-lg bg-white flex flex-col h-[70vh]">
      <div className="p-4 text-center mb-2">
        <h3 className="text-xl font-bold text-gray-800">Profile</h3>
        <p className="text-gray-500 text-sm">Access your desired profile</p>
      </div>

      <div className="flex-1  overflow-y-auto">
        <Tabs aria-label="Profile Tabs" variant="underlined">
          <Tab key="startups" title="Startups">
            {isLoadingStartup ? (
              <div className="p-4 h-full flex items-center justify-center">
                <Spinner color="primary" />
              </div>
            ) : startupProfileList.length != 0 ? (
              <div className="space-y-1">
                {startupProfileList.map((startup) => (
                  <div className="flex flex-col gap-1" key={startup.id}>
                    <ProfileCard key={startup.id} profile={startup} type="startup" />
                    <Divider className="w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 h-full flex items-center justify-center">
                <p className="text-sm text-gray-500">No startup profiles available yet.</p>
              </div>
            )}
          </Tab>

          <Tab key="mentors" title="Mentors">
            {isLoadingMentor ? (
              <div className="p-4 h-full flex items-center justify-center">
                <Spinner color="primary" />
              </div>
            ) : mentorProfileList.length != 0 ? (
              <div className="space-y-1">
                {mentorProfileList.map((mentor: Mentor) => (
                  <div className="flex flex-col gap-1" key={mentor.id}>
                    <ProfileCard key={mentor.id} profile={mentor} type="mentor" />
                    <Divider className="w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 h-full flex items-center justify-center">
                <p className="text-sm text-gray-500">No mentor profiles available yet.</p>
              </div>
            )}
          </Tab>
        </Tabs>
      </div>

      <div className="flex items-center justify-center my-6">
        <hr className="w-full border-gray-300" />
        <span className="absolute bg-white px-2 text-gray-500">OR</span>
      </div>
      <Button
        type="submit"
        color="primary"
        size="lg"
        className="w-full rounded-lg bg-primary border-primary text-white hover:bg-primary/80"
        onPress={() => handleNavigateToCreateProfile()}
      >
        Create new profile
      </Button>
    </div>
  );
};

export default ProfileList;
