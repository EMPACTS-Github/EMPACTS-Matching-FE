import React, { useEffect, useState, useCallback } from 'react';
import { Spinner } from "@heroui/spinner";
import { useDisclosure } from "@heroui/react";
import MentorSearchSectionCard from '@/components/Card/MentorSearchSectionCard';
import { mentor_search } from '@/apis/mentor';
import { FETCH_MENTOR_LIMIT } from '@/constants';
import { Mentor } from '@/interfaces/MentorProfile';
import MentorInfoModal from '@/components/Modal/MentorInfoModal';
import { getProvince } from '@/utils/getProvince';

const SearchSection: React.FC = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
    const { isOpen: isMentorInfoModalOpen, onOpen: onMentorInfoModalOpen, onOpenChange: onMentorInfoModalOpenChange } = useDisclosure();

    const fetchMentors = useCallback(async () => {
        try {
            setLoading(true);
            const response = await mentor_search(FETCH_MENTOR_LIMIT, page);
            const data: Mentor[] = response.data;
            setMentors(prev => (page === 1 ? data : [...prev, ...data]));
            setHasMore(data.length === FETCH_MENTOR_LIMIT);
        } catch (error) {
            console.error('Failed to fetch mentors:', error);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchMentors();
    }, [page, fetchMentors]);

    const handleMentorDetailClick = (id: string) => {
        const mentor = mentors.find(m => m.id === id);
        if (mentor) {
            setSelectedMentor(mentor);
            onMentorInfoModalOpen();
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="w-full flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                    {mentors.length > 0 ? (
                        mentors.map((mentor) => (
                            <MentorSearchSectionCard key={mentor.id} {...mentor} onClick={handleMentorDetailClick} />
                        ))
                    ) : (
                        !loading && <div className="text-center mt-8 text-black md:col-span-2 lg:col-span-4">No result found</div>
                    )}
                </div>
                {loading && hasMore && (
                    <div className='flex justify-center items-center h-[50%]'>
                        <Spinner classNames={{ label: "text-foreground mt-4" }} label="The system is fetching Mentor. Please wait..." variant="wave" />
                    </div>
                )}
            </div>
            <MentorInfoModal
                isOpen={isMentorInfoModalOpen}
                onOpenChange={onMentorInfoModalOpenChange}
                mentorName={selectedMentor?.name || ""}
                location={getProvince(selectedMentor?.locationBased || "")}
                avtUrl={selectedMentor?.avtUrl || ""}
                mentorDescription={selectedMentor?.description || ""}
                mentorSdgFocusExpertises={selectedMentor?.sdgFocusExpertises || []}
                mentorSkillOffered={selectedMentor?.skillOffered || []}
                mentorLanguagesSpoken={selectedMentor?.languagesSpoken || []}
            />
        </div>
    );
};

export default SearchSection;