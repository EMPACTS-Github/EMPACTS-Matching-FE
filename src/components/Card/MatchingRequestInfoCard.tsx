import Image from 'next/image';
import React, { useState } from 'react';
import { TimeInput, addToast, Card, CardBody } from '@heroui/react';
import TextLine from '@/components/common/TextLine';
import Avatar from '@/components/Avatar/Avatar';
import Button from '@/components/Button/Button';
import { MATCHING_STATUS } from '@/constants/matching';
import UserRightIcon from '@/components/Icons/UserRightIcon';
import { DateInput } from '@heroui/react';
import { CalendarDate } from '@internationalized/date';
import CalendarIcon from '@/components/Icons/CalendarIcon';
import ClockIcon from '@/components/Icons/ClockIcon';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { getCalendarDateAndTime } from '@/utils/convertDateToDateAndTime';
import { Snippet } from '@heroui/react';
import { response_matching_request } from '@/apis/mentor-matching';
import { Spinner } from '@heroui/spinner';
import { Tab, Tabs } from '@heroui/react';
import { Startup } from '@/interfaces/StartupProfile';
import { Member } from '@/interfaces/StartupProfile';
import LabelIcon from '/public/assets/label.png';
import { getSDGGoal } from '@/utils/getSDGGoal';
import DocsIcon from '/public/assets/docs-icon.svg';
import SheetsIcon from '/public/assets/sheets-icon.svg';
import SlidesIcon from '/public/assets/slides-icon.svg';
import DocumentEmptyStateLogo from '/public/assets/document-empty-state-logo.svg';
import MediaEmptyStateLogo from '/public/assets/media-empty-state-logo.svg';
import { getFileName, handleDocumentDownload } from '@/services/file';
import { IDocument } from '@/interfaces/upload';
import { PROFILE_MESSAGES } from '@/constants';
import { TOAST_COLORS, DEFAULT_TOAST_TIMEOUT } from '@/constants/api';

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
  documents: IDocument[];
  images: IDocument[];
}

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
  documents,
  images,
}) => {
  const { calendarDate, time } = getCalendarDateAndTime(schedule);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const fileIcons = {
    docx: DocsIcon,
    csv: SheetsIcon,
    pptx: SlidesIcon,
    xlsx: SheetsIcon,
    pdf: SlidesIcon,
  };

  // Get icon based on file type
  const getFileIcon = (fileType: string) => {
    return fileIcons[fileType as keyof typeof fileIcons] || DocumentEmptyStateLogo;
  };

  const onMeetingButtonClick = () => {
    if (meetingLink) {
      let url = meetingLink.trim();
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAcceptRequestClick = async () => {
    setIsLoading(true);
    try {
      const response = await response_matching_request(
        MATCHING_STATUS.ACCEPTED,
        mentorId,
        connectRequestCode
      );
      if (response.code === 'RESPONSE_REQUEST_SENT') {
        addToast({
          title: PROFILE_MESSAGES.ACCEPTED_MATCHING_REQUEST,
          color: TOAST_COLORS.SUCCESS,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Failed to accept request:', error);
      addToast({
        title: PROFILE_MESSAGES.RESPONSE_MATCHING_FAILED,
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
      setIsLoading(false);
    }
  };

  const handleRejectRequestClick = async () => {
    setIsLoading(true);
    try {
      const response = await response_matching_request(
        MATCHING_STATUS.REJECTED,
        mentorId,
        connectRequestCode
      );
      if (response.code === 'RESPONSE_REQUEST_SENT') {
        addToast({
          title: PROFILE_MESSAGES.REJECTED_MATCHING_REQUEST,
          color: TOAST_COLORS.SUCCESS,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error('Failed to reject request:', error);
      addToast({
        title: PROFILE_MESSAGES.RESPONSE_MATCHING_FAILED,
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
      setIsLoading(false);
    }
  };
  return (
    <div
      className={`bg-neutral-20 rounded-lg shadow-xl py-medium px-large gap-y-regular flex flex-col`}
    >
      <div className='flex justify-between items-end'>
        <div className='flex justify-start items-center'>
          <Avatar variant='default-lg' src={avtUrl} alt={title} className='mr-medium' />
          <div className='items-center justify-between flex-grow'>
            <div className='flex items-center justify-between'>
              <TextLine
                text={title}
                className='text-2xl font-semibold text-secondary hover:underline cursor-pointer'
              />
            </div>
            <div className='flex items-center justify-between'>
              <TextLine text={location} className='text-secondary text-xl' />
            </div>
          </div>
        </div>
        {status === MATCHING_STATUS.PENDING && !isLoading && (
          <div className='flex gap-x-small'>
            <Button
              variant='tertiary-sm'
              startContent={<UserRightIcon className='text-primary' />}
              onClick={handleAcceptRequestClick}
            >
              {PROFILE_MESSAGES.ACCEPT}
            </Button>
            <Button
              variant='warning-sm'
              startContent={<UserRightIcon className='text-error' />}
              onClick={handleRejectRequestClick}
            >
              {PROFILE_MESSAGES.REJECT}
            </Button>
          </div>
        )}
      </div>
      <div className='flex items-center gap-1 overflow-hidden'>
        <Image src={LabelIcon} alt='Project' width={24} height={24} className='object-cover' />
        <TextLine
          text={getSDGGoal(startup?.sdgGoal || '')}
          className='font-inter font-semibold text-base text-secondary text-center truncate'
        />
      </div>
      <Tabs aria-label='Request Tabs' variant='underlined' color='primary' className='font-bold'>
        <Tab
          key='request_detail'
          title={PROFILE_MESSAGES.REQUEST_DETAIL}
          className='flex flex-col gap-y-regular'
        >
          <div className='flex gap-x-small items-center'>
            <TextLine text={PROFILE_MESSAGES.STATUS} className='font-semibold text-secondary' />
            <TextLine
              text={capitalizeFirstLetter(status)}
              className={
                status === MATCHING_STATUS.ACCEPTED
                  ? 'text-success font-semibold'
                  : 'text-neutral-50 font-semibold'
              }
            />
          </div>
          {status === MATCHING_STATUS.ACCEPTED ? (
            <div className='flex w-full gap-2'>
              <div className='flex w-[60%] flex-wrap md:flex-nowrap gap-4'>
                <DateInput
                  isReadOnly
                  defaultValue={calendarDate}
                  placeholderValue={new CalendarDate(2025, 12, 1)}
                  endContent={<CalendarIcon className='text-black pointer-events-none' />}
                  className='w-1/2'
                />
                <TimeInput
                  isReadOnly
                  defaultValue={time}
                  endContent={<ClockIcon className='text-xl text-black pointer-events-none' />}
                  className='w-1/2'
                />
              </div>
              <div className='flex flex-col w-[40%] gap-small'>
                <Button variant='primary-full' onClick={onMeetingButtonClick}>
                  {PROFILE_MESSAGES.JOIN_GOOGLE_MEET}
                </Button>
                <Snippet
                  hideSymbol
                  size='sm'
                  className='bg-transparent border-none'
                  codeString={meetingLink}
                >
                  {meetingLink.replace(/^https?:\/\//, '')}
                </Snippet>
              </div>
            </div>
          ) : (
            <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
              <DateInput
                isReadOnly
                defaultValue={calendarDate}
                placeholderValue={new CalendarDate(2025, 12, 1)}
                endContent={<CalendarIcon className='text-black pointer-events-none' />}
                className='w-1/2'
              />
              <TimeInput
                isReadOnly
                defaultValue={time}
                endContent={<ClockIcon className='text-xl text-black pointer-events-none' />}
                className='w-1/2'
              />
            </div>
          )}

          <div className='flex flex-col gap-y-3'>
            <div className={`flex flex-col gap-1`}>
              <TextLine text={PROFILE_MESSAGES.NOTE} className='text-sm text-neutral-80 mb-1' />
              <textarea
                readOnly
                value={note}
                placeholder={PROFILE_MESSAGES.NO_NOTE_PROVIDED}
                rows={5}
                className='border border-neutral-40 rounded-lg min-h-[120px] p-3 bg-neutral-40 text-neutral-80 resize-none focus:outline-none'
              />
            </div>
          </div>
        </Tab>
        <Tab key='startup_infomation' title={PROFILE_MESSAGES.STARTUP_INFORMATION}>
          <div className='space-y-regular'>
            <div>
              <TextLine
                text={PROFILE_MESSAGES.DESCRIPTION}
                className='text-lg font-semibold text-secondary'
              />
              <TextLine
                text={startup?.description || PROFILE_MESSAGES.NO_DESCRIPTION_AVAILABLE}
                className='text-neutral-50 text-sm whitespace-pre-line'
              />
            </div>
            <div>
              <TextLine
                text={PROFILE_MESSAGES.MEMBER}
                className='text-lg font-semibold text-secondary'
              />
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-medium gap-y-large py-regular'>
                {startupMembers.map((member, index) => (
                  <div className='flex justify-start' key={member.id || index}>
                    <Avatar
                      variant='default-md'
                      src={member.user.avtUrl}
                      alt={member.user.name}
                      className='mr-medium'
                    />
                    <div className='items-center justify-between flex-grow'>
                      <div className='flex items-center justify-between'>
                        <TextLine
                          text={member.user.name}
                          className='text-md font-semibold text-secondary hover:underline cursor-pointer'
                        />
                      </div>
                      <div className='flex items-center justify-between'>
                        <TextLine text={member.positionTitle} className='text-secondary text-sm' />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <TextLine
                text={PROFILE_MESSAGES.PROFILE_LINK}
                className='text-lg font-semibold text-secondary'
              />
              <TextLine
                text={startup?.startupLink || PROFILE_MESSAGES.NO_DATA}
                className='text-neutral-50 text-sm whitespace-pre-line'
              />
            </div>
            <div>
              <TextLine
                text={PROFILE_MESSAGES.DOCUMENTATION}
                className='text-lg font-semibold text-secondary'
              />
              <div className='space-y-regular'>
                {documents.length > 0 ? (
                  <Card className='flex gap-3 shadow-none m-0 p-0'>
                    <CardBody className='m-0 p-1'>
                      <div className='space-y-regular'>
                        {documents.map((document, index) => (
                          <div key={index} className='flex items-center gap-4'>
                            <button
                              type='button'
                              onClick={() =>
                                handleDocumentDownload(
                                  document.attachmentUrl,
                                  document.attachmentTitle
                                )
                              }
                              className='cursor-pointer bg-transparent border-none p-0 flex items-center'
                            >
                              <Image
                                alt={`${document.type} icon`}
                                height={40}
                                src={getFileIcon(document.type)}
                                width={40}
                                className='cursor-pointer'
                              />
                            </button>
                            <button
                              type='button'
                              onClick={() =>
                                handleDocumentDownload(
                                  document.attachmentUrl,
                                  document.attachmentTitle
                                )
                              }
                              className='grid justify-items-start text-left cursor-pointer bg-transparent border-none p-0'
                            >
                              <div className='text-lg text-black font-bold'>
                                {getFileName(document.attachmentTitle, 50)}
                              </div>
                              <div className='text-xs text-gray-500'>{document.type}</div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                ) : (
                  <div className='flex flex-col items-center justify-center mt-regular'>
                    <Image
                      src={DocumentEmptyStateLogo}
                      alt='Media Empty State Logo'
                      className='w-24 h-auto'
                    />
                    <div className='flex flex-col items-center justify-center mb-regular'>
                      <TextLine
                        text={PROFILE_MESSAGES.NO_DATA}
                        className='text-md text-neutral-50 mb-small'
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <TextLine
                text={PROFILE_MESSAGES.MEDIA}
                className='text-lg font-semibold text-secondary'
              />
              <div className='flex flex-col w-full my-regular'>
                {images.length > 0 ? (
                  <div>
                    <div className='w-full h-auto mb-4'>
                      <Image
                        src={images[selectedIndex].attachmentUrl}
                        alt='Selected'
                        width={800}
                        height={400}
                        className='object-cover shadow-lg rounded-lg'
                      />
                    </div>

                    <div className='flex space-x-2'>
                      {images.map((image, index) => (
                        <div key={index} onClick={() => setSelectedIndex(index)}>
                          <Image
                            src={image.attachmentUrl}
                            alt={`Thumbnail ${index}`}
                            width={56}
                            height={56}
                            className={`w-14 h-14 object-cover cursor-pointer box-border p-1 border-solid border-2 ${
                              selectedIndex == index ? 'border-primary' : 'border-transparent'
                            } rounded-lg`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className='flex flex-col items-center justify-center mt-regular'>
                    <Image
                      src={MediaEmptyStateLogo}
                      alt='Media Empty State Logo'
                      className='w-24 h-auto'
                    />
                    <div className='flex flex-col items-center justify-center mb-regular'>
                      <TextLine
                        text={PROFILE_MESSAGES.NO_DATA}
                        className='text-md text-neutral-50 mb-small'
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Tab>
        <Tab key='advanced' title={PROFILE_MESSAGES.ADVANCED}>
          <div className='space-y-medium'>
            <div className='grid grid-cols-3 gap-large w-1/2'>
              <TextLine
                text={PROFILE_MESSAGES.ACTIVE_USER}
                className='col-span-2 text-lg font-semibold text-secondary'
              />
              <TextLine
                text={
                  startup.haveActiveUse == null
                    ? PROFILE_MESSAGES.NO_DATA
                    : startup.haveActiveUse
                      ? PROFILE_MESSAGES.YES
                      : PROFILE_MESSAGES.NOT_YET
                }
                className='text-neutral-50 text-sm'
              />
            </div>
            <div className='grid grid-cols-3 gap-large w-1/2'>
              <TextLine
                text={PROFILE_MESSAGES.LATEST_REVENUE}
                className='col-span-2 text-lg font-semibold text-secondary'
              />
              <TextLine
                text={
                  startup?.revenue == null ? PROFILE_MESSAGES.NO_DATA : startup.revenue.toString()
                }
                className='text-neutral-50 text-sm'
              />
            </div>
            <div>
              <TextLine
                text={PROFILE_MESSAGES.STARTUP_STATE}
                className='text-lg font-semibold text-secondary'
              />
              <TextLine
                text={
                  startup.startupFundingStage == null
                    ? PROFILE_MESSAGES.NO_DATA
                    : startup.startupFundingStage
                }
                className='text-neutral-50 text-sm'
              />
            </div>
            <div>
              <TextLine
                text={PROFILE_MESSAGES.LEGAL_EQUITY}
                className='text-lg font-semibold text-secondary'
              />
              <TextLine
                text={
                  startup.legalEquityDetail == null
                    ? PROFILE_MESSAGES.NO_DATA
                    : startup.legalEquityDetail
                }
                className='text-neutral-50 text-sm'
              />
            </div>
            <div>
              <TextLine
                text={PROFILE_MESSAGES.INVESTMENT}
                className='text-lg font-semibold text-secondary'
              />
              <TextLine
                text={
                  startup.investmentDetail == null
                    ? PROFILE_MESSAGES.NO_DATA
                    : startup.investmentDetail
                }
                className='text-neutral-50 text-sm'
              />
            </div>
            <div>
              <TextLine
                text={PROFILE_MESSAGES.FUNDRAISING}
                className='text-lg font-semibold text-secondary'
              />
              <TextLine
                text={
                  startup.fundraisingDetail == null
                    ? PROFILE_MESSAGES.NO_DATA
                    : startup.fundraisingDetail
                }
                className='text-neutral-50 text-sm'
              />
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MatchingRequestInfoCard;
