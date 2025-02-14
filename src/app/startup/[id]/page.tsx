"use client";
import { Avatar, Button, Tab, Tabs } from "@heroui/react";
import { useParams } from "next/navigation";
import Image from 'next/image';
import GroupIcon from '../../../../public/assets/group.png';
import LabelIcon from '../../../../public/assets/label.png';
import { useEffect, useState } from "react";
import { startup_detail } from "@/apis/startup";

interface Startup {
    id: number;
    name: string;
    description: string;
    category: string;
    location_based: string;
    startup_link: string;
}

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
                {/* Profile Header */}
                <div className="p-4 mb-2">
                    <div className="flex items-center">
                        <Avatar src="https://via.placeholder.com/150"
                        size="lg"
                        />
                        <div className="flex flex-col ml-4">
                            <h3 className="text-xl font-bold text-gray-800">{startup?.name}</h3>
                            <p className="text-gray-500 text-md">{startup?.location_based}</p>
                        </div>
                    </div>
                    <div className="flex w-full gap-x-3 mt-4 p-2">
                        <div className="flex items-center gap-1 overflow-hidden">
                            <Image src={LabelIcon} alt="Project" width={24} height={24} className="object-cover" />
                            <span className="font-inter font-semibold text-base text-black text-center truncate">
                                {startup?.category}
                            </span>
                            </div>
                            <div className="flex items-center gap-1">
                            <Image src={GroupIcon} alt="Members" width={24} height={24} className="object-cover" />
                            <span className="font-inter font-semibold text-base text-black text-center">
                                3 Members
                            </span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-500 text-xs">Startup Bio...</p>
                    </div>
                </div>
            
                {/* Tabs Section */}
                <div className="flex-1 overflow-y-scroll">
                    <Tabs aria-label="Startup Tabs" variant="underlined">
                    <Tab key="overview" title="Overview">
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Description</h4>
                                <p className="text-gray-500 text-sm whitespace-pre-line">
                                    {startup?.description}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Profile Link</h4>
                                <p className="text-gray-500 text-sm whitespace-pre-line">
                                    <a href={startup?.startup_link}>{startup?.startup_link}</a>
                                </p>
                            </div>
                        </div>
                    </Tab>

                    <Tab key="media" title="Media">
                        <div className="p-4 h-full flex items-center justify-center">
                        <p className="text-sm text-gray-500">Not available yet.</p>
                        </div>
                    </Tab>
                    <Tab key="documentation" title="Documentation">
                        <div className="p-4 h-full flex items-center justify-center">
                        <p className="text-sm text-gray-500">Not available yet.</p>
                        </div>
                    </Tab>
                    <Tab key="advanced" title="Advanced">
                        <div className="p-4 h-full flex items-center justify-center">
                        <p className="text-sm text-gray-500">Not available yet.</p>
                        </div>
                    </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default StartupDetailPage;
