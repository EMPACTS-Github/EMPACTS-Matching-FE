"use client";
import React from "react";
import RightArrow from "public/assets/arrow-right.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NewProfilePage() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="max-w-lg w-full mx-auto p-8 rounded-lg shadow-lg bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Create Profile</h3>
          <p className="text-gray-500 text-sm">Choose your new profile type</p>
        </div>

        {/* Options */}
        <div className="flex-1 flex flex-col space-y-4">
          {/* Mentor Option */}
          <div
            className="flex items-center justify-between p-4 border-b cursor-pointer"
          >
            <div className="flex items-center" onClick={() => router.push("/profiles/new/mentor")}>
              <div className="ml-4">
                <p className="font-bold text-gray-800">Mentor</p>
                <p className="text-sm text-gray-500">I want to guide startups</p>
              </div>
            </div>
            <Image src={RightArrow} className="text-gray-400 text-lg" alt={""} width={24} height={24}/>
          </div>

          {/* Startup Option */}
          <div
            className="flex items-center justify-between p-4 border-b cursor-pointer"
          >
            <div className="flex items-center" onClick={() => router.push("/profiles/new/startup")}>
              <div className="ml-4">
                <p className="font-bold text-gray-800">Startup</p>
                <p className="text-sm text-gray-500">I want to build a business</p>
              </div>
            </div>
            <Image src={RightArrow} className="text-gray-400 text-lg" alt={""} width={24} height={24}/>
          </div>
        </div>
      </div>
    </div>
  );
}
