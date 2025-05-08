"use client";
import React from 'react';
import { useEffect, useState } from "react";
import { Spacer } from "@heroui/spacer";
import { startup_profile_detail } from "@/apis/startup-profile"
import ProfileHeader from "./ProfileHeader";
import TabsSection from "./TabsSection";
import ProfileInfoSubCard from "@/components/Card/ProfileInfoSubCard";
import { StartupProfileResponse } from "@/interfaces/StartupProfile";
import { Skeleton } from "@heroui/skeleton";

interface StartupProfileContainerProps {
    startup_profile: StartupProfileResponse | null | undefined;
}

const StartupProfileContainer: React.FC<StartupProfileContainerProps> = ({ startup_profile }) => {
    return (
        <div className="flex w-full max-w-5xl relative z-10 gap-0 mt-6">
            <div className="w-full mx-0 p-8 rounded-lg shadow-lg bg-white flex flex-col justify-center">
                {startup_profile?.startup ? (
                    <div>
                        <ProfileHeader startup={startup_profile?.startup} member_count={startup_profile?.members.length} />
                        <TabsSection startup={startup_profile?.startup} />
                    </div>
                ) : (
                    <div>
                        <Skeleton className="rounded-lg mb-4">
                            <div className="h-24 rounded-lg bg-default-300" />
                        </Skeleton>
                        <div className="space-y-3">
                            <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                            </Skeleton>
                            <Skeleton className="w-4/5 rounded-lg">
                                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                            </Skeleton>
                            <Skeleton className="w-2/5 rounded-lg">
                                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                            </Skeleton>
                        </div>
                    </div>
                )}
            </div>
            <Spacer x={10} />
            <div className="max-w-lg">
                <ProfileInfoSubCard startup={startup_profile?.startup} member_count={startup_profile?.members.length} />
            </div>
        </div>
    );
}
export default StartupProfileContainer;