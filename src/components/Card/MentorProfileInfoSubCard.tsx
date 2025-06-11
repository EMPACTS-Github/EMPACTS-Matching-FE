import { Card, CardHeader, CardBody, CardFooter, Divider, Button, useDisclosure, Avatar } from "@heroui/react";
import React from "react";
import { Mentor } from "@/interfaces/MentorProfile";

interface MentorProfileInfoSubCardProps {
    countMatches: number;
    mentorProfile: Mentor;
}
const MentorProfileInfoSubCard: React.FC<MentorProfileInfoSubCardProps> = ({ countMatches, mentorProfile }) => {
    // const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <Card className="bg-white min-w-lg shadow-lg rounded-lg px-4 py-2">

            <CardHeader className="flex flex-col gap-3 items-center" >
                <Avatar
                    alt="heroui logo"
                    src={mentorProfile?.avtUrl}
                    className="w-20 h-20"
                    radius="full"
                />
                <div className="flex flex-col justify-center items-center">
                    <p className="font-semibold text-xl text-gray-800">{mentorProfile?.name}</p>
                    <p className="text-gray-400 text-xs">@{mentorProfile?.mentorUsername}</p>
                </div>
            </CardHeader>
            <CardBody>
                <Divider />
                <div className="flex justify-around items-center p-2">
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-semibold text-lg text-gray-800 py-1">{countMatches}</p>
                        <p className="text-gray-400 text-xs">Matches</p>
                    </div>
                </div>
                {/* <Divider /> */}
            </CardBody>

            {/* <CardFooter>
                <Button className="w-full font-bold" variant="bordered" color="primary">
                    SETTINGS
                </Button> */}
            {/* <MentorSettingModal isOpen={isOpen} onOpenChange={onOpenChange} /> */}
            {/* </CardFooter> */}
        </Card >
    );
}

export default MentorProfileInfoSubCard;