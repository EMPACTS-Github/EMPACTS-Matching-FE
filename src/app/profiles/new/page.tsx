"use client";
import React from "react";
import ProtectedRoute from "@/app/ProtectedRoute";
import ProfileOption from "@/components/CreateStartup/ProfileOption";
import ProfileHeader from "@/components/CreateStartup/ProfileHeader";

export default function NewProfilePage() {
  return (
    <ProtectedRoute>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="max-w-lg w-full mx-auto p-8 rounded-lg shadow-lg bg-white flex flex-col">
          <ProfileHeader title="Create Profile" subtitle="Choose your new profile type" />
          <div className="flex-1 flex flex-col space-y-4">
            <ProfileOption
              title="Mentor"
              description="I want to guide startups"
              link="/profiles/new/mentor"
            />
            <ProfileOption
              title="Startup"
              description="I want to build a business"
              link="/profiles/new/startup"
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
