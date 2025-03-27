import { Avatar } from "@heroui/react";
import Image from 'next/image';
import GroupIcon from '/public/assets/group.png';
import LabelIcon from '/public/assets/label.png';
import { Startup } from "@/utils/interfaces/startup";

interface ProfileHeaderProps {
    startup: Startup | null;
    locationLabel?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ startup, locationLabel }) => {
    return (
        <div className="flex items-start justify-between mb-6 border-b pb-6">
            <div className="flex items-center">
                <div className="h-20 w-20 bg-gray-200 rounded-full mr-6 relative overflow-hidden">
                    {startup?.avt_url ? (
                        <Image
                            src={startup.avt_url}
                            alt={startup.name || "Startup"}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full w-full bg-gray-300 text-gray-600">
                            {startup?.name?.charAt(0) || "S"}
                        </div>
                    )}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{startup?.name}</h1>
                    <p className="text-gray-600">
                        {locationLabel || "Location not specified"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
