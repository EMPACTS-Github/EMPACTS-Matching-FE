"use client";
import React from 'react';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { startup_profile_detail } from "@/apis/startup-profile"
import ProfileHeader from "./ProfileHeader";
import TabsSection from "./TabsSection";
import ProfileInfoSubCard from "@/components/Card/ProfileInfoSubCard";
import { StartupProfileResponse } from "@/utils/interfaces/StartupProfile";

interface StartupProfileContainerProps {
    id: string;
}

const StartupProfileContainer: React.FC<StartupProfileContainerProps> = ({ id }) => {
    const [startup_profile, setStartupProfile] = useState<StartupProfileResponse | null>();
    useEffect(() => {
        const fetchStartupProfile = async () => {
            try {
                const data = await startup_profile_detail(id);
                setStartupProfile(data.data);
                console.log(data.data);
            } catch (err) {
                console.error('Failed to fetch startup profile:', err);
            }
        };

        fetchStartupProfile();
    }, [id]);

    return (
        <div className="grid grid-cols-3 w-full max-w-5xl relative z-10 gap-0">
            <div className="col-span-2 w-full mx-0 p-8 rounded-lg shadow-lg bg-white flex flex-col">
                {startup_profile?.startup ? (
                    <div>
                        <ProfileHeader startup={startup_profile?.startup} member_count={startup_profile?.members.length} />
                        <TabsSection startup={startup_profile?.startup} />
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">Loading startup data...</p>
                )}
            </div>
            <div className="col-span-1">
                <ProfileInfoSubCard startup={startup_profile?.startup} member_count={startup_profile?.members.length} />
            </div>
        </div>
    );
}
export default StartupProfileContainer;