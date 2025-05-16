import Image from "next/image";
import React from "react";
import FavoriteIcon from "/public/assets/favorite-icon.svg";
import FavoriteFilledIcon from "/public/assets/favorite-filled-icon.svg";
import ExternalIcon from "/public/assets/external-icon.svg";
import { Button } from "@heroui/react";
import AvatarPlaceholder from "/public/assets/avatar-placeholder.png";
import Label from "/public/assets/label.svg";
import Star from "/public/assets/star.svg";
import IconText from "@/components/common/IconText";
import TitleWithDescription from "@/components/common/TitleWithDescription";
import TextLine from "@/components/common/TextLine";
import FlashIcon from "@/components/Icons/FlashIcon";

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
    onClickButton?: () => void;
};

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
    onClickButton,
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
                            className="rounded-lg bg-empacts border-empacts text-lg text-white"
                            startContent={<FlashIcon className="text-white" />}
                            onPress={onClickButton}
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
