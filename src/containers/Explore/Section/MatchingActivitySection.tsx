import Image from "next/image";
import React, { useState, useEffect } from "react";
import { startup_matching_activity } from "@/apis/startup-matching";
import { Spinner } from "@heroui/react";



interface MatchingActivitySectionProps {
    startupId: string;
};

const MatchingActivitySection: React.FC<MatchingActivitySectionProps> = ({
    startupId
}) => {
    const [matches, setMatches] = useState()
    useEffect(() => {
        const fetchMatching = async () => {
            try {
                const data = await startup_matching_activity(startupId);
                setMatches(data.data);
            } catch (err) {
                console.error('Failed to fetch startup profile:', err);
            }
        };
        fetchMatching();
    }, [startupId]);
    return (
        // {
        //     matches.length !== 0 ? (
        //         <div className='flex justify-between gap-4 p-4 flex-1 overflow-hidden'>
        //             <div className='flex flex-col gap-4 w-[30%] overflow-y-auto h-full pr-2 custom-scrollbar'>
        //                 {matches.map((match, index) => {
        //                     return (
        //                     );
        //                 })}
        //             </div>
        //             <MatchingActivityCard />
        //         </div>
        //     ) : (
        //         <div className='flex justify-center items-center h-[50%]'>
        //             <Spinner classNames={{ label: "text-foreground mt-4" }} label="The system is finding the best mentors for you. Please wait..." variant="wave" />
        //         </div>
        //     )
        // }
    )
}

export default MatchingActivitySection;
