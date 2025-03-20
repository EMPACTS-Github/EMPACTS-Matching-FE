"use client";
import React from 'react';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { startup_detail } from "@/apis/startup";
import ProfileHeader from "./ProfileHeader";
import TabsSection from "./TabsSection";
import ProfileInfoSubCard from "@/components/Card/ProfileInfoSubCard";
import { StartupProfileResponse, Startup } from "@/utils/interfaces/StartupProfile";

const startup_profile_response: StartupProfileResponse = {
    startup: {
        id: 61,
        name: "New Startup 9 name",
        phone: null,
        avt_url: null,
        status: null,
        accept_email_marketing: null,
        description: "This is a super startup",
        category: 2,
        startup_link: null,
        credential: null,
        location_based: "HO_CHI_MINH",
        market_focus: null,
        startup_state: null,
        state_detail: null,
        have_active_use: false,
        revenue: null,
        other_participated_status: false,
        other_participated_detail: null,
        legal_equity_detail: null,
        investment_detail: null,
        fundraising_detail: null,
        empacts_source: null,
        participation_reason: null,
        push_state: 0,
        is_hide: false,
        is_deleted: 0,
        created_at: "2025-02-13T09:57:50.891Z",
        updated_at: "2025-02-13T13:45:16.306Z"
    },
    members: [
        {
            id: 13,
            title: null,
            role: null,
            is_deleted: 0,
            created_at: "2025-02-13T02:57:51.634Z",
            updated_at: "2025-02-13T06:45:16.568Z",
            user_id: {
                id: 5,
                email: "daosyphuc288@gmail.com",
                name: "Phúc Đào",
                avt_url: "https://lh3.googleusercontent.com/a/ACg8ocIP-XduL94v1D7n476GaoJ0qN7KG6TpwN7wbXXAjHH3LID-QO0=s96-c",
                is_verified: true
            }
        },
        {
            id: 17,
            title: null,
            role: "OWNER",
            is_deleted: 0,
            created_at: "2025-02-13T03:49:43.472Z",
            updated_at: "2025-02-13T06:45:18.391Z",
            user_id: {
                id: 13,
                email: "daosyphuc2003@gmail.com",
                name: "Phúc Phúc",
                avt_url: "https://res.cloudinary.com/dteznrd1g/image/upload/v1738721310/card-covers/ic4xogn3mkwt2exnazdo.jpg",
                is_verified: true
            }
        }
    ]
};


const StartupProfileContainer: React.FC = () => {
    const [startup_profile, setStartupProfile] = useState<StartupProfileResponse | null>(startup_profile_response);

    return (
        <div className="grid grid-cols-4 w-full max-w-5xl relative z-10 gap-0">
            <div className="col-span-2 w-full mx-0 p-8 rounded-lg shadow-lg bg-white flex flex-col">
                {startup_profile?.startup ? (
                    <div>
                        <ProfileHeader startup={startup_profile?.startup} />
                        <TabsSection startup={startup_profile?.startup} />
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">Loading startup data...</p>
                )}
            </div>
            <div className="col-span-1">
                <ProfileInfoSubCard />
            </div>
        </div>
    );
}
export default StartupProfileContainer;