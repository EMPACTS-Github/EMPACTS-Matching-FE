import { Spacer } from '@heroui/spacer';
import { getProvince } from '@/utils/getProvince';
import { useState } from 'react';
import ScheduleMeetingDetailCard from '@/components/Card/ScheduleMeetingDetailCard';
import ScheduleMeetingSmallCard from '@/components/Card/ScheduleMeetingSmallCard';

interface ScheduleMeetingProps {
  startupId: string;
}

const ScheduleMeeting: React.FC<ScheduleMeetingProps> = ({ startupId }) => {
  const [selectedMatchIndex, setSelectedMatchIndex] = useState<number>(0);
  const mentorList = [
    {
      name: 'Mentor A',
      locationBased: 'HA_NOI',
      avtUrl:
        'https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png',
    },
    {
      name: 'Mentor B',
      locationBased: 'HA_NOI',
      avtUrl:
        'https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png',
    },
    {
      name: 'Mentor C',
      locationBased: 'HA_NOI',
      avtUrl:
        'https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png',
    },
    {
      name: 'Mentor D',
      locationBased: 'HA_NOI',
      avtUrl:
        'https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png',
    },
    {
      name: 'Mentor E',
      locationBased: 'HA_NOI',
      avtUrl:
        'https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png',
    },
  ];
  return (
    <div className='flex w-full px-regular relative z-10 gap-0'>
      <div className='mx-0 w-[33%] flex flex-col justify-start'>
        <div className='flex flex-col gap-small overflow-y-auto h-full pr-small custom-scrollbar'>
          {mentorList.map((mentor: any, index: number) => (
            <ScheduleMeetingSmallCard
              key={index}
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
        />
      </div>
    </div>
  );
};

export default ScheduleMeeting;
