import { Card, CardHeader, CardBody, CardFooter, Divider, Button, useDisclosure, Avatar } from "@heroui/react";
import SettingModal from "@/components/Modal/SettingModal";
import { Startup } from "@/interfaces/StartupProfile";
import { Skeleton } from "@heroui/skeleton";


interface ProfileInfoSubCardProps {
    startup: Startup;
    isOwner: boolean | undefined;
    countMatches: number;
}
const ProfileInfoSubCard: React.FC<ProfileInfoSubCardProps> = ({ startup, isOwner, countMatches }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <Card className="bg-white min-w-lg shadow-lg rounded-lg px-4 py-2">

            <CardHeader className="flex flex-col gap-3 items-center" >
                <Avatar
                    alt="heroui logo"
                    src={startup.avtUrl}
                    className="w-20 h-20"
                    radius="full"
                />
                <div className="flex flex-col justify-center items-center">
                    <p className="font-semibold text-xl text-gray-800">{startup.name}</p>
                    <p className="text-gray-400 text-xs">@{startup.startupUsername}</p>
                </div>
            </CardHeader>
            <CardBody>
                <Divider />

                <div className="flex justify-around items-center p-2">
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-semibold text-lg text-gray-800 py-1">{startup.memberQty}</p>
                        <p className="text-gray-400 text-xs">Members</p>
                    </div>
                    <Divider orientation="vertical" className="h-14" />
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-semibold text-lg text-gray-800 py-1">{countMatches}</p>
                        <p className="text-gray-400 text-xs">Matches</p>
                    </div>
                </div>
                <Divider />
            </CardBody>

            <CardFooter>
                <Button onPress={onOpen} className="w-full font-bold" variant="ghost" color="primary" isDisabled={!isOwner}>
                    SETTINGS
                </Button>
                <SettingModal isOpen={isOpen} onOpenChange={onOpenChange} startup={startup} />
            </CardFooter>
        </Card >
    );
}

export default ProfileInfoSubCard;