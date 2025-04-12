"use client";
import StartupProfileContainer from '@/containers/StartupProfile/StartupProfileContainer';
import React from 'react';
import { useParams } from "next/navigation";

const StartupProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="flex flex-col items-center w-full h-screen relative z-10 gap-y-8">
            <StartupProfileContainer id={id} />
        </div>
    );
};

export default StartupProfilePage;
