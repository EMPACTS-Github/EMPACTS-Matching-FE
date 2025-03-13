import Image, { StaticImageData } from "next/image";
import React from "react";
import FavoriteIcon from "/public/assets/favorite-icon.svg";
import FavoriteFilledIcon from "/public/assets/favorite-filled-icon.svg";
import TextLine from "../common/TextLine";
import {Progress} from "@heroui/react";

interface MentorCardProps {
    name: string;
    location: string;
    avatarUrl: string | StaticImageData;
    description: string;
    matchScore: number;
    onFavoriteClick: () => void;
    isFavorite: boolean;
}

const MentorCard: React.FC<MentorCardProps> = ({
    name,
    location,
    avatarUrl,
    description,
    matchScore,
    onFavoriteClick,
    isFavorite,
}) => {
    const matchLabel = matchScore >= 70 ? "Strong match" : matchScore >= 50 ? "Normal match" : "Weak match";
    const matchColor = matchScore >= 70 ? "success" : matchScore >= 50 ? "warning" : "danger";

    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center w-full">
            <Image
                src={avatarUrl}
                alt={name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full"
            />
            <div className="flex-grow ml-4">
                <div className="flex items-center justify-between">
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
                <TextLine text={location} className="text-gray-500 text-xs" />
                <TextLine text={description} className="text-gray-600 mt-2 text-[10px]" />
                <Progress
                    classNames={{
                        base: "max-w-md gap-0.5 mt-2",
                        label: "font-semibold text-[12px] text-default-600",
                    }}
                    label={matchLabel}
                    color={matchColor}
                    maxValue={100}
                    size="sm"
                    value={matchScore}
                />
            </div>
        </div>
    );
}

export default MentorCard;
