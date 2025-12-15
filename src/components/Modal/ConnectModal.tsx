import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/react';
import { useState } from 'react';
import { addToast } from '@heroui/react';
import { request_matching_to_mentor } from '@/apis/startup-matching';
import { Spinner } from '@heroui/spinner';
import Button from '@/components/Button/Button';
import Avatar from '@/components/Avatar/Avatar';
import { TOAST_MESSAGES, TOAST_COLORS, TOAST_TIMEOUT } from '@/constants/api';

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
  const handleConnect = async () => {
    setIsLoading(true);
    try {
      if (!startupId) {
        addToast({
          title: TOAST_MESSAGES.STARTUP_ID_NOT_AVAILABLE,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.MEDIUM,
        });
        setIsLoading(false);
        return;
      }
      const response = await request_matching_to_mentor(startupId, mentorId, note);
      if (response.code === 'CONNECT_REQUEST_SENT') {
        setIsLoading(false);
        addToast({
          title: TOAST_MESSAGES.CONNECT_REQUEST_SENT,
          color: TOAST_COLORS.SUCCESS,
          timeout: TOAST_TIMEOUT.MEDIUM,
        });
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
          title: TOAST_MESSAGES.USER_HAS_NO_PERMISSION,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.MEDIUM,
        });
        setNote('');
        onClose();
      } else {
        addToast({
          title: TOAST_MESSAGES.REQUEST_FAILED,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.MEDIUM,
        });
        setIsLoading(false);
      }
    }
  };
  return (
    <Modal isKeyboardDismissDisabled={true} isOpen={isOpen} onOpenChange={onClose} size='xl'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex gap-4 items-center'>
              <div className='w-[10%]'>
                <Avatar alt="mentor's avatar" src={avtUrl} variant='default-lg' />
              </div>
              <div className='w-[90%]'>
                <h3 className='text-lg text-black font-semibold'>
                  Connect with <span className='text-empacts'>{mentorName}</span>
                </h3>
                <p className='text-sm text-gray-500'>
                  <span className='text-empacts'>{mentorName}</span> will be able to view your
                  advanced information and documentation when you request to connect
                </p>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className='flex flex-col gap-1 py-2'>
                <label className='text-md text-gray-700 mb-1 font-bold'>Note</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={5}
                  className='border border-gray-200 rounded-lg min-h-[120px] p-3 bg-white text-black resize-none focus:outline-none focus:border-empacts transition-colors'
                  placeholder='Leave a note for mentor'
                />
              </div>
            </ModalBody>
            <ModalFooter className='flex justify-between'>
              <Button variant='bordered-md' className='w-1/2 border-2' onClick={onClose}>
                Cancel
              </Button>
              <Button variant='primary-md' className='w-1/2' onClick={handleConnect}>
                {isLoading ? <Spinner size='sm' color='white' /> : 'Connect'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConnectModal;
