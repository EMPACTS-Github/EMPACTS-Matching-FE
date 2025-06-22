import Image from "next/image";
import React from "react";
import { Card } from "@heroui/card";
import TextLine from "@/components/common/TextLine";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { MATCHING_STATUS } from "@/constants/matching";
import { Avatar } from "@heroui/react";

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
        <Card fullWidth isPressable className="flex flex-row gap-2 rounded-md px-4 py-4 items-center shadow-sm" onPress={onCardClick}>
            <div className="w-[25%]">
                <Avatar
                    src={avatarUrl}
                    alt={`${name}'s avatar`}
                    color="primary"
                    isBordered
                    size="lg"
                    radius="full"
                    className="bg-white"
                />
            </div>
            <div className="flex flex-col justify-start w-[75%]">
                <div className="text-lg font-semibold text-black text-left">{name}</div>
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