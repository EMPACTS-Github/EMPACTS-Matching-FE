import Image, { StaticImageData } from "next/image";
import React from "react";
import FavoriteIcon from "/public/assets/favorite-icon.svg";
import FavoriteFilledIcon from "/public/assets/favorite-filled-icon.svg";
import TextLine from "@/components/common/TextLine";
import { Progress } from "@heroui/react";
import { Card } from "@heroui/card";

interface MentorCardProps {
    name: string;
    location: string | undefined;
    avatarUrl: string | StaticImageData;
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
        <Card fullWidth isPressable className="flex flex-row bg-white rounded-md px-4 py-4 items-center shadow-md" onPress={onCardClick}>
            <Image
                src={avatarUrl}
                alt={name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col justify-start ml-4">
                <div className="flex justify-between">
                    <h3 className="text-lg font-semibold text-black">{name}</h3>
                    <button onClick={onFavoriteClick}>
                        <Image
                            src={isFavorite ? FavoriteFilledIcon : FavoriteIcon}
                            alt="Favorite"
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
                <TextLine text={location} className="text-gray-500 text-xs text-left" />
                <TextLine text={description} className="text-gray-600 mt-2 text-[10px] text-left line-clamp-1" />
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
