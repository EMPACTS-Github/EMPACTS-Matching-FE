import React, { useState, useEffect } from "react";
import { startup_matching_activity } from "@/apis/startup-matching";
import { Spinner, Button } from "@heroui/react";
import { Spacer } from "@heroui/spacer";
import { Matching } from "@/interfaces/matching";
import { mentor_profile_detail } from "@/apis/mentor-profile";
import { Mentor } from "@/interfaces/MentorProfile";
import MatchingMentorCard from "@/components/Card/MatchingMentorCard";
import { getProvince } from "@/utils/getProvince";
import MatchingInfoCard from "@/components/Card/MatchingInfoCard";

interface MatchingActivitySectionProps {
    startupId: string;
};

const MatchingActivitySection: React.FC<MatchingActivitySectionProps> = ({
    startupId
}) => {
    const [matches, setMatches] = useState<Matching[] | null>(null);
    const [mentorList, setMentorList] = useState<Mentor[]>([]);
    const [selectedMentorIndex, setSelectedMentorIndex] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [filterMode, setFilterMode] = useState<"ALL" | "ACCEPTED" | "PENDING">("ALL");

    const filterMentorIndexes = matches && mentorList.length
        ? matches
            .map((match, idx) => ({ match, idx }))
            .filter(({ match }) =>
                filterMode === "ALL" ||
                (filterMode === "ACCEPTED" && match.status === "ACCEPTED") ||
                (filterMode === "PENDING" && match.status === "PENDING")
            )
            .map(({ idx }) => idx)
        : [];

    const filteredSelectedIndex = filterMentorIndexes.includes(selectedMentorIndex)
        ? selectedMentorIndex
        : filterMentorIndexes[0] ?? 0;

    useEffect(() => {
        const fetchMatching = async () => {
            try {
                const data = await startup_matching_activity(startupId);
                setMatches(data.data);
                setError(null);
            } catch (err: any) {
                setMatches(null);
                if (
                    err?.response?.status === 404 &&
                    err?.response?.data?.code === "MATCHING_ACTIVITY_NOT_FOUND"
                ) {
                    setError("No matching activity found.");
                } else {
                    setError("Failed to fetch matching activity.");
                }
            }
        };
        fetchMatching();
    }, [startupId]);

    useEffect(() => {
        const fetchAllMentorDetails = async () => {
            if (!matches || matches.length === 0) {
                setMentorList([]);
                return;
            }
            try {
                const mentorDetails = await Promise.all(
                    matches.map(async (match) => {
                        const response = await mentor_profile_detail(match.mentorId);
                        const mentorData = response.data.mentor;
                        return {
                            id: mentorData.id,
                            name: mentorData.name,
                            mentorUsername: mentorData.mentorUsername,
                            phone: mentorData.phone,
                            avtUrl: mentorData.avtUrl,
                            status: mentorData.status,
                            description: mentorData.description,
                            sdgFocusExpertises: mentorData.sdgFocusExpertises,
                            locationBased: mentorData.locationBased,
                            skillOffered: mentorData.skillOffered,
                            languagesSpoken: mentorData.languagesSpoken,
                        } as Mentor;
                    })
                );
                setMentorList(mentorDetails);
            } catch (err) {
                setMentorList([]);
                setError("Failed to fetch mentor details.");
            }
        };
        fetchAllMentorDetails();
    }, [matches]);

    const handleMentorSelect = (index: number) => {
        setSelectedMentorIndex(index);
    };

    if (error) {
        return (
            <div className='flex justify-center items-center h-[50%]'>
                <span className="text-gray-500 text-lg">{error}</span>
            </div>
        );
    }

    return (
        mentorList.length > 0 ? (
            <div className="flex w-full px-4 relative z-10 gap-0 mt-6">
                <div className="mx-0 w-[30%] flex flex-col justify-start">
                    <div>
                        <div className="flex justify-between items-center mb-4" >
                            <div className="space-x-2">
                                <Button
                                    size="sm"
                                    color="primary"
                                    className={filterMode === "ALL" ? "font-bold" : "border-empacts-grey-50 border-1 font-bold"}
                                    variant={filterMode === "ALL" ? "solid" : "bordered"}
                                    radius="full"
                                    onPress={() => setFilterMode("ALL")}
                                >
                                    All
                                </Button>
                                <Button
                                    size="sm"
                                    color="primary"
                                    className={filterMode === "ACCEPTED" ? "font-bold" : "border-empacts-grey-50 border-1 font-bold"}
                                    variant={filterMode === "ACCEPTED" ? "solid" : "bordered"}
                                    radius="full"
                                    onPress={() => setFilterMode("ACCEPTED")}
                                >
                                    Accepted
                                </Button>
                                <Button
                                    size="sm"
                                    color="primary"
                                    className={filterMode === "PENDING" ? "font-bold" : "border-empacts-grey-50 border-1 font-bold"}
                                    variant={filterMode === "PENDING" ? "solid" : "bordered"}
                                    radius="full"
                                    onPress={() => setFilterMode("PENDING")}
                                >
                                    Pending
                                </Button>
                            </div>
                        </div>
                        {filterMentorIndexes.map((idx) => (
                            <MatchingMentorCard
                                key={mentorList[idx].id}
                                name={mentorList[idx].name}
                                location={getProvince(mentorList[idx]?.locationBased || '')}
                                status={matches?.[idx]?.status || ''}
                                avatarUrl={mentorList[idx].avtUrl}
                                onCardClick={() => setSelectedMentorIndex(idx)}
                            />
                        ))}
                    </div>
                </div>

                <Spacer x={4} />
                <div className="w-[70%]">
                    {filterMentorIndexes.length > 0 && (
                        <MatchingInfoCard
                            startupId={startupId}
                            connectRequestCode={(matches as Matching[] | null)?.[filteredSelectedIndex]?.connectRequestCode || ''}
                            title={mentorList[filteredSelectedIndex]?.name || ''}
                            location={getProvince(mentorList[filteredSelectedIndex]?.locationBased || '')}
                            avtUrl={mentorList[filteredSelectedIndex]?.avtUrl || ''}
                            status={(matches as Matching[] | null)?.[filteredSelectedIndex]?.status || ''}
                            schedule={(matches as Matching[] | null)?.[filteredSelectedIndex]?.requestSchedule || ''}
                            meetingLink={(matches as Matching[] | null)?.[filteredSelectedIndex]?.meetingLink || ''}
                            note={(matches as Matching[] | null)?.[filteredSelectedIndex]?.note || ''}
                        />
                    )}
                </div>
            </div>
        ) : (
            <div className='flex justify-center items-center h-[50%]'>
                <Spinner classNames={{ label: "text-foreground mt-4" }} label="The system is finding your matching activity. Please wait..." variant="wave" />
            </div>
        )
    );
}

export default MatchingActivitySection;