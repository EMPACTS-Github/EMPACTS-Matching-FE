"use client";
import StartupMemberContainer from '@/containers/StartupMember/StartupMemberContainer';
import React from 'react';
import { useParams } from "next/navigation";

const StartupMemberPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="flex flex-col items-center w-full h-screen relative z-10 gap-y-8">
            <StartupMemberContainer id={id} />
        </div>
    );
};

export default StartupMemberPage;