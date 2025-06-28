import Image from "next/image";
import React from "react";
import FavoriteIcon from "/public/assets/favorite-icon.svg";
import FavoriteFilledIcon from "/public/assets/favorite-filled-icon.svg";
import TextLine from "@/components/common/TextLine";
import { Avatar, Progress } from "@heroui/react";
import { Card } from "@heroui/card";

interface MentorCardProps {
    name: string;
    location: string | undefined;
    avatarUrl: string | undefined;
    description: string;
    matchScore: number;
    onFavoriteClick: () => void;
    isFavorite: boolean;
    onCardClick: () => void;
}

const MentorCard: React.FC<MentorCardProps> = ({
    name,
    location,
    avatarUrl,
    description,
    matchScore,
    onFavoriteClick,
    isFavorite,
    onCardClick
}) => {
    const matchLabel = matchScore >= 70 ? "Strong match" : matchScore >= 50 ? "Normal match" : "Weak match";
    const matchColor = matchScore >= 70 ? "success" : matchScore >= 50 ? "warning" : "danger";

    return (
        <Card fullWidth isPressable className="flex flex-row gap-2 bg-white rounded-md px-4 py-4 items-center shadow-md" onPress={onCardClick}>
            <div className="w-[25%]">
                <Avatar
                    src={avatarUrl}
                    alt={name}
                    color="primary"
                    isBordered
                    size="lg"
                    radius="full"
                    className="bg-white"
                />
            </div>

            <div className="flex flex-col justify-start w-[75%]">
                <div className="flex justify-between items-center w-full">
                    <div className="text-md font-semibold text-black">{name}</div>
                    <button onClick={onFavoriteClick}>
                        <Image
                            src={isFavorite ? FavoriteFilledIcon : FavoriteIcon}
                            alt="Favorite"
                        />
                    </button>
                </div>
                <TextLine text={location} className="text-gray-500 text-xs text-left" />
                <TextLine text={description} className="text-gray-600 mt-2 text-[10px] text-left line-clamp-3" />
                <Progress
                    classNames={{
                        base: "w-full gap-0.5 mt-2",
                        label: "font-semibold text-[12px] text-default-600",
                    }}
                    label={matchLabel}
                    color={matchColor}
                    showValueLabel={true}
                    maxValue={100}
                    size="sm"
                    value={matchScore}
                />
            </div>
        </Card>
    );
}

export default MentorCard;
