import { Avatar } from "@heroui/react";
import Image from 'next/image';
import LabelIcon from '/public/assets/label.png';
import { getProvince } from "@/utils/getProvince";
import { getSDGGoal } from "@/utils/getSDGGoal";
import { Mentor } from "@/interfaces/MentorProfile";


interface ProfileHeaderProps {
    mentorProfile: Mentor
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ mentorProfile }) => {

    return (
        <div className="mb-2">
            <div className="flex items-center">
                <Avatar showFallback isBordered src={mentorProfile?.avtUrl} size="lg" radius="sm" className="bg-white" color="primary" />
                <div className="flex flex-col ml-4">
                    <h3 className="text-xl font-bold text-gray-800">{mentorProfile?.name}</h3>
                    <p className="text-gray-500 text-md">{getProvince(mentorProfile?.locationBased || "")}</p>
                </div>
            </div>
            <div className="flex w-full gap-x-3 mt-4">
                <div className="flex flex-col items-start justify-center gap-1 overflow-hidden">
                    {Array.isArray(mentorProfile?.sdgFocusExpertises) && mentorProfile.sdgFocusExpertises.length > 0 ? (
                        mentorProfile.sdgFocusExpertises.map((sdg, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                                <Image src={LabelIcon} alt="Project" width={24} height={24} className="object-cover" />
                                <span className="font-inter font-semibold text-base text-black text-center truncate">
                                    {getSDGGoal(sdg)}
                                </span>
                            </div>
                        ))
                    ) : (
                        <span className="font-inter font-semibold text-base text-black text-center truncate">
                            No SDG Focus
                        </span>
                    )}
                </div>
            </div>
        </div >
    );
};

export default ProfileHeader;
