import { Tab, Tabs } from '@heroui/react';
import OverviewBody from './OverviewBody';
import AdvancedBody from './AdvancedBody';
import { Mentor } from '@/interfaces/MentorProfile';

interface TabsSectionProps {
  mentorProfile: Mentor | null;
}

const TabsSection: React.FC<TabsSectionProps> = ({ mentorProfile }) => {
  return (
    <div className='flex-1'>
      <Tabs aria-label='Mentor Tabs' variant='underlined' color='primary' className='font-bold'>
        <Tab key='overview' title='Overview'>
          <OverviewBody mentorProfile={mentorProfile} />
        </Tab>
        <Tab key='advanced' title='Advanced'>
          <AdvancedBody mentorProfile={mentorProfile} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsSection;
