"use client";
import React, { useEffect, useState } from 'react';
import { Spacer } from "@heroui/spacer";
import ProfileInfoSubCard from "@/components/Card/ProfileInfoSubCard";
import { StartupProfileResponse } from "@/interfaces/StartupProfile";
import MemberListContainer from './MemberListContainer';
import { Skeleton } from "@heroui/skeleton";
import { Button, Card, CardBody, Divider } from "@heroui/react";
import { startup_matching_activity } from "@/apis/startup-matching";
import { MATCHING_STATUS } from "@/constants/matching";

interface StartupMemberContainerProps {
    startup_profile: StartupProfileResponse | undefined;
}

const StartupMemberContainer: React.FC<StartupMemberContainerProps> = ({ startup_profile }) => {
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : {};
    const userId = userObj.id;
    const isOwner = startup_profile?.members.some((member) => member.user.id === userId && member.role === "OWNER")
    const [countMatches, setCountMatches] = useState<number>(0);

    useEffect(() => {
        if (!startup_profile?.startup?.id) return;
        const fetchMatching = async () => {
            try {
                const data = await startup_matching_activity(startup_profile.startup.id);
                const acceptedMatches = data.data.filter((match: any) => match.status === MATCHING_STATUS.ACCEPTED);
                setCountMatches(acceptedMatches.length);
            } catch (err: any) {
                setCountMatches(0);
            }
        };
        fetchMatching();
    }, []);
    return (
        <div className="flex w-full 2xl:px-[20%] xl:px-56 lg:px-48 md:px-32 sm:px-16 xs:px-8 px-4 relative z-10 gap-0 mt-6">
            {startup_profile?.startup ? (
                <div className="w-[75%] mx-0 flex flex-col">
                    <MemberListContainer members={startup_profile.members} startupId={startup_profile.startup.id} />
                </div>) : (
                <div className='w-[75%] mx-0 flex flex-col'>
                    <div className="flex justify-between items-center mb-4" >
                        <div className="space-x-2">
                            <Button size="sm" variant="solid" color="primary" radius="full" isDisabled={false}>All</Button>
                            <Button size="sm" variant="bordered" color="primary" radius="full" isDisabled={false} className='border-empacts-grey-50 border-1'>Owner</Button>
                            <Button size="sm" variant="bordered" color="primary" radius="full" isDisabled={false} className='border-empacts-grey-50 border-1'>Member</Button>
                        </div>
                        <Button className="bg-empacts text-white px-4" size="sm">INVITE</Button>
                    </div>
                    <Card className="flex p-4 w-full">
                        <div className="w-full flex items-center gap-3">
                            <div>
                                <Skeleton className="h-12 w-12 rounded-full bg-default-300" />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <Skeleton className="h-3 w-4/5 rounded-lg bg-default-300" />
                                <Skeleton className="h-3 w-3/5 rounded-lg bg-default-300" />
                            </div>
                        </div>
                    </Card>
                </div>
            )}
            <Spacer x={4} />
            {
                startup_profile?.startup ? (
                    <div className="w-[25%]">
                        <ProfileInfoSubCard startup={startup_profile.startup} isOwner={isOwner} countMatches={countMatches} />
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
    )
}
export default StartupMemberContainer;