import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from "@heroui/react";
import Image from "next/image";
import AvatarPlaceholder from '/public/assets/avatar-placeholder.png';
import { Startup } from "@/interfaces/StartupProfile";

interface ProfileInfoSubCardProps {
    startup: Startup | undefined;
    member_count: number | undefined;
}
const ProfileInfoSubCard: React.FC<ProfileInfoSubCardProps> = ({ startup, member_count }) => {
    return (
        <Card className="bg-white shadow-lg rounded-lg px-4 py-2 ml-20">
            <CardHeader className="flex flex-col gap-3">
                <Image
                    alt="heroui logo"
                    height={80}
                    className="rounded-full"
                    src={AvatarPlaceholder}
                    width={80}
                />
                <div className="flex flex-col justify-center items-center">
                    <p className="font-semibold text-xl text-gray-800">{startup?.name}</p>
                    <p className="text-gray-400 text-xs">@{startup?.name.toLowerCase()}</p>
                </div>
            </CardHeader>
            <CardBody>
                <Divider />
                <div className="flex gap-6 justify-center items-center p-2">
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-semibold text-lg text-gray-800 py-1">{member_count}</p>
                        <p className="text-gray-400 text-xs">Members</p>
                    </div>
                    <Divider orientation="vertical" className="h-14" />
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-semibold text-lg text-gray-800 py-1">2</p>
                        <p className="text-gray-400 text-xs">Matches</p>
                    </div>
                </div>
                <Divider />
            </CardBody>

            <CardFooter>
                <Button className="w-full bg-white text-gray-400" variant="ghost">
                    SETTINGS
                </Button>
            </CardFooter>
        </Card>
    );
}

export default ProfileInfoSubCard;