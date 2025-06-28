import Image from "next/image";
import React, { useState } from "react";
import { Avatar, Button, TimeInput, addToast } from "@heroui/react";
import TextLine from "@/components/common/TextLine";
import { MATCHING_STATUS } from "@/constants/matching";
import UserRightIcon from "@/components/Icons/UserRightIcon";
import { DateInput } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import ClockIcon from "@/components/Icons/ClockIcon";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { getCalendarDateAndTime } from "@/utils/convertDateToDateAndTime";
import { Snippet } from "@heroui/react";
import { response_matching_request } from "@/apis/mentor-matching";
import { Spinner } from "@heroui/spinner";
import { Tab, Tabs } from "@heroui/react";
import { Startup } from "@/interfaces/StartupProfile";
import { Member } from "@/interfaces/StartupProfile";
import LabelIcon from '/public/assets/label.png';
import { getSDGGoal } from "@/utils/getSDGGoal";

interface MatchingRequestInfoCardProps {
    connectRequestCode: string;
    title: string;
    location: string | undefined;
    avtUrl: string;
    status: string;
    meetingLink: string;
    schedule: Date | string;
    note: string;
    mentorId: string;
    startup: Startup;
    startupMembers: Member[];
};

const MatchingRequestInfoCard: React.FC<MatchingRequestInfoCardProps> = ({
    connectRequestCode,
    title,
    location,
    status,
    meetingLink,
    schedule,
    note,
    avtUrl,
    mentorId,
    startup,
    startupMembers,
}) => {
    const { calendarDate, time } = getCalendarDateAndTime(schedule);
    const [isLoading, setIsLoading] = useState(false);

    const onMeetingButtonClick = () => {
        if (meetingLink) {
            let url = meetingLink.trim();
            if (!/^https?:\/\//i.test(url)) {
                url = "https://" + url;
            }
            window.open(url, "_blank", "noopener,noreferrer");
        }
    };

    const handleAcceptRequestClick = async () => {
        setIsLoading(true);
        try {
            const response = await response_matching_request(MATCHING_STATUS.ACCEPTED, mentorId, connectRequestCode);
            if (response.code === "RESPONSE_REQUEST_SENT") {
                addToast({
                    title: 'Accepted Matching Request',
                    color: 'success',
                    timeout: 5000,
                });
            }
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error("Failed to accept request:", error);
            addToast({
                title: 'Response Matching Request failed',
                color: 'danger',
                timeout: 5000,
            });
            setIsLoading(false);
        }
    };

    const handleRejectRequestClick = async () => {
        setIsLoading(true);
        try {
            const response = await response_matching_request(MATCHING_STATUS.REJECTED, mentorId, connectRequestCode);
            if (response.code === "RESPONSE_REQUEST_SENT") {
                addToast({
                    title: 'Rejected Matching Request',
                    color: 'success',
                    timeout: 5000,
                });
            }
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error("Failed to reject request:", error);
            addToast({
                title: 'Response Matching Request failed',
                color: 'danger',
                timeout: 5000,
            });
            setIsLoading(false);
        }
    };
    return (
        <div className={`bg-white rounded-lg shadow-xl py-6 px-8 gap-y-4 flex flex-col`}>
            <div className="flex justify-between items-end">
                <div className="flex justify-start  items-center">
                    <Avatar
                        src={avtUrl}
                        alt={title}
                        className="mr-6 bg-white"
                        color="primary"
                        isBordered
                        size="lg"
                        radius="full"
                    />
                    <div className="items-center justify-between flex-grow">
                        <div className="flex items-center justify-between">
                            <h3
                                className="text-[28px] font-semibold text-black hover:underline cursor-pointer"
                                tabIndex={0}
                            >
                                {title}
                            </h3>
                        </div>
                        <div className="flex items-center justify-between">
                            <TextLine text={location} className="text-black text-[20px]" />
                        </div>
                    </div>
                </div>
                {status === MATCHING_STATUS.PENDING && !isLoading && (
                    <div className="flex gap-x-2">
                        <Button
                            type="submit"
                            color="primary"
                            size="sm"
                            variant="bordered"
                            radius="md"
                            startContent={<UserRightIcon className="text-empacts" />}
                            onPress={handleAcceptRequestClick}
                        >
                            Accept
                        </Button>
                        <Button
                            type="submit"
                            color="danger"
                            size="sm"
                            variant="bordered"
                            radius="md"
                            startContent={<UserRightIcon className="text-error" />}
                            onPress={handleRejectRequestClick}
                        >
                            Reject
                        </Button>
                    </div>
                )}
            </div>
            <div className="flex items-center gap-1 overflow-hidden">
                <Image src={LabelIcon} alt="Project" width={24} height={24} className="object-cover" />
                <span className="font-inter font-semibold text-base text-black text-center truncate">
                    {getSDGGoal(startup?.sdgGoal || "")}
                </span>
            </div>
            <Tabs aria-label="Request Tabs" variant="underlined" color="primary" className="font-bold">
                <Tab key="request_detail" title="Request detail" className="flex flex-col gap-y-4">
                    <div className="flex gap-x-2 items-center">
                        <div className="font-semibold">Status:</div>
                        <div className={status === MATCHING_STATUS.ACCEPTED ? "text-success font-semibold" : "text-gray-500 font-semibold"}>{capitalizeFirstLetter(status)}</div>
                    </div>
                    {
                        status === MATCHING_STATUS.ACCEPTED ? (
                            <div className="flex w-full gap-2">
                                <div className="flex w-[60%] flex-wrap md:flex-nowrap gap-4">
                                    <DateInput
                                        isReadOnly
                                        defaultValue={calendarDate}
                                        placeholderValue={new CalendarDate(2025, 12, 1)}
                                        endContent={
                                            <CalendarIcon className="text-black pointer-events-none" />
                                        }
                                        className="w-1/2"
                                    />
                                    <TimeInput
                                        isReadOnly
                                        defaultValue={time}
                                        endContent={
                                            <ClockIcon className="text-xl text-black pointer-events-none" />
                                        }
                                        className="w-1/2" />
                                </div>
                                <div className="flex flex-col w-[40%] gap-2">
                                    <Button color="primary" variant="solid" className="w-full" onPress={onMeetingButtonClick}>
                                        Join with Google Meet
                                    </Button>
                                    <Snippet
                                        hideSymbol
                                        size="sm"
                                        className="bg-transparent border-none"
                                        codeString={meetingLink}
                                    >
                                        {meetingLink.replace(/^https?:\/\//, '')}
                                    </Snippet>
                                </div>
                            </div>

                        ) : (
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <DateInput
                                    isReadOnly
                                    defaultValue={calendarDate}
                                    placeholderValue={new CalendarDate(2025, 12, 1)}
                                    endContent={
                                        <CalendarIcon className="text-black pointer-events-none" />
                                    }
                                    className="w-1/2"
                                />
                                <TimeInput
                                    isReadOnly
                                    defaultValue={time}
                                    endContent={
                                        <ClockIcon className="text-xl text-black pointer-events-none" />
                                    }
                                    className="w-1/2" />
                            </div>
                        )
                    }

                    <div className="flex flex-col gap-y-3">
                        <div className={`flex flex-col gap-1`}>
                            <label className="text-sm text-gray-700 mb-1">Note</label>
                            <textarea
                                readOnly
                                value={note}
                                placeholder="No note provided"
                                rows={5}
                                className="border border-gray-50 rounded-lg min-h-[120px] p-3 bg-gray-50 text-gray-700 resize-none focus:outline-none"
                            />
                        </div>
                    </div>
                </Tab>
                <Tab key="startup_infomation" title="Startup information">
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">Description</h4>
                            <p className="text-gray-500 text-sm whitespace-pre-line">
                                {startup?.description || "No description available"}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">Member</h4>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-8 py-4">
                                {startupMembers.map((member, index) => (
                                    <div className="flex justify-start" key={member.id || index}>
                                        <Avatar
                                            src={member.user.avtUrl}
                                            alt={member.user.name}
                                            className="mr-6 bg-white"
                                            isBordered
                                            size="md"
                                            radius="full"
                                        />
                                        <div className="items-center justify-between flex-grow">
                                            <div className="flex items-center justify-between">
                                                <h3
                                                    className="text-md font-semibold text-black hover:underline cursor-pointer"
                                                    tabIndex={0}
                                                >
                                                    {member.user.name}
                                                </h3>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <TextLine text={member.positionTitle} className="text-black text-sm" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Profile Link</h4>
                                <p className="text-gray-500 text-sm whitespace-pre-line">
                                    {startup?.startupLink || "No data"}
                                </p>
                            </div>
                            {/* <div>
                                <h4 className="text-lg font-semibold text-gray-800">Media</h4>

                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Documentation</h4>
                            </div> */}
                        </div>
                    </div>
                </Tab>
                <Tab key="advanced" title="Advanced">
                    <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-10 w-1/2">
                            <div className="col-span-2 text-lg font-semibold text-gray-800">
                                Active User
                            </div>
                            <p className="text-gray-500 text-sm">
                                {startup.haveActiveUse == null
                                    ? 'No data'
                                    : startup.haveActiveUse
                                        ? 'Yes'
                                        : 'Not yet'}
                            </p>
                        </div>
                        <div className="grid grid-cols-3 gap-10 w-1/2">
                            <div className="col-span-2 text-lg font-semibold text-gray-800">
                                Lastest Revenue
                            </div>
                            <p className="text-gray-500 text-sm">
                                {startup?.revenue == null ? 'No data' : startup.revenue}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">
                                Startup State - State
                            </h4>
                            <p className="text-gray-500 text-sm">
                                {startup.startupFundingStage == null ? 'No data' : startup.startupFundingStage}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">Legal Equity</h4>
                            <p className="text-gray-500 text-sm">
                                {startup.legalEquityDetail == null
                                    ? 'No data'
                                    : startup.legalEquityDetail}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">Investment</h4>
                            <p className="text-gray-500 text-sm">
                                {startup.investmentDetail == null
                                    ? 'No data'
                                    : startup.investmentDetail}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">Fundraising</h4>
                            <p className="text-gray-500 text-sm">
                                {startup.fundraisingDetail == null
                                    ? 'No data'
                                    : startup.fundraisingDetail}
                            </p>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div >
    );
}

export default MatchingRequestInfoCard;
