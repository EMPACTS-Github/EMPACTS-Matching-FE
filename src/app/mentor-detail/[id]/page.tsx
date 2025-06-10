"use client";
import MentorProfileNavigation from '@/components/Navigation/MentorProfileNavigation';
import React from 'react';
import { useParams } from "next/navigation";
import { useMentorIdStore } from '@/stores/mentor-store';

const MentorDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const setMentorId = useMentorIdStore((state) => state.setMentorId);
    setMentorId(id);
    return (
        <MentorProfileNavigation />
    );
};
export default MentorDetailPage;