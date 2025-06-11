"use client";
import MentorProfileNavigation from '@/components/Navigation/MentorProfileNavigation';
import React from 'react';
import { useParams } from "next/navigation";

const MentorDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <MentorProfileNavigation mentorId={id} />
    );
};
export default MentorDetailPage;