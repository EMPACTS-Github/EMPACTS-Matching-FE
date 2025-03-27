"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { startup_detail } from "@/apis/startup";
import ProfileHeader from "@/components/StartupDetail/ProfileHeader";
import TabsSection from "@/components/StartupDetail/TabsSection";
import { Startup } from "@/utils/interfaces/startup";
import { provinces } from "@/constants/provinces";

const StartupDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [startup, setStartup] = useState<Startup | null>(null);
    
    useEffect(() => {
        const fetchStartup = async () => {
            try {
                const response = await startup_detail(parseInt(id));
                
                // Map the location_based to its human-readable label
                if (response.data && response.data.location_based) {
                    const province = provinces.find(
                        (p) => p.key === response.data.location_based
                    );
                    
                    if (province) {
                        response.data.location_based_label = province.label;
                    } else {
                        response.data.location_based_label = response.data.location_based;
                    }
                }
                
                setStartup(response.data);
            } catch (error) {
                console.error("Error fetching startup details:", error);
            }
        };
        
        fetchStartup();
    }, [id]);

    const isLoading = !startup;
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                <p>Loading startup details...</p>
            </div>
        );
    }
    
    return (
        <div className="flex justify-center items-center w-full h-screen relative z-10 overflow-hidden">
            <div className="w-[65vw] mx-auto p-8 rounded-lg shadow-lg bg-white flex flex-col h-[80vh] overflow-hidden">
                <ProfileHeader 
                    startup={startup} 
                    locationLabel={startup?.location_based_label || startup?.location_based}
                />
                <TabsSection startup={startup} />
            </div>
        </div>
    );
};

export default StartupDetailPage;
