"use client";
import React from 'react';
import { Spacer } from "@heroui/spacer";
import ProfileHeader from "./ProfileHeader";
import TabsSection from "./TabsSection";
import MentorProfileInfoSubCard from "@/components/Card/MentorProfileInfoSubCard";
import { Skeleton } from "@heroui/skeleton";
import { Card, CardBody, Divider } from "@heroui/react";
import { Mentor } from '@/interfaces/MentorProfile';


interface MentorProfileContainerProps {
    mentorProfile: Mentor | null;
    matchingRequestAccepted?: number;
}
const MentorProfileContainer: React.FC<MentorProfileContainerProps> = ({ mentorProfile, matchingRequestAccepted }) => {

    return (
        <div className="flex w-full 2xl:px-[20%] xl:px-56 lg:px-48 md:px-32 sm:px-16 xs:px-8 px-4 relative z-10 gap-0 mt-6">
            <div className="w-[75%] mx-0 p-8 rounded-lg shadow-lg bg-white flex flex-col justify-center">
                {mentorProfile ? (
                    <div>
                        <ProfileHeader mentorProfile={mentorProfile} />
                        <TabsSection mentorProfile={mentorProfile} />
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
            <Spacer x={4} />
            {
                mentorProfile ? (
                    <div className="w-[25%]">
                        <MentorProfileInfoSubCard countMatches={matchingRequestAccepted || 0} mentorProfile={mentorProfile} />
                    </div>
                ) : (
                    <div className="w-[25%]">
                        <Card className="bg-white min-w-lg shadow-lg rounded-lg px-4 py-2">
                            <div className="rounded-full flex items-center justify-center">
                                <Skeleton className="h-20 w-20 rounded-full bg-default-300" />
                            </div>
                            <CardBody>
                                <Divider />
                                <div className="flex gap-6 justify-center items-center p-2">
                                    <Skeleton className="h-8 w-20 rounded-full bg-default-300" />
                                    <Divider orientation="vertical" className="h-14" />
                                    <Skeleton className="h-8 w-20 rounded-full bg-default-300" />
                                </div>
                                <Divider />
                            </CardBody>
                        </Card>
                    </div>
                )
            }
        </div>
    );
}
export default MentorProfileContainer;