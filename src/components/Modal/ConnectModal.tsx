import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/react';
import { useState, useMemo } from 'react';
import { DatePicker, addToast } from '@heroui/react';
import { getLocalTimeZone, today, CalendarDate } from '@internationalized/date';
import { Select, SelectItem } from '@heroui/react';
import ClockIcon from '@/components/Icons/ClockIcon';
import CalendarIcon from '@/components/Icons/CalendarIcon';
import { request_matching_to_mentor } from '@/apis/startup-matching';
import { Spinner } from '@heroui/spinner';
import Button from '@/components/Button/Button';
import Avatar from '@/components/Avatar/Avatar';

interface ConnectModalProps {
  startupId: string;
  mentorId: string;
  isOpen: boolean;
  onClose: () => void;
  mentorName: string;
  avtUrl: string;
}

const ConnectModal: React.FC<ConnectModalProps> = ({
  startupId,
  mentorId,
  isOpen,
  onClose,
  mentorName,
  avtUrl,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState('');
  const timeOptions = useMemo(() => {
    const options = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour12 = h % 12 === 0 ? 12 : h % 12;
        const ampm = h < 12 ? 'AM' : 'PM';
        const label = `${hour12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
        const value = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        options.push({ key: value, label });
      }
    }
    return options;
  }, []);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const handleConnect = async () => {
    if (!selectedDate || !selectedTime) {
      addToast({
        title: 'Select a date time to connect',
        color: 'danger',
        timeout: 5000,
      });
      return;
    }
    const [hour, minute] = selectedTime.split(':').map(Number);
    const year = selectedDate.year;
    const month = selectedDate.month - 1; // JS Date: 0-based month
    const day = selectedDate.day;
    const requestSchedule = new Date(year, month, day, hour, minute, 0);
    setIsLoading(true);
    try {
      if (!startupId) {
        addToast({
          title: 'Startup ID is not available',
          color: 'danger',
          timeout: 5000,
        });
        setIsLoading(false);
        return;
      }
      const response = await request_matching_to_mentor(startupId, mentorId, note, requestSchedule);
      console.log('Response from request_matching_to_mentor:', response);
      if (response.code === 'CONNECT_REQUEST_SENT') {
        setIsLoading(false);
        addToast({
          title: 'Request sent',
          color: 'success',
          timeout: 5000,
        });
        setSelectedDate(null);
        setSelectedTime('');
        setNote('');
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      const errData = error?.response?.data || {};
      if (errData.code === 'USER_HAS_NO_PERMISSION' && errData.statusCode === 400) {
        setIsLoading(false);
        addToast({
          title: 'You have no permission to connect with this mentor',
          color: 'danger',
          timeout: 5000,
        });
        setSelectedDate(null);
        setSelectedTime('');
        setNote('');
        onClose();
      } else {
        addToast({
          title: 'Request failed',
          color: 'danger',
          timeout: 5000,
        });
        setIsLoading(false);
      }
    }
  };
  return (
    <Modal isKeyboardDismissDisabled={true} isOpen={isOpen} onOpenChange={onClose} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-4 items-center">
              <div className="w-[10%]">
                <Avatar alt="mentor's avatar" src={avtUrl} variant="default-lg" />
              </div>
              <div className="w-[90%]">
                <h3 className="text-lg text-black font-semibold">
                  Connect with <span className="text-empacts">{mentorName}</span>
                </h3>
                <p className="text-sm text-gray-500">
                  <span className="text-empacts">{mentorName}</span> will be able to view your
                  advanced information and documentation when you request to connect
                </p>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-1 mb-4">
                <div className="flex gap-2 w-full">
                  <DatePicker
                    isRequired
                    variant="bordered"
                    minValue={today(getLocalTimeZone())}
                    className="w-1/2"
                    selectorIcon={<CalendarIcon className="text-black" />}
                    value={selectedDate}
                    onChange={setSelectedDate}
                  />
                  <Select
                    isRequired
                    className="w-1/2"
                    variant="bordered"
                    selectedKeys={[selectedTime]}
                    onSelectionChange={(keys) => setSelectedTime(Array.from(keys)[0] as string)}
                    placeholder="Start time"
                    selectorIcon={<ClockIcon className="text-empacts-gray-100" />}
                  >
                    {timeOptions.map((option) => (
                      <SelectItem key={option.key}>{option.label}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-col gap-1 py-2">
                  <label className="text-md text-gray-700 mb-1 font-bold">Note</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={5}
                    className="border border-gray-200 rounded-lg min-h-[120px] p-3 bg-white text-black resize-none focus:outline-none focus:border-empacts transition-colors"
                    placeholder="Leave a note for mentor"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-between mt-20">
              <Button variant="bordered-md" className="w-1/2 border-2" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary-md" className="w-1/2" onClick={handleConnect}>
                {isLoading ? <Spinner size="sm" color="white" /> : 'Connect'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConnectModal;
