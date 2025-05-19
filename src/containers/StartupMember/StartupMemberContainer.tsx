"use client";
import React from 'react';
import { Spacer } from "@heroui/spacer";
import ProfileInfoSubCard from "@/components/Card/ProfileInfoSubCard";
import { StartupProfileResponse } from "@/interfaces/StartupProfile";
import MemberListContainer from './MemberListContainer';
import { Skeleton } from "@heroui/skeleton";
import { Button, Card } from "@heroui/react";

interface StartupMemberContainerProps {
    startup_profile: StartupProfileResponse | null | undefined;
}

const StartupMemberContainer: React.FC<StartupMemberContainerProps> = ({ startup_profile }) => {
    return (
        <div className="flex w-full 2xl:px-[20%] xl:px-56 lg:px-48 md:px-32 sm:px-16 xs:px-8 px-4 relative z-10 gap-0 mt-6">
            {startup_profile?.startup ? (

                <div className="w-[75%] mx-0 flex flex-col">
                    <MemberListContainer members={startup_profile?.members} startupId={startup_profile.startup.id} />
                </div>) : (
                <div className='w-[75%] mx-0 flex flex-col'>
                    <div className="flex justify-between items-center mb-4" >
                        <div className="space-x-2">
                            <Button size="sm" variant="solid" color="primary" radius="full" isDisabled={false}>All</Button>
                            <Button size="sm" variant="bordered" color="primary" radius="full" isDisabled={false} className='border-empacts-dark border-1'>Owner</Button>
                            <Button size="sm" variant="bordered" color="primary" radius="full" isDisabled={false} className='border-empacts-dark border-1'>Member</Button>
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
            <div className="w-[25%]">
                <ProfileInfoSubCard startup={startup_profile?.startup} member_count={startup_profile?.members.length} />
            </div>
        </div>
    )
}
export default StartupMemberContainer;