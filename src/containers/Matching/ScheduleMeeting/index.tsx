import { Spacer } from '@heroui/spacer';
import { addToast } from '@heroui/react';
import { TOAST_COLORS, DEFAULT_TOAST_TIMEOUT } from '@/constants/api';
import { PROFILE_MESSAGES } from '@/constants';
import { getProvince } from '@/utils/getProvince';
import { useState, useEffect } from 'react';
import ScheduleMeetingDetailCard from '@/components/Card/ScheduleMeetingDetailCard';
import ScheduleMeetingSmallCard from '@/components/Card/ScheduleMeetingSmallCard';
import { getConnectionMeetings } from '@/apis/connection-meeting';
import { mentor_profile_detail } from '@/apis/mentor-profile';
import { MEETING_STATUS } from '@/constants/matching';

interface ScheduleMeetingProps {
  startupId: string;
}

interface MentorProfile {
  id: string;
  name: string;
  locationBased: string;
  avtUrl: string;
}

const ScheduleMeeting: React.FC<ScheduleMeetingProps> = ({ startupId }) => {
  const [selectedMatchIndex, setSelectedMatchIndex] = useState<number>(0);
  const [mentorList, setMentorList] = useState<MentorProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMentorList = async () => {
      try {
        setIsLoading(true);

        // Fetch connection meetings with status SCHEDULING
        const connectionMeetings = await getConnectionMeetings({
          actor: 'startup',
          profileId: startupId,
          status: MEETING_STATUS.SCHEDULING,
        });

        // Fetch mentor details for each connection meeting
        const mentorDetailsPromises = connectionMeetings.map(
          (meeting: { id: string; mentorId: string }) =>
            mentor_profile_detail(meeting.mentorId).then((response: any) => ({
              mentorData: response.data.mentor,
            }))
        );

        const mentorDetails = await Promise.all(mentorDetailsPromises);

        // Map mentor details to the expected format
        const formattedMentorList = mentorDetails.map((item: any) => ({
          id: item.mentorData.id,
          name: item.mentorData.name || 'Unknown Mentor',
          locationBased: item.mentorData.locationBased || '',
          avtUrl: item.mentorData.avtUrl || '',
        }));
        console.log('formattedMentorList', formattedMentorList);
        setMentorList(formattedMentorList);
      } catch (error) {
        addToast({
          title: PROFILE_MESSAGES.FETCH_MENTOR_LIST_FAILED,
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
        setMentorList([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (startupId) {
      fetchMentorList();
    }
  }, [startupId]);
  if (isLoading) {
    return (
      <div className='flex w-full px-regular relative z-10 gap-0 justify-center items-center h-full'>
        <p>Loading connection...</p>
      </div>
    );
  }

  if (mentorList.length === 0) {
    return (
      <div className='flex w-full px-regular relative z-10 gap-0 justify-center items-center h-full'>
        <p>No connection available for scheduling</p>
      </div>
    );
  }

  return (
    <div className='flex w-full px-regular relative z-10 gap-0'>
      <div className='mx-0 w-[33%] flex flex-col justify-start'>
        <div className='flex flex-col gap-small overflow-y-auto h-full pr-small custom-scrollbar'>
          {mentorList.map((mentor: MentorProfile, index: number) => (
            <ScheduleMeetingSmallCard
              key={mentor.id}
              name={mentor.name}
              location={getProvince(mentor?.locationBased || '')}
              avtUrl={mentor.avtUrl}
              onCardClick={() => setSelectedMatchIndex(index)}
            />
          ))}
        </div>
      </div>

      <Spacer x={4} />
      <div className='w-[67%]'>
        <ScheduleMeetingDetailCard
          name={mentorList[selectedMatchIndex]?.name}
          location={getProvince(mentorList[selectedMatchIndex]?.locationBased || '')}
          avtUrl={mentorList[selectedMatchIndex]?.avtUrl}
          mentorId={mentorList[selectedMatchIndex]?.id}
          startupId={startupId}
          onMeetingScheduled={() => {
            // Optionally refresh the mentor list after scheduling
            addToast({
              title: 'Meeting has been scheduled!',
              color: TOAST_COLORS.SUCCESS,
              timeout: DEFAULT_TOAST_TIMEOUT,
            });
          }}
        />
      </div>
    </div>
  );
};

export default ScheduleMeeting;
