import { Card, CardHeader, CardBody, CardFooter, Divider, useDisclosure } from '@heroui/react';
import SettingModal from '@/containers/StartupProfile/SettingProfile';
import { Startup } from '@/interfaces/StartupProfile';
import Button from '@/components/Button/Button';
import Avatar from '@/components/Avatar/Avatar';
import TextLine from '@/components/common/TextLine';
import { UI_LABELS } from '@/constants';

interface ProfileInfoSubCardProps {
  startup: Startup;
  isOwner: boolean | undefined;
  countMatches: number;
  onFetchStartupProfile: () => Promise<void>;
  onFetchStartupDocuments: () => Promise<void>;
}

// Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusText = () => {
    switch (status) {
      case 'ACTIVATED':
        return UI_LABELS.ACTIVE;
      case 'ARCHIVED':
        return UI_LABELS.ARCHIVED;
      default:
        return UI_LABELS.DEACTIVATED;
    }
  };

  const getStatusColor = () => {
    return status === 'ACTIVATED' ? 'text-success' : 'text-neutral-50';
  };

  return (
    <TextLine text={getStatusText()} className={`text-sm font-semibold ${getStatusColor()}`} />
  );
};

// Statistics Item Component
const StatisticItem: React.FC<{ value: number; label: string; pluralLabel: string }> = ({
  value,
  label,
  pluralLabel,
}) => (
  <div className='flex flex-col justify-center items-center'>
    <TextLine text={value.toString()} className='font-semibold text-lg text-secondary py-1' />
    <TextLine text={value === 1 ? label : pluralLabel} className='text-neutral-50 text-xs' />
  </div>
);

// Profile Header Component
const ProfileHeader: React.FC<{ startup: Startup }> = ({ startup }) => (
  <div className='flex flex-col justify-center items-center'>
    <TextLine text={startup.name} className='font-semibold text-xl text-secondary' />
    <TextLine text={startup.startupUsername} className='text-neutral-50 text-xs mb-2' />
    <StatusBadge status={startup.status} />
  </div>
);

const ProfileCard: React.FC<ProfileInfoSubCardProps> = ({
  startup,
  isOwner,
  countMatches,
  onFetchStartupProfile,
  onFetchStartupDocuments,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Card className='bg-neutral-20 min-w-lg shadow-lg rounded-lg px-regular py-small'>
      <CardHeader className='flex flex-col gap-3 items-center'>
        <Avatar
          variant='default-lg'
          alt='Startup Profile'
          src={startup.avtUrl}
          className='w-20 h-20'
        />
        <ProfileHeader startup={startup} />
      </CardHeader>
      <CardBody className='py-0'>
        <Divider />
        <div className='flex justify-around items-center p-small'>
          <StatisticItem
            value={startup.memberQty}
            label={UI_LABELS.MEMBER}
            pluralLabel={UI_LABELS.MEMBERS}
          />
          <Divider orientation='vertical' className='h-14' />
          <StatisticItem
            value={countMatches}
            label={UI_LABELS.MATCH}
            pluralLabel={UI_LABELS.MATCHES}
          />
        </div>
        <Divider />
      </CardBody>
      <CardFooter className='pt-regular'>
        <Button onClick={onOpen} variant='tertiary-full' disabled={!isOwner}>
          {UI_LABELS.SETTINGS}
        </Button>
        {
          isOpen && (
              <SettingModal
                onFetchStartupProfile={onFetchStartupProfile}
                onFetchStartupDocuments={onFetchStartupDocuments}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                startup={startup}
              />
          )
        }
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
