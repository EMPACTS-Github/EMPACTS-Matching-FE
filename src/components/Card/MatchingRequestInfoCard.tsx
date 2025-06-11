import Image from "next/image";
import React, { useState } from "react";
import { Button, useDisclosure, TimeInput, addToast } from "@heroui/react";
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
            }, 500);
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
        <div className={`bg-white rounded-lg shadow-xl py-6 px-8 gap-y-6 flex flex-col`}>
            <div className="flex justify-between items-end">
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
                {status === MATCHING_STATUS.PENDING && (
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
                            {isLoading ? <Spinner size="sm" color="primary" /> : "Accept Request"}
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
                            {isLoading ? <Spinner size="sm" color="danger" /> : "Reject Request"}
                        </Button>
                    </div>

                )}
            </div>
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
                    {note && (
                        <label className="text-sm text-gray-700 mb-1">Note</label>
                    )}
                    <textarea
                        readOnly
                        value={note}
                        rows={5}
                        className="border border-gray-50 rounded-lg min-h-[120px] p-3 bg-gray-50 text-gray-700 resize-none focus:outline-none"
                    />
                </div>
            </div>
        </div >
    );
}

export default MatchingRequestInfoCard;
