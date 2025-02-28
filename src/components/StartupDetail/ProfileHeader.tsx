import { Avatar } from "@heroui/react";
import Image from 'next/image';
import GroupIcon from '/public/assets/group.png';
import LabelIcon from '/public/assets/label.png';
import { Startup } from "@/utils/interfaces/startup";


const ProfileHeader = ({ startup }: { startup: Startup | null }) => {
    return (
        <div className="p-4 mb-2">
            <div className="flex items-center">
                <Avatar src="https://via.placeholder.com/150" size="lg" />
                <div className="flex flex-col ml-4">
                    <h3 className="text-xl font-bold text-gray-800">{startup?.name}</h3>
                    <p className="text-gray-500 text-md">{startup?.location_based}</p>
                </div>
            </div>
            <div className="flex w-full gap-x-3 mt-4 p-2">
                <div className="flex items-center gap-1 overflow-hidden">
                    <Image src={LabelIcon} alt="Project" width={24} height={24} className="object-cover" />
                    <span className="font-inter font-semibold text-base text-black text-center truncate">
                        {startup?.category}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <Image src={GroupIcon} alt="Members" width={24} height={24} className="object-cover" />
                    <span className="font-inter font-semibold text-base text-black text-center">
                        3 Members
                    </span>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-gray-500 text-xs">Startup Bio...</p>
            </div>
        </div>
    );
};

export default ProfileHeader;
