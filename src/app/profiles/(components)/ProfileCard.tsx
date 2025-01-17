"use client";
import React from "react";
import { Button, Avatar, Tabs, Tab } from "@nextui-org/react";
import { RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
// Fake Data
const fakeStartups = [
  {
    id: 1,
    name: "Tech Innovators",
    goal: "Raise $1M for Series A",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Green Future",
    goal: "Achieve $500k in funding",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "EduLearn",
    goal: "Expand to 10 countries",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Startup X",
    goal: "Build a better future",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    name: "Tech Innovators 2.0",
    goal: "Launch new innovations",
    avatar: "https://via.placeholder.com/50",
  },
];

const ProfileCard = () => {
  const router = useRouter();
  const toCreateProfile = () => {
    router.push("/profiles/new");
  };
  return (
    <div className="max-w-lg w-full mx-auto p-8 rounded-lg shadow-lg bg-white flex flex-col h-[70vh]">
      {/* Profile Header */}
      <div className="p-4 text-center mb-2">
        <h3 className="text-xl font-bold text-gray-800">Profile</h3>
        <p className="text-gray-500 text-sm">Access your desired profile</p>
      </div>

      {/* Tabs Section */}
      <div className="flex-1 overflow-y-scroll">
        <Tabs aria-label="Profile Tabs" variant="underlined">
          {/* Startups Tab */}
          <Tab key="startups" title="Startups">
            <div className="space-y-4 overflow-y-scroll">
              {fakeStartups.map((startup) => (
                <div
                  key={startup.id}
                  className="flex items-center justify-between p-4 border-b"
                >
                  <div className="flex items-center">
                    <Avatar
                      src={startup.avatar}
                      alt={`${startup.name} Avatar`}
                      size="lg"
                    />
                    <div className="ml-4">
                      <p className="font-bold text-gray-800">{startup.name}</p>
                      <p className="text-sm text-gray-500">{startup.goal}</p>
                    </div>
                  </div>
                  {/* <span className="text-gray-400">&gt;</span> */}
                  <RightOutlined
                    width={24}
                    height={24}
                    className="text-gray-400"
                   />
                </div>
              ))}
            </div>
          </Tab>

          {/* Mentors Tab */}
          <Tab key="mentors" title="Mentors">
            <div className="p-4 h-full flex items-center justify-center">
              <p className="text-sm text-gray-500">No mentor profiles available yet.</p>
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Divider and Button Section */}
      <div className="flex items-center justify-center my-6">
        <hr className="w-full border-gray-300" />
        <span className="absolute bg-white px-2 text-gray-500">OR</span>
      </div>
      <Button
        type="submit"
        color="primary"
        size="lg"
        className="w-full rounded-lg bg-purple-600 border-purple-600 text-white hover:bg-purple-700"
        onClick={() => toCreateProfile()}
      >
        Create new profile
      </Button>
    </div>
  );
};

export default ProfileCard;
