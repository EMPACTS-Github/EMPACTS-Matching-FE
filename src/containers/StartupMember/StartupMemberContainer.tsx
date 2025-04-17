"use client";
import React from 'react';
import { useEffect, useState } from "react";
import ProfileInfoSubCard from "@/components/Card/ProfileInfoSubCard";
import { StartupProfileResponse } from "@/interfaces/StartupProfile";
import { startup_profile_detail } from "@/apis/startup-profile"
import MemberListContainer from './MemberListContainer';

interface StartupMemberContainerProps {
    id: string;
}

const StartupMemberContainer: React.FC<StartupMemberContainerProps> = ({ id }) => {
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
        <div className="grid grid-cols-3 w-full max-w-5xl relative z-10 gap-0 mt-6">
            <div className="col-span-2 w-full mx-0 flex flex-col">
                <MemberListContainer members={startup_profile?.members} />
            </div>
            <div className="col-span-1">
                <ProfileInfoSubCard startup={startup_profile?.startup} member_count={startup_profile?.members.length} />
            </div>
        </div>
    )
}
export default StartupMemberContainer;