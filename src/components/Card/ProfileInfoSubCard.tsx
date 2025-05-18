import { Card, CardHeader, CardBody, CardFooter, Divider, Button, useDisclosure, Avatar } from "@heroui/react";
import SettingModal from "@/components/Modal/SettingModal";
import { Startup } from "@/interfaces/StartupProfile";
import { Skeleton } from "@heroui/skeleton";


interface ProfileInfoSubCardProps {
    startup: Startup | undefined;
    member_count: number | undefined;
}
const ProfileInfoSubCard: React.FC<ProfileInfoSubCardProps> = ({ startup, member_count }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <Card className="bg-white min-w-lg shadow-lg rounded-lg px-4 py-2">
            {startup ? (
                <CardHeader className="flex flex-col gap-3 items-center" >
                    <Avatar
                        alt="heroui logo"
                        src={startup.avt_url}
                        className="w-20 h-20"
                        radius="full"
                    />
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-semibold text-xl text-gray-800">{startup?.name}</p>
                        <p className="text-gray-400 text-xs">@{startup?.name.toLowerCase()}</p>
                    </div>
                </CardHeader>) : (
                <div className="rounded-full flex items-center justify-center">
                    <Skeleton className="h-20 w-20 rounded-full bg-default-300" />
                </div>
            )
            }
            <CardBody>
                <Divider />
                {member_count ? (
                    <div className="flex justify-around items-center p-2">
                        <div className="flex flex-col justify-center items-center">
                            <p className="font-semibold text-lg text-gray-800 py-1">{member_count}</p>
                            <p className="text-gray-400 text-xs">Members</p>
                        </div>
                        <Divider orientation="vertical" className="h-14" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="font-semibold text-lg text-gray-800 py-1">2</p>
                            <p className="text-gray-400 text-xs">Matches</p>
                        </div>
                    </div>) : (
                    <div className="flex gap-6 justify-center items-center p-2">
                        <Skeleton className="h-8 w-20 rounded-full bg-default-300" />
                        <Divider orientation="vertical" className="h-14" />
                        <Skeleton className="h-8 w-20 rounded-full bg-default-300" />
                    </div>
                )}
                <Divider />
            </CardBody>

            <CardFooter>
                <Button onPress={onOpen} className="w-full bg-white text-gray-400" variant="ghost">
                    SETTINGS
                </Button>
                <SettingModal isOpen={isOpen} onOpenChange={onOpenChange} startup={startup} />
            </CardFooter>
        </Card >
    );
}

export default ProfileInfoSubCard;