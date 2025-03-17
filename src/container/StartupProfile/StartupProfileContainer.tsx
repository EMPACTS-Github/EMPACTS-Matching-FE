"use client";
import React from 'react';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { startup_detail } from "@/apis/startup";
import ProfileHeader from "@/components/StartupDetail/ProfileHeader";
import TabsSection from "@/components/StartupDetail/TabsSection";
import { Startup } from "@/utils/interfaces/startup";
import ProfileInfoSubCard from "@/components/Card/ProfileInfoSubCard";

const sampleStartup: Startup = {
    id: 1,
    name: "Tech Innovators",
    description: "As a UX Designer on our team, you will shape user experiences by leading the design of key features and projects. Your responsibilities include defining user experience flows, developing new product concepts, and crafting user stories. You will design detailed UI layouts, create benchmarks, and develop high-fidelity prototypes while documenting UX and UI strategies. Collaborating with technical teams, you will transform designs into impactful, industry-leading products. This role combines creativity and problem-solving to create meaningful user experiences. Your journey with us is an opportunity to drive innovation and make a significant impact.",
    category: "Technology",
    location_based: "San Francisco, USA",
    startup_link: "https://techinnovators.com"
};


const StartupProfileContainer: React.FC = () => {
    const [startup, setStartup] = useState<Startup | null>(sampleStartup);

    return (
        <div className="flex justify-center w-full max-w-5xl h-screen relative z-10 gap-8">
            <div className="w-4/5 mx-auto p-8 rounded-lg shadow-lg bg-white flex flex-col h-min">
                <ProfileHeader startup={startup} />
                <TabsSection startup={startup} />
            </div>
            <div className='w-1/5'>
                <ProfileInfoSubCard />
            </div>
        </div>
    );
}
export default StartupProfileContainer;