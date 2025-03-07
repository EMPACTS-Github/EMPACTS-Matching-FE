import Image from "next/image";
import React from "react";
import FavoriteIcon from "/public/assets/favorite-icon.svg";
import FavoriteFilledIcon from "/public/assets/favorite-filled-icon.svg";

interface MentorCardProps {
    name: string;
    location: string;
    avatarUrl: string;
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
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <Image
                src={avatarUrl}
                alt={name}
                width={64}
                height={64}
            />
            <div className="flex-grow ml-4">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-gray-500">{location}</p>
                <p className="text-gray-600 mt-2">{description}</p>
            </div>
        </div>
    );
}
