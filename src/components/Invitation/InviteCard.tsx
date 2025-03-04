"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AvatarPlaceholder from "../../../public/assets/avatar-placeholder.png";

// Fake Data
const mockData = {
  startupName: "Startup Name",
  goal: "Goal",
  avatar: "https://placehold.co/400",
  startupOwner: "Startup Owner",
  invitePosition: "Invite Position",
};

const InviteCard = () => {
  const [isRejected, setIsRejected] = useState(false);
  const router = useRouter();

  const onAccept = () => {
    console.log("Accepted");
    router.push("/");
  };

  const onDecline = () => {
    setIsRejected(true);
  };

  return (
    <div className="max-w-lg w-full mx-auto p-8 rounded-lg shadow-lg bg-white flex flex-col h-min">
      {/* Profile Header */}
      <div className="p-4 text-center mb-2">
        <h3 className="text-xl font-bold text-gray-800">You are invited as</h3>
        <h3 className="text-xl font-bold text-empacts">
          {mockData.invitePosition}
        </h3>
      </div>

      <div className="startup-profile flex flex-col items-center gap-4 w-full p-4">
        <Image
          src={AvatarPlaceholder}
          alt={mockData.startupName}
          className="object-cover"
          width={150}
          height={150}
        />
      </div>

      <div className="profile-info flex flex-col items-center gap-1 pb-6">
        <h2 className="text-[20px] font-semibold text-[#09090b] text-center">
          {mockData.startupName}
        </h2>
        <p className="text-[14px] font-semibold text-[#71717a] text-center">
          {mockData.goal}
        </p>
        <p className="text-[14px] font-normal text-[#71717a] text-center">
          Owner: {mockData.startupOwner}
        </p>
      </div>

      {isRejected === false ? (
        <div className="flex flex-row gap-8 h-12">
          <div className="flex-1">
            <Button
              onClick={onDecline}
              className="w-full px-2.5 py-[10px] bg-[#f14a410f] rounded-lg flex items-center justify-center"
            >
              <span className="text-[#ff463b] font-inter text-base font-medium leading-[120%]">
                Decline
              </span>
            </Button>
          </div>

          <div className="flex-1">
            <Button
              onClick={onAccept}
              className="w-full px-2.5 py-[10px] bg-[#15a23914] rounded-lg flex items-center justify-center"
            >
              <span className="text-[#15a239] font-inter text-base font-medium leading-[120%]">
                Accept
              </span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-center gap-8 h-12">
          <div className="text-[#808080] text-base leading-[120%]">
            You have rejected this invitation!
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteCard;
