"use client";
import React from 'react';
import { Spinner } from "@heroui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Spacer } from "@heroui/spacer";
import { startup_profile_detail } from "@/apis/startup-profile"
import ProfileHeader from "./ProfileHeader";
import TabsSection from "./TabsSection";
import ProfileInfoSubCard from "@/components/Card/ProfileInfoSubCard";
import { StartupProfileResponse } from "@/interfaces/StartupProfile";

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
        <div className="flex w-full max-w-5xl relative z-10 gap-0 mt-6">
            <div className="w-full mx-0 p-8 rounded-lg shadow-lg bg-white flex flex-col justify-center">
                {startup_profile?.startup ? (
                    <div>
                        <ProfileHeader startup={startup_profile?.startup} member_count={startup_profile?.members.length} />
                        <TabsSection startup={startup_profile?.startup} />
                    </div>
                ) : (
                    <Spinner size="lg" label="Loading..." className="m-auto" />
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