import React, { useState, useEffect } from 'react';
import { Spinner } from '@heroui/react';
import { Spacer } from '@heroui/spacer';
import { startup_profile_detail } from '@/apis/mentor';
import { Startup } from '@/interfaces/StartupProfile';
import MatchingMentorCard from '@/components/Card/MatchingMentorCard';
import { getProvince } from '@/utils/getProvince';
import MatchingRequestInfoCard from '@/components/Card/MatchingRequestInfoCard';
import { useMatchingRequestListStore } from '@/stores/matching-store';
import { useErrorStore } from '@/stores/error-store';
import { Matching } from '@/interfaces/matching';
import { Member } from '@/interfaces/StartupProfile';
import { isImageFile } from '@/services/upload';
import { isDocumentFile } from '@/services/upload';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import { getStartupDocuments } from '@/apis/upload';
import { IDocument } from '@/interfaces/upload';
import Button from '@/components/Button/Button';
import TextLine from '@/components/common/TextLine';
import { PROFILE_MESSAGES } from '@/constants';

interface MentorExploreContainerProps {
  mentorId?: string | undefined;
}

const MentorExploreContainer: React.FC<MentorExploreContainerProps> = ({ mentorId }) => {
  const matches = useMatchingRequestListStore((state) => state.matchingRequestList);
  const [startupList, setStartupList] = useState<Startup[]>([]);
  const [selectedMatchIndex, setSelectedMatchIndex] = useState<number>(0);
  const error = useErrorStore((state) => state.error);
  const setError = useErrorStore((state) => state.setError);
  const [filterMode, setFilterMode] = useState<'ALL' | 'ACCEPTED' | 'PENDING'>('ALL');
  const [startupMembersList, setStartupMembersList] = useState<Member[][]>([]);
  const [startupImages, setStartupImages] = useState<IDocument[]>([]);
  const [startupDocuments, setStartupDocuments] = useState<IDocument[]>([]);
  const filterMatchIndexes =
    matches && startupList.length
      ? matches
          .map((match, idx) => ({ match, idx }))
          .filter(
            ({ match }) =>
              filterMode === 'ALL' ||
              (filterMode === 'ACCEPTED' && match.status === 'ACCEPTED') ||
              (filterMode === 'PENDING' && match.status === 'PENDING')
          )
          .map(({ idx }) => idx)
      : [];

  const filteredSelectedIndex = filterMatchIndexes.includes(selectedMatchIndex)
    ? selectedMatchIndex
    : (filterMatchIndexes[0] ?? 0);

  useEffect(() => {
    const fetchAllStartupDetails = async () => {
      if (!matches || matches.length === 0) {
        setStartupList([]);
        return;
      }
      try {
        const startupDetails = await Promise.all(
          matches.map(async (match) => {
            const response = await startup_profile_detail(match.startupId || '', mentorId || '');
            const startupData = response.data.startup;
            const startupMember = response.data.members;
            return {
              startup: {
                id: startupData.id,
                name: startupData.name,
                startupUsername: startupData.startupUsername,
                phone: startupData.phone,
                avtUrl: startupData.avtUrl,
                status: startupData.status,
                description: startupData.description,
                sdgGoal: startupData.sdgGoal,
                startupLink: startupData.startupLink,
                locationBased: startupData.locationBased,
                credential: startupData.credential,
                languagesSpoken: startupData.languagesSpoken,
                marketFocus: startupData.market_focus,
                startupFundingStage: startupData.startupFundingStage,
                haveActiveUse: startupData.activeUse,
                revenue: startupData.revenue,
                otherParticipatedDetail: startupData.otherParticipatedDetail,
                legalEquityDetail: startupData.legalEquityDetail,
                investmentDetail: startupData.investmentDetail,
                fundraisingDetail: startupData.fundraisingDetail,
                memberQty: startupData.memberQty,
              } as Startup,
              members: startupMember,
            };
          })
        );
        setStartupList(startupDetails.map((item) => item.startup));
        setStartupMembersList(startupDetails.map((item) => item.members));
      } catch (err) {
        setStartupList([]);
        setStartupMembersList([]);
        setError(PROFILE_MESSAGES.FAILED_FETCH_STARTUP_DETAILS);
      }
    };
    fetchAllStartupDetails();
  }, [matches, mentorId, setError]);

  const fetchStartupDocuments = async (startupId: string) => {
    try {
      const response = await getStartupDocuments({
        ownerId: startupId,
        ownerType: UPLOAD_OWNER_TYPE.STARTUP,
        limit: 100,
        page: 1,
      });
      const allDocuments = response.data;
      const images = allDocuments.filter((document: IDocument) => isImageFile(document.type));
      const documents = allDocuments.filter((document: IDocument) => isDocumentFile(document.type));
      setStartupImages(images);
      setStartupDocuments(documents);
    } catch (error) {
      setStartupImages([]);
      setStartupDocuments([]);
      console.error(PROFILE_MESSAGES.FAILED_FETCH_STARTUP_DOCUMENTS, error);
    }
  };

  useEffect(() => {
    const selectedStartup = startupList[filteredSelectedIndex];
    if (selectedStartup?.id) {
      fetchStartupDocuments(selectedStartup.id);
    } else {
      setStartupImages([]);
      setStartupDocuments([]);
    }
  }, [filteredSelectedIndex, startupList]);

  if (error) {
    return (
      <div className='flex justify-center items-center h-[50%]'>
        <TextLine text={error} className='text-neutral-50 text-lg' />
      </div>
    );
  }

  return startupList.length > 0 ? (
    <div className='flex w-full px-regular relative z-10 gap-0 mt-medium'>
      <div className='mx-0 w-[33%] flex flex-col justify-start'>
        <div className='flex flex-col gap-small overflow-y-auto h-full pr-small custom-scrollbar'>
          <div className='flex justify-between items-center mb-regular'>
            <div className='flex gap-small'>
              <Button
                variant={filterMode === 'ALL' ? 'primary-sm' : 'tertiary-sm'}
                onClick={() => setFilterMode('ALL')}
                className='rounded-full'
              >
                {PROFILE_MESSAGES.ALL}
              </Button>
              <Button
                variant={filterMode === 'ACCEPTED' ? 'primary-sm' : 'tertiary-sm'}
                onClick={() => setFilterMode('ACCEPTED')}
                className='rounded-full'
              >
                {PROFILE_MESSAGES.ACCEPTED}
              </Button>
              <Button
                variant={filterMode === 'PENDING' ? 'primary-sm' : 'tertiary-sm'}
                onClick={() => setFilterMode('PENDING')}
                className='rounded-full'
              >
                {PROFILE_MESSAGES.PENDING}
              </Button>
            </div>
          </div>
          {filterMatchIndexes.map((idx) => (
            <MatchingMentorCard
              key={startupList[idx].id}
              name={startupList[idx].name}
              location={getProvince(startupList[idx]?.locationBased || '')}
              status={matches?.[idx]?.status || ''}
              avatarUrl={startupList[idx].avtUrl}
              onCardClick={() => setSelectedMatchIndex(idx)}
            />
          ))}
        </div>
      </div>

      <Spacer x={4} />
      <div className='w-[67%]'>
        {filterMatchIndexes.length > 0 && (
          <MatchingRequestInfoCard
            connectRequestCode={
              (matches as Matching[] | null)?.[filteredSelectedIndex]?.connectRequestCode || ''
            }
            title={startupList[filteredSelectedIndex]?.name || ''}
            location={getProvince(startupList[filteredSelectedIndex]?.locationBased || '')}
            avtUrl={startupList[filteredSelectedIndex]?.avtUrl || ''}
            startup={startupList[filteredSelectedIndex]}
            status={(matches as Matching[] | null)?.[filteredSelectedIndex]?.status || ''}
            schedule={
              (matches as Matching[] | null)?.[filteredSelectedIndex]?.requestSchedule || ''
            }
            meetingLink={(matches as Matching[] | null)?.[filteredSelectedIndex]?.meetingLink || ''}
            note={(matches as Matching[] | null)?.[filteredSelectedIndex]?.note || ''}
            mentorId={mentorId || ''}
            startupMembers={startupMembersList[filteredSelectedIndex] || []}
            documents={startupDocuments}
            images={startupImages}
          />
        )}
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-[50%]'>
      <Spinner
        classNames={{ label: 'text-foreground mt-4' }}
        label={PROFILE_MESSAGES.FINDING_MATCHING_REQUEST}
        variant='wave'
      />
    </div>
  );
};

export default MentorExploreContainer;
