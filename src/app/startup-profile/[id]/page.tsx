"use client";
import StartupProfileContainer from '@/container/StartupProfile/StartupProfileContainer';
import React from 'react';
import Header from '@/components/Header';
import { useParams } from "next/navigation";

const StartupProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="flex flex-col items-center w-full h-screen relative z-10 gap-y-8">
            <Header />
            <StartupProfileContainer id={id} />
        </div>
    );
};

export default StartupProfilePage;
