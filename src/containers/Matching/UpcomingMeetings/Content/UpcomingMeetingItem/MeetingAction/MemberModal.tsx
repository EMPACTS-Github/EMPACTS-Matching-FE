'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Modal, ModalContent, ModalBody, Button, addToast } from '@heroui/react';
import CloseIcon from '@/components/Icons/CloseIcon';
import Autocomplete, { AutocompleteOption } from '@/components/Autocomplete/Autocomplete';
import Avatar from '@/components/Avatar/Avatar';
import { ConnectionMeetingAttendee } from '@/interfaces/matching';
import { startup_profile_detail } from '@/apis/startup-profile';
import { updateMeetingAttendees } from '@/apis/connection-meeting';
import { DEFAULT_TOAST_TIMEOUT, TOAST_COLORS } from '@/constants/api';

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

interface MemberModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  attendees: ConnectionMeetingAttendee[];
  startupId: string;
  meetingId: string;
  onAttendeesUpdated?: (attendees: ConnectionMeetingAttendee[]) => void;
}

const MemberItem = ({
  name,
  email,
  onRemove,
}: {
  name: string;
  email: string;
  onRemove: () => void;
}) => {
  return (
    <div className='flex justify-between bg-primary-20 rounded-lg px-3 py-2'>
      <p className='text-primary text-base font-bold leading-6 max-w-[200px] text-wrap break-words'>
        {name}
      </p>
      <p className='text-base font-normal leading-6 max-w-[250px] text-wrap break-words'>{email}</p>
      <div className='cursor-pointer text-primary w-[24px] h-[24px]' onClick={onRemove}>
        {/* Hard code value, will be fixed later */}
        <CloseIcon stroke={'#9200FE'} />
      </div>
    </div>
  );
};

const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onOpenChange,
  attendees,
  startupId,
  meetingId,
  onAttendeesUpdated,
}) => {
  const [members, setMembers] = useState<ConnectionMeetingAttendee[]>([]);
  const [startupMembers, setStartupMembers] = useState<StartupMember[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedKey, setSelectedKey] = useState<string | number | null>(null);

  // Initialize members from attendees prop
  useEffect(() => {
    setMembers(attendees);
  }, [attendees]);

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
      } catch (error) {
        console.error('Error fetching startup members:', error);
      } finally {
        setIsLoadingMembers(false);
      }
    };

    fetchStartupMembers();
  }, [isOpen, startupId]);

  // Convert startup members to autocomplete options, filtered by search term
  const autocompleteOptions: AutocompleteOption[] = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();

    return startupMembers
      .filter((member) => {
        // Filter out already added members
        const isAlreadyAdded = members.some((m) => m.email === member.user.email);
        if (isAlreadyAdded) return false;

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
  }, [startupMembers, members, inputValue]);

  const updateAttendeesAPI = async (newMembers: ConnectionMeetingAttendee[]) => {
    setIsUpdating(true);
    try {
      await updateMeetingAttendees(meetingId, newMembers);
      setMembers(newMembers);
      onAttendeesUpdated?.(newMembers);
      addToast({
        title: 'Meeting members updated successfully',
        color: TOAST_COLORS.SUCCESS,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
    } catch (error: any) {
      console.error('Error updating meeting attendees:', error);
      addToast({
        title: error?.response?.data?.message || 'Failed to update meeting members',
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveMember = async (email: string) => {
    const newMembers = members.filter((member) => member.email !== email);
    await updateAttendeesAPI(newMembers);
  };

  const handleSelectionChange = (key: string | number | null) => {
    setSelectedKey(key);
    
    // Update input value to show selected member's name
    if (key) {
      const selectedMember = startupMembers.find((m) => m.user.email === key);
      if (selectedMember) {
        setInputValue(selectedMember.user.name);
      }
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (selectedKey) {
      setSelectedKey(null);
    }
  };

  const handleAddMember = async () => {
    if (!selectedKey) return;

    const selectedMember = startupMembers.find((m) => m.user.email === selectedKey);
    if (!selectedMember) return;

    const newAttendee: ConnectionMeetingAttendee = {
      name: selectedMember.user.name,
      email: selectedMember.user.email,
    };

    const newMembers = [...members, newAttendee];
    await updateAttendeesAPI(newMembers);

    // Reset input
    setInputValue('');
    setSelectedKey(null);
  };

  return (
    <Modal
      size='2xl'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        body: 'px-8 py-10',
      }}
    >
      <ModalContent>
        <ModalBody>
          <div className='flex flex-col gap-10'>
            <div>
              <p className='text-[28px] font-bold leading-[48px]'>Meeting members</p>
              <p className='text-base font-normal leading-6'>
                See who are attending the meeting and make the changes
              </p>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                {members.map((member) => (
                  <MemberItem
                    key={member.email}
                    name={member.name}
                    email={member.email}
                    onRemove={() => handleRemoveMember(member.email)}
                  />
                ))}
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-base font-bold leading-6'>Add member</p>
                <div className='flex items-center gap-2'>
                  <Autocomplete
                    preset='default-lg'
                    placeholder='Enter email'
                    options={autocompleteOptions}
                    selectedKey={selectedKey ?? undefined}
                    onSelectionChange={handleSelectionChange}
                    inputValue={inputValue}
                    onInputChange={handleInputChange}
                    isLoading={isLoadingMembers}
                    isClearable
                    menuTrigger='input'
                    className='flex-1'
                    renderItem={(item) => {
                      const member = startupMembers.find((m) => m.user.email === item.key);
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
                    }}
                  />
                  <Button
                    variant='solid'
                    className='bg-black text-white'
                    size='lg'
                    radius='lg'
                    isLoading={isUpdating}
                    isDisabled={!selectedKey}
                    onPress={handleAddMember}
                  >
                    <p className='text-base font-bold leading-6'>Add</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MemberModal;
