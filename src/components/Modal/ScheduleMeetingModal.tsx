import React, { useState, useEffect } from 'react';
import { ModalBody, Modal, ModalContent, ModalHeader, ModalFooter, addToast } from '@heroui/react';
import Image from 'next/image';
import CloseXIcon from '/public/assets/icons/close-x-icon.svg';
import { Spinner } from '@heroui/spinner';
import Button from '@/components/Button/Button';
import Avatar from '@/components/Avatar/Avatar';
import Input from '@/components/Input/Input';
import { createConnectionMeeting } from '@/apis/connection-meeting';
import { TOAST_COLORS, DEFAULT_TOAST_TIMEOUT } from '@/constants/api';
import TextLine from '../common/TextLine';

interface Attendee {
  name: string;
  email: string;
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
  const [newAttendeeName, setNewAttendeeName] = useState('');
  const [newAttendeeEmail, setNewAttendeeEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [primaryContactName, setPrimaryContactName] = useState('');
  const [primaryContactEmail, setPrimaryContactEmail] = useState('');
  const [description, setDescription] = useState('');

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setAttendees([]);
      setNewAttendeeName('');
      setNewAttendeeEmail('');
      setError(null);
      setPrimaryContactName('');
      setPrimaryContactEmail('');
      setDescription('');
    }
  }, [isOpen]);

  const handleScheduleMeeting = async () => {
    // Validate required fields
    if (!primaryContactName.trim() || !primaryContactEmail.trim()) {
      setError('Primary contact name and email are required');
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
      console.error('Failed to schedule meeting:', err);
      addToast({
        title: 'Failed to schedule meeting. Please try again.',
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeAttendeeEmail = (value: string) => {
    setNewAttendeeEmail(value);
  };

  const handleChangeAttendeeName = (value: string) => {
    setNewAttendeeName(value);
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

  const handleAddAttendee = () => {
    if (!newAttendeeName.trim() || !newAttendeeEmail.trim()) {
      setError('Please enter both name and email for the attendee');
      return;
    }

    // Check if email already exists
    if (attendees.some((a) => a.email === newAttendeeEmail.trim())) {
      setError('This email is already added!');
      return;
    }

    // Check if same as primary contact
    if (newAttendeeEmail.trim() === primaryContactEmail.trim()) {
      setError('This email is the same as primary contact!');
      return;
    }

    setAttendees([...attendees, { name: newAttendeeName.trim(), email: newAttendeeEmail.trim() }]);
    setNewAttendeeName('');
    setNewAttendeeEmail('');
    setError(null);
  };

  const handleRemoveAttendee = (index: number) => {
    setAttendees(attendees.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setError(null);
  }, [newAttendeeEmail, newAttendeeName]);

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
                    <div className='flex flex-col md:flex-row gap-2 w-full'>
                      <Input
                        variant='text'
                        preset='default-md'
                        value={newAttendeeName}
                        onChange={handleChangeAttendeeName}
                        placeholder='Name'
                        className='w-1/3'
                      />
                      <Input
                        variant='email'
                        preset='default-md'
                        value={newAttendeeEmail}
                        onChange={handleChangeAttendeeEmail}
                        placeholder='Attendee E-mail'
                      />
                      <Button
                        variant='secondary-md'
                        className='w-full md:w-[100px] h-[40px]'
                        onClick={handleAddAttendee}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {error && <div className='text-error text-sm mt-1'>{error}</div>}

                  <div className='flex flex-row flex-wrap gap-4 mt-4'>
                    {attendees.map((attendee, index) => (
                      <div
                        key={index}
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
