"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { startup_detail } from "@/apis/startup";
import ProfileHeader from "@/components/StartupDetail/ProfileHeader";
import TabsSection from "@/components/StartupDetail/TabsSection";
import { Startup } from "@/utils/interfaces/startup";

const StartupDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [startup, setStartup] = useState<Startup | null>(null);
    useEffect(() => {
        console.log(id);
        const fetchStartup = async () => {
            const response = await startup_detail(parseInt(id));
            console.log(response);
            setStartup(response.data);
        };
        fetchStartup();
    }, [id]);

    const isLoading = false;
    
    if (isLoading) {
        return <p>Loading...</p>;
    }
    
    return (
        <div className="flex justify-center items-center w-full h-screen relative z-10">
            <div className="w-[65vw] mx-auto p-8 rounded-lg shadow-lg bg-white flex flex-col h-min">
                <ProfileHeader startup={startup} />
                <TabsSection startup={startup} />
            </div>
        </div>
    );
};

export default StartupDetailPage;
