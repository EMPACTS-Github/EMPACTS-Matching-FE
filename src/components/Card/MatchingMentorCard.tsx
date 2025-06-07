import Image from "next/image";
import React from "react";
import { Card } from "@heroui/card";
import TextLine from "@/components/common/TextLine";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { MATCHING_STATUS } from "@/constants/matching";

interface MatchingMentorCardProps {
    name: string;
    location: string | undefined;
    status: string;
    avatarUrl: string;
    onCardClick: () => void;
}

const MatchingMentorCard: React.FC<MatchingMentorCardProps> = ({
    name,
    location,
    status,
    avatarUrl,
    onCardClick
}) => {
    return (
        <Card fullWidth isPressable className="flex flex-row rounded-md px-4 py-4 items-center shadow-sm" onPress={onCardClick}>
            <Image
                src={avatarUrl}
                alt={`${name}'s avatar`}
                width={100}
                height={100}
                className="rounded-full mb-4"
            />
            <div className="flex flex-col justify-start ml-4">
                <div className="text-lg font-semibold text-black">{name}</div>
                <TextLine text={location} className="text-gray-600 text-sm text-left line-clamp-1" />
                <div className="flex gap-2 items-center mt-2">
                    <div className="font-semibold">Status:</div>
                    <div className={`font-semibold ${status === MATCHING_STATUS.ACCEPTED ? "text-success" : "text-gray-500"}`}>
                        {capitalizeFirstLetter(status)}
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default MatchingMentorCard;