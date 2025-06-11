import React, { useState, useEffect } from "react";
import { Spinner, Button } from "@heroui/react";
import { Spacer } from "@heroui/spacer";
import { startup_profile_detail } from "@/apis/mentor";
import { Startup } from "@/interfaces/StartupProfile";
import MatchingMentorCard from "@/components/Card/MatchingMentorCard";
import { getProvince } from "@/utils/getProvince";
import MatchingRequestInfoCard from "@/components/Card/MatchingRequestInfoCard";
import { useMatchingRequestListStore } from "@/stores/matching-store";
import { useErrorStore } from "@/stores/error-store";
import { Matching } from "@/interfaces/matching";
import { useMentorIdStore } from "@/stores/mentor-store";

interface MentorExploreContainerProps {
    mentorId?: string | undefined;
};

const MentorExploreContainer: React.FC<MentorExploreContainerProps> = ({
    mentorId
}) => {
    const matches = useMatchingRequestListStore(state => state.matchingRequestList);
    const [startupList, setStartupList] = useState<Startup[]>([]);
    const [selectedMatchIndex, setSelectedMatchIndex] = useState<number>(0);
    const error = useErrorStore(state => state.error);
    const setError = useErrorStore(state => state.setError);
    const [filterMode, setFilterMode] = useState<"ALL" | "ACCEPTED" | "PENDING">("ALL");
    const filterMatchIndexes = matches && startupList.length
        ? matches
            .map((match, idx) => ({ match, idx }))
            .filter(({ match }) =>
                filterMode === "ALL" ||
                (filterMode === "ACCEPTED" && match.status === "ACCEPTED") ||
                (filterMode === "PENDING" && match.status === "PENDING")
            )
            .map(({ idx }) => idx)
        : [];

    const filteredSelectedIndex = filterMatchIndexes.includes(selectedMatchIndex)
        ? selectedMatchIndex
        : filterMatchIndexes[0] ?? 0;

    useEffect(() => {
        const fetchAllStartupDetails = async () => {
            if (!matches || matches.length === 0) {
                setStartupList([]);
                return;
            }
            try {
                const startupDetails = await Promise.all(
                    matches.map(async (match) => {
                        const response = await startup_profile_detail(match.startupId || '', mentorId || '');
                        const startupData = response.data.startup;
                        return {
                            id: startupData.id,
                            name: startupData.name,
                            startupUsername: startupData.startupUsername,
                            phone: startupData.phone,
                            avtUrl: startupData.avtUrl,
                            status: startupData.status,
                            description: startupData.description,
                            sdgGoal: startupData.sdgGoal,
                            startupLink: startupData.startupLink,
                            locationBased: startupData.locationBased,
                            credential: startupData.credential,
                            languagesSpoken: startupData.languagesSpoken,
                            marketFocus: startupData.marketFocus,
                            startupState: startupData.startupState,
                            haveActiveUse: startupData.haveActiveUse,
                            revenue: startupData.revenue,
                            otherParticipatedDetail: startupData.otherParticipatedDetail,
                            legalEquityDetail: startupData.legalEquityDetail,
                            investmentDetail: startupData.investmentDetail,
                            fundraisingDetail: startupData.fundraisingDetail,
                            memberQty: startupData.memberQty,
                        } as Startup;
                    })
                );
                setStartupList(startupDetails);
            } catch (err) {
                setStartupList([]);
                setError("Failed to fetch Startup details.");
            }
        };
        fetchAllStartupDetails();
    }, [matches]);

    if (error) {
        return (
            <div className='flex justify-center items-center h-[50%]'>
                <span className="text-gray-500 text-lg">{error}</span>
            </div>
        );
    }

    return (
        startupList.length > 0 ? (
            <div className="flex w-full px-4 relative z-10 gap-0 mt-6">
                <div className="mx-0 w-[33%] flex flex-col justify-start">
                    <div className="flex flex-col gap-2 overflow-y-auto h-full pr-2 custom-scrollbar">
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
                        {filterMatchIndexes.map((idx) => (
                            <MatchingMentorCard
                                key={startupList[idx].id}
                                name={startupList[idx].name}
                                location={getProvince(startupList[idx]?.locationBased || '')}
                                status={matches?.[idx]?.status || ''}
                                avatarUrl={startupList[idx].avtUrl}
                                onCardClick={() => setSelectedMatchIndex(idx)}
                            />
                        ))}
                    </div>
                </div>

                <Spacer x={4} />
                <div className="w-[67%]">
                    {filterMatchIndexes.length > 0 && (
                        <MatchingRequestInfoCard
                            connectRequestCode={(matches as Matching[] | null)?.[filteredSelectedIndex]?.connectRequestCode || ''}
                            title={startupList[filteredSelectedIndex]?.name || ''}
                            location={getProvince(startupList[filteredSelectedIndex]?.locationBased || '')}
                            avtUrl={startupList[filteredSelectedIndex]?.avtUrl || ''}
                            status={(matches as Matching[] | null)?.[filteredSelectedIndex]?.status || ''}
                            schedule={(matches as Matching[] | null)?.[filteredSelectedIndex]?.requestSchedule || ''}
                            meetingLink={(matches as Matching[] | null)?.[filteredSelectedIndex]?.meetingLink || ''}
                            note={(matches as Matching[] | null)?.[filteredSelectedIndex]?.note || ''}
                            mentorId={mentorId || ''}
                        />
                    )}
                </div>
            </div>
        ) : (
            <div className='flex justify-center items-center h-[50%]'>
                <Spinner classNames={{ label: "text-foreground mt-4" }} label="The system is finding your matching reuquest. Please wait..." variant="wave" />
            </div>
        )
    );
}

export default MentorExploreContainer;