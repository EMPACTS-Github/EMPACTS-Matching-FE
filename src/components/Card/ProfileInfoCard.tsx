import Image from "next/image";
import React from "react";
import FavoriteIcon from "/public/assets/favorite-icon.svg";
import FavoriteFilledIcon from "/public/assets/favorite-filled-icon.svg";
import ExternalIcon from "/public/assets/external-icon.svg";
import { Button } from "@heroui/react";
import AvatarPlaceholder from "/public/assets/avatar-placeholder.png";
import Label from "/public/assets/label.svg";
import Star from "/public/assets/star.svg";
import IconText from "../common/IconText";
import TitleWithDescription from "../common/TitleWithDescription";
import TextLine from "../common/TextLine";

interface ProfileInfoCardProps {
    title: string;
    location: string;
    description: string;
    bio: string;
    rating: number;
    sdg: string;
    onFavoriteClick: () => void;
    isFavorite: boolean;
    className?: string;
};

const FlashIcon = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.9105 10.7199H14.8205V3.5199C14.8205 1.8399 13.9105 1.4999 12.8005 2.7599L12.0005 3.6699L5.2305 11.3699C4.3005 12.4199 4.6905 13.2799 6.0905 13.2799H9.1805V20.4799C9.1805 22.1599 10.0905 22.4999 11.2005 21.2399L12.0005 20.3299L18.7705 12.6299C19.7005 11.5799 19.3105 10.7199 17.9105 10.7199Z" fill="white"/>
        </svg>
    );
}

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({
    title,
    location,
    description,
    bio,
    rating,
    sdg,
    onFavoriteClick,
    isFavorite,
    className = '',
}) => {
    return (
        <div className={`bg-white rounded-lg shadow-md p-6 gap-y-6 flex flex-col ${className}`}>
            <div className="flex justify-between">
                <Image 
                    src={AvatarPlaceholder} 
                    alt={title} 
                    width={80} 
                    height={80}
                    className="mr-4 h-20 w-20 rounded-full"
                />
                <div className="items-center justify-between flex-grow">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[28px] font-semibold text-black">{title}</h3>
                        <div className="flex items-center gap-2">
                            <Image
                                onClick={onFavoriteClick}
                                src={isFavorite ? FavoriteFilledIcon : FavoriteIcon}
                                alt="Favorite"
                                width={24}
                                height={24}
                                className="cursor-pointer"
                            />
                            <Image 
                                src={ExternalIcon} 
                                alt="External"
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <TextLine text={location} className="text-black text-[20px]" />
                        <Button
                            type="submit"
                            color="primary"
                            size="lg"
                            className="rounded-lg bg-[#7f00ff] border-[#7f00ff] text-[18px]"
                            startContent={<FlashIcon />}
                        >
                            Connect 
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex gap-x-4">
                <IconText icon={Label} text={sdg} alt="SDG" />
                <IconText icon={Star} text={rating} alt="Rating" />
            </div>
            <div className="flex flex-col gap-y-2">
                <TitleWithDescription title="Bio" description={bio} />
                <TitleWithDescription title="Description" description={description} />
            </div>
        </div>
    );
}

export default ProfileInfoCard;
