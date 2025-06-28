import { Card, CardHeader, CardBody, CardFooter, Divider, Button, useDisclosure, Avatar } from "@heroui/react";
import SettingModal from "@/components/Modal/SettingModal";
import { Startup } from "@/interfaces/StartupProfile";
import { Skeleton } from "@heroui/skeleton";


interface ProfileInfoSubCardProps {
    startup: Startup;
    isOwner: boolean | undefined;
    countMatches: number;
    onFetchStartupProfile: () => Promise<void>;
}
const ProfileInfoSubCard: React.FC<ProfileInfoSubCardProps> = ({ startup, isOwner, countMatches, onFetchStartupProfile }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <Card className="bg-white min-w-lg shadow-lg rounded-lg px-4 py-2">
            <CardHeader className="flex flex-col gap-3 items-center" >
                <Avatar
                    alt="heroui logo"
                    src={startup.avtUrl}
                    className="w-20 h-20 bg-white"
                    radius="full"
                    isBordered
                    color="primary"
                />
                <div className="flex flex-col justify-center items-center">
                    <p className="font-semibold text-xl text-gray-800">{startup.name}</p>
                    <p className="text-gray-400 text-xs mb-2">@{startup.startupUsername}</p>
                    <p className={`text-sm font-semibold ${startup.status === "ACTIVATED" ? "text-success" : "text-gray-500"}`}>{startup.status === "ACTIVATED" ? "Active" : startup.status === "ARCHIVED" ? "Archived" : "Deactivated"}</p>
                </div>
            </CardHeader>
            <CardBody className="py-0">
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
            <CardFooter className="pt-4">
                <Button onPress={onOpen} className="w-full font-bold" variant="ghost" color="primary" isDisabled={!isOwner}>
                    SETTINGS
                </Button>
                <SettingModal onFetchStartupProfile={onFetchStartupProfile} isOpen={isOpen} onOpenChange={onOpenChange} startup={startup} />
            </CardFooter>
        </Card >
    );
}

export default ProfileInfoSubCard;