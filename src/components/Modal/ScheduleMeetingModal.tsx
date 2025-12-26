import React, { useState, useEffect, useMemo } from 'react';
import { ModalBody, Modal, ModalContent, ModalHeader, ModalFooter, addToast } from '@heroui/react';
import Image from 'next/image';
import CloseXIcon from '/public/assets/icons/close-x-icon.svg';
import { Spinner } from '@heroui/spinner';
import Button from '@/components/Button/Button';
import Avatar from '@/components/Avatar/Avatar';
import Input from '@/components/Input/Input';
import Autocomplete, { AutocompleteOption } from '@/components/Autocomplete/Autocomplete';
import { createConnectionMeeting } from '@/apis/connection-meeting';
import { startup_profile_detail } from '@/apis/startup-profile';
import { TOAST_COLORS, DEFAULT_TOAST_TIMEOUT } from '@/constants/api';
import TextLine from '../common/TextLine';

interface Attendee {
  name: string;
  email: string;
}

interface StartupMember {
  id: string;
  positionTitle?: string;
  user: {
    id: string;
    name: string;
    email: string;
    avtUrl?: string;
  };
}

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onSuccess?: () => void;
  mentorId: string;
  startupId: string;
  mentorName: string;
  mentorAvtUrl: string;
  startDateTime: Date;
  endDateTime: Date;
}

interface MemberItemProps {
  item: AutocompleteOption;
  member?: StartupMember;
}

const MemberItem: React.FC<MemberItemProps> = ({ item, member }) => {
  return (
    <div className='flex items-center gap-3'>
      <Avatar
        variant='default-sm'
        src={member?.user.avtUrl || process.env.NEXT_PUBLIC_DEFAULT_AVT_URL}
      />
      <div className='flex flex-col'>
        <span className='text-sm font-medium'>{item.label}</span>
        <span className='text-xs text-neutral-60'>{item.value}</span>
      </div>
    </div>
  );
};

const ScheduleMeetingModal: React.FC<ScheduleMeetingModalProps> = ({
  isOpen,
  onOpenChange,
  onSuccess,
  mentorId,
  startupId,
  mentorName,
  mentorAvtUrl,
  startDateTime,
  endDateTime,
}) => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [primaryContactName, setPrimaryContactName] = useState('');
  const [primaryContactEmail, setPrimaryContactEmail] = useState('');
  const [description, setDescription] = useState('');

  // Startup members autocomplete states
  const [startupMembers, setStartupMembers] = useState<StartupMember[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [attendeeInputValue, setAttendeeInputValue] = useState('');
  const [selectedAttendeeKey, setSelectedAttendeeKey] = useState<string | number | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setAttendees([]);
      setError(null);
      setPrimaryContactName('');
      setPrimaryContactEmail('');
      setDescription('');
      setAttendeeInputValue('');
      setSelectedAttendeeKey(null);
    }
  }, [isOpen]);

  // Fetch startup members when modal opens
  useEffect(() => {
    const fetchStartupMembers = async () => {
      if (!isOpen || !startupId) return;

      setIsLoadingMembers(true);
      try {
        const response = await startup_profile_detail(startupId);
        if (response?.data?.members) {
          setStartupMembers(response.data.members);
        }
      } catch {
        addToast({
          title: 'Failed to fetch startup members',
          color: TOAST_COLORS.DANGER,
          timeout: DEFAULT_TOAST_TIMEOUT,
        });
      } finally {
        setIsLoadingMembers(false);
      }
    };

    fetchStartupMembers();
  }, [isOpen, startupId]);

  // Convert startup members to autocomplete options
  const attendeeAutocompleteOptions: AutocompleteOption[] = useMemo(() => {
    const searchTerm = attendeeInputValue.toLowerCase().trim();

    return startupMembers
      .filter((member) => {
        // Filter out already added attendees
        const isAlreadyAdded = attendees.some((a) => a.email === member.user.email);
        if (isAlreadyAdded) return false;

        // Filter out if same as primary contact
        if (member.user.email === primaryContactEmail.trim()) return false;

        // Filter by search term (name or email)
        if (!searchTerm) return true;
        return (
          member.user.name.toLowerCase().includes(searchTerm) ||
          member.user.email.toLowerCase().includes(searchTerm)
        );
      })
      .map((member) => ({
        key: member.user.email,
        label: member.user.name,
        value: member.user.email,
      }));
  }, [startupMembers, attendees, attendeeInputValue, primaryContactEmail]);

  const handleScheduleMeeting = async () => {
    // Validate required fields
    if (!primaryContactName.trim() || !primaryContactEmail.trim()) {
      setError('Primary contact name and email are required');
      return;
    }

    // Check if primary contact email matches any attendee email
    const primaryEmail = primaryContactEmail.trim();
    const duplicateAttendee = attendees.find((a) => a.email === primaryEmail);
    if (duplicateAttendee) {
      setError('Primary contact email cannot be the same as an attendee email');
      return;
    }

    setIsLoading(true);
    try {
      await createConnectionMeeting({
        startupId,
        mentorId,
        title: `Meeting with ${mentorName}`,
        description: description.trim() || `Meeting scheduled with ${mentorName}`,
        startDateTime,
        endDateTime,
        primaryContact: {
          name: primaryContactName.trim(),
          email: primaryContactEmail.trim(),
          role: 'STARTUP',
        },
        attendees,
      });

      addToast({
        title: 'Meeting scheduled successfully!',
        color: TOAST_COLORS.SUCCESS,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });

      onOpenChange();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      addToast({
        title: 'Failed to schedule meeting. Please try again.',
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePrimaryContactEmail = (value: string) => {
    setPrimaryContactEmail(value);
  };

  const handleChangePrimaryContactName = (value: string) => {
    setPrimaryContactName(value);
  };

  const handleChangeDescription = (value: string) => {
    setDescription(value);
  };

  // Format date time for display
  const formatDateTime = (start: Date, end: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const dateStr = start.toLocaleDateString('en-US', options);

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    };

    return `${dateStr} at ${formatTime(start)} - ${formatTime(end)}`;
  };

  // Autocomplete handlers
  const handleAttendeeSelectionChange = (key: string | number | null) => {
    setSelectedAttendeeKey(key);
    if (key) {
      const selectedMember = startupMembers.find((m) => m.user.email === key);
      if (selectedMember) {
        setAttendeeInputValue(selectedMember.user.name);
      }
    }
  };

  const handleAttendeeInputChange = (value: string) => {
    setAttendeeInputValue(value);
    if (selectedAttendeeKey) {
      setSelectedAttendeeKey(null);
    }
  };

  const handleAddAttendee = () => {
    if (!selectedAttendeeKey) {
      setError('Please select a member from the list');
      return;
    }

    const selectedMember = startupMembers.find((m) => m.user.email === selectedAttendeeKey);
    if (!selectedMember) return;

    // Check if email already exists in attendees
    if (attendees.some((a) => a.email === selectedMember.user.email)) {
      setError('This member is already added!');
      return;
    }

    // Check if same as primary contact
    if (primaryContactEmail.trim() === selectedMember.user.email) {
      setError('This member is the same as primary contact!');
      return;
    }

    setAttendees([
      ...attendees,
      { name: selectedMember.user.name, email: selectedMember.user.email },
    ]);
    setAttendeeInputValue('');
    setSelectedAttendeeKey(null);
    setError(null);
  };

  const handleRemoveAttendee = (index: number) => {
    setAttendees(attendees.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setError(null);
  }, [attendeeInputValue]);

  return (
    <Modal isKeyboardDismissDisabled={true} size='xl' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className='pt-1'>
        {(onClose) => (
          <>
            <ModalHeader className='items-center '>
              <div className='flex gap-4'>
                <Avatar variant='default-lg' src={mentorAvtUrl} alt={`${mentorName}'s avatar`} />
                <div className='flex flex-col justify-start'>
                  <h3 className='text-lg text-secondary mb-1'>
                    Schedule meeting with <span className='text-primary'>{mentorName}</span>
                  </h3>
                  <TextLine
                    text={formatDateTime(startDateTime, endDateTime)}
                    className='text-sm text-secondary'
                  />
                </div>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className='flex flex-col w-full gap-2'>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-col gap-1'>
                    <div className='text-lg font-semibold text-secondary'>Description</div>
                    <Input
                      variant='text'
                      preset='default-md'
                      value={description}
                      onChange={handleChangeDescription}
                      placeholder='Meeting description'
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div className='text-lg font-semibold text-secondary'>Primary Contact</div>
                    <div className='flex gap-1'>
                      <Input
                        variant='text'
                        preset='default-md'
                        value={primaryContactName}
                        onChange={handleChangePrimaryContactName}
                        placeholder='Name'
                        className='w-1/3'
                      />
                      <Input
                        variant='email'
                        preset='default-md'
                        value={primaryContactEmail}
                        onChange={handleChangePrimaryContactEmail}
                        placeholder='Primary Contact E-mail'
                        className='w-2/3'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='text-md font-semibold text-secondary'>Add Attendees</div>
                  <div className='flex flex-col gap-2 w-full'>
                    <div className='flex items-center gap-2 w-full'>
                      <Autocomplete
                        preset='default-md'
                        placeholder='Search member by name or email'
                        options={attendeeAutocompleteOptions}
                        selectedKey={selectedAttendeeKey ?? undefined}
                        onSelectionChange={handleAttendeeSelectionChange}
                        inputValue={attendeeInputValue}
                        onInputChange={handleAttendeeInputChange}
                        isLoading={isLoadingMembers}
                        isClearable
                        menuTrigger='input'
                        className='flex-1'
                        renderItem={(item) => {
                          const member = startupMembers.find((m) => m.user.email === item.key);
                          return <MemberItem item={item} member={member} />;
                        }}
                      />
                      <Button
                        variant='secondary-md'
                        className='w-[100px] h-[40px]'
                        onClick={handleAddAttendee}
                        disabled={!selectedAttendeeKey}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {error && <div className='text-error text-sm mt-1'>{error}</div>}

                  <div className='flex flex-row flex-wrap gap-4 mt-4'>
                    {attendees.map((attendee, index) => (
                      <div
                        key={attendee.email}
                        className='flex flex-row gap-3 p-2.5 rounded items-center w-full md:w-auto bg-primary-20'
                      >
                        <div className='flex flex-col gap-0.5'>
                          <div className='text-sm font-medium text-neutral-80'>{attendee.name}</div>
                          <div className='text-xs text-neutral-50'>{attendee.email}</div>
                        </div>
                        <button
                          onClick={() => handleRemoveAttendee(index)}
                          className='w-5 h-5 flex items-center justify-center'
                        >
                          <Image src={CloseXIcon} alt='remove' width={8} height={8} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className='flex justify-between'>
              <Button
                variant='ghost-md'
                className='w-1/2 border-2'
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant='primary-md'
                className='w-1/2'
                onClick={handleScheduleMeeting}
                disabled={isLoading}
              >
                {isLoading ? <Spinner size='sm' color='white' /> : 'Schedule Meeting'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default ScheduleMeetingModal;
