"use client";
import React, { useEffect, useState } from "react";
import { Button, Tabs, Tab } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Startup } from "@/interfaces/startup";
import ProfileCard from "./ProfileCard";
import { startup_list } from "@/apis/startup-profile";

const ProfileList = () => {
  const router = useRouter();
  const [startupProfileList, setStartupProfileList] = useState<Startup[]>([]);

  const handleNavigateToCreateProfile = () => {
    router.push('/profiles/new');
  }

  const fetchStartupProfileList = async () => {
    const response = await startup_list();
    const modifiedResponse = response.data.map((startupProfile: any) => {
      const startupDetail = startupProfile.startup_id;
      return {
        id: startupDetail.id,
        name: startupDetail.name,
        avt_url: startupDetail.avt_url,
        category: startupDetail.category
      }
    })
    setStartupProfileList(modifiedResponse);
  }

  useEffect(() => {
    fetchStartupProfileList();
  }, [])

  return (
    <div className="max-w-lg w-full mx-auto mt-8 p-8 rounded-lg shadow-lg bg-white flex flex-col h-[70vh]">
      <div className="p-4 text-center mb-2">
        <h3 className="text-xl font-bold text-gray-800">Profile</h3>
        <p className="text-gray-500 text-sm">Access your desired profile</p>
      </div>

      <div className="flex-1 overflow-y-scroll">
        <Tabs aria-label="Profile Tabs" variant="underlined">
          <Tab key="startups" title="Startups">
            <div className="space-y-4">
              {startupProfileList.map((startup) => (
                <ProfileCard key={startup.id} startup={startup} />
              ))}
            </div>
          </Tab>

          <Tab key="mentors" title="Mentors">
            <div className="p-4 h-full flex items-center justify-center">
              <p className="text-sm text-gray-500">No mentor profiles available yet.</p>
            </div>
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
        className="w-full rounded-lg bg-purple-600 border-purple-600 text-white hover:bg-purple-700"
        onPress={() => handleNavigateToCreateProfile()}
      >
        Create new profile
      </Button>
    </div>
  )
}

export default ProfileList