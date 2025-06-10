"use client";

import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from "@heroui/react";
import { mentor_profile_detail } from "@/apis/mentor-profile"
import MentorExploreContainer from '@/containers/Explore/MentorExploreContainer';
// import MentorProfileContainer from '@/containers/MentorProfile/MentorProfileContainer';
import { useMentorIdStore, useMentorProfileStore } from '@/stores/mentor-store';
import { mentor_matching_request_list } from '@/apis/mentor-matching';
import { useErrorStore } from '@/stores/error-store';
import { Matching } from '@/interfaces/matching';
import { useMatchingRequestListStore } from '@/stores/matching-store';

interface MentorProfileNavigationProps {
}

const MentorProfileNavigation: React.FC<MentorProfileNavigationProps> = () => {
    const [selectedTab, setSelectedTab] = useState("explore");
    const setError = useErrorStore((state) => state.setError);
    const mentorId = useMentorIdStore((state) => state.mentorId);
    const setMentorProfile = useMentorProfileStore((state) => state.setMentorProfile);
    const setMatchingRequestList = useMatchingRequestListStore((state) => state.setMatchingRequestList);

    useEffect(() => {
        const fetchMentorProfile = async () => {
            try {
                const data = await mentor_profile_detail(mentorId);
                setMentorProfile(data.data);
            } catch (err) {
                setError("Failed to fetch mentor profile");
                console.error('Failed to fetch mentor profile:', err);
            }
        };
        fetchMentorProfile();
    }, [mentorId, setMentorProfile, setError]);

    useEffect(() => {
        const matchingRequestList = async () => {
            try {
                const matchingRequestList = await mentor_matching_request_list(mentorId);
                setMatchingRequestList(matchingRequestList.data);
            } catch (err: any) {
                if (
                    err?.response?.status === 404 &&
                    err?.response?.data?.code === "MATCHING_LIST_REQUEST_FROM_STARTUP_NOT_FOUND"
                ) {
                    setError("No matching request found for this mentor.");
                } else {
                    setError("Failed to fetch matching requests.");
                }
                console.error('Failed to fetch matching requests:', err);
            }
        };
        matchingRequestList();
    }, [mentorId, setMatchingRequestList, setError]);

    return (
        <div className="w-full flex justify-center">
            <div className="flex-col w-full">
                <Tabs
                    aria-label="Mentor profile tabs"
                    color="primary"
                    variant="underlined"
                    selectedKey={selectedTab}
                    onSelectionChange={setSelectedTab as any}
                    className="w-full font-bold bg-white xl:px-56 lg:px-48 md:px-32 sm:px-16 xs:px-8 px-4"
                >
                    <Tab
                        key="explore"
                        title="Explore"
                        className="pt-0 px-2"
                    >
                        <div className="flex flex-col items-center w-full h-screen relative z-10 gap-y-8">
                            <MentorExploreContainer />
                        </div>
                    </Tab>
                    <Tab
                        key="profile"
                        title="Profile"
                        className="pt-0 px-2"
                    >
                        {/* <MentorProfileContainer /> */}
                    </Tab>
                </Tabs >
            </div >
        </div >
    );
};

export default MentorProfileNavigation; 