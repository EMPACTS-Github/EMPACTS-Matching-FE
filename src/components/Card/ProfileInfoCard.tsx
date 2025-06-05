import Image from "next/image";
import React from "react";
import FavoriteIcon from "/public/assets/favorite-icon.svg";
import FavoriteFilledIcon from "/public/assets/favorite-filled-icon.svg";
import { Button } from "@heroui/react";
import Label from "/public/assets/label.svg";
import Star from "/public/assets/star.svg";
import IconText from "@/components/common/IconText";
import TitleWithDescription from "@/components/common/TitleWithDescription";
import TextLine from "@/components/common/TextLine";
import UserPlusIcon from "@/components/Icons/UserPlusIcon";

interface ProfileInfoCardProps {
    title: string;
    location: string | undefined;
    description: string;
    rating: number;
    sdg: string;
    onFavoriteClick: () => void;
    isFavorite: boolean;
    avtUrl: string
    className?: string;
    onClickButton?: () => void;
};

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({
    title,
    location,
    description,
    rating,
    avtUrl,
    sdg,
    onFavoriteClick,
    isFavorite,
    className = '',
    onClickButton,
}) => {
    return (
        <div className={`bg-white rounded-lg shadow-xl p-6 gap-y-6 flex flex-col h-fit ${className}`}>
            <div className="flex justify-start">
                <Image
                    src={avtUrl}
                    alt={title}
                    width={80}
                    height={80}
                    className="mr-6 h-20 w-20 rounded-full"
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
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <TextLine text={location} className="text-black text-[20px]" />
                        <Button
                            type="submit"
                            color="primary"
                            size="md"
                            variant="solid"
                            radius="md"
                            startContent={<UserPlusIcon className="text-white" />}
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
            <div className="flex flex-col gap-y-3">
                <TitleWithDescription title="Description" description={description} />
            </div>
        </div>
    );
}

export default ProfileInfoCard;
