"use client";
import StartupProfileNavigation from '@/components/Navigation/StartupProfileNavigation';
import React from 'react';
import { useParams } from "next/navigation";


const StartupDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <StartupProfileNavigation startupId={id} />
    );
};

export default StartupDetailPage;