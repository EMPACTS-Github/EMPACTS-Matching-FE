/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { INVITATION_PENDING_STATUS, STARTUP_INVITATION_RESPONSE } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner } from '@heroui/spinner';
import { logout } from '@/apis/auth';
import { checkInvitationStatus, responseStartupInvitation } from '@/apis/startup-invitation';
import { addToast } from '@heroui/react';
import { STARTUP_INVITATION_RESPONSE_CODE } from '@/constants/response';
import { getSDGGoal } from '@/utils/getSDGGoal';
import { UI_LABELS, PROFILE_MESSAGES } from '@/constants';
import { TOAST_COLORS, DEFAULT_TOAST_TIMEOUT } from '@/constants/api';
import Button from '@/components/Button/Button';
import Avatar from '@/components/Avatar/Avatar';
import TextLine from '@/components/common/TextLine';

type InviteeStartupInfo = {
  positionTitle: string;
  startupAvt: string;
  startupName: string;
  startupGoal: string;
};

// Alert Login As Component
const AlertLoginAs: React.FC<{
  email: string;
  inviteeEmail: string;
  onLoginAsDifferentAccount: () => void;
  onCancelLoginAsDifferentAccount: () => void;
}> = ({ email, inviteeEmail, onLoginAsDifferentAccount, onCancelLoginAsDifferentAccount }) => (
  <div className="w-full flex justify-center items-center mt-large">
    <div className="rounded-xl p-large bg-neutral-20 flex flex-col gap-small justify-center items-center">
      <TextLine 
        text={`${UI_LABELS.YOURE_LOGIN_AS} `}
        className="text-xl text-center font-semibold text-secondary"
      />
      <TextLine 
        text={email}
        className="text-xl text-center font-semibold text-primary"
      />
      <div className="flex flex-col items-center">
        <TextLine 
          text={`${UI_LABELS.PLEASE_LOGIN_AS} `}
          className="text-medium text-center font-semibold text-secondary"
        />
        <TextLine 
          text={`${inviteeEmail} ${UI_LABELS.TO_CONTINUE}`}
          className="text-medium text-center font-semibold text-primary"
        />
      </div>
      <div className="flex gap-small">
        <Button
          onClick={onCancelLoginAsDifferentAccount}
          variant="secondary-md"
        >
          {UI_LABELS.CANCEL}
        </Button>
        <Button
          onClick={onLoginAsDifferentAccount}
          variant="primary-md"
        >
          {`${UI_LABELS.LOGIN_IN_AS} ${inviteeEmail}`}
        </Button>
      </div>
    </div>
  </div>
);

// Invitation Status Component
const InvitationStatus: React.FC<{ message: string }> = ({ message }) => {
  const router = useRouter();

  const handleReturnToHome = () => {
    localStorage.removeItem('inviteeEmail');
    localStorage.removeItem('invitationCode');
    localStorage.removeItem('status');
    router.replace('/');
  };

  return (
    <div className="w-full flex justify-center items-center mt-large">
      <div className="rounded-xl p-large bg-neutral-20 flex flex-col gap-small justify-center items-center">
        <TextLine 
          text={`${message} ${UI_LABELS.PLEASE_ASK_RESEND}`}
          className="text-xl text-center font-semibold text-secondary"
        />
        <Button
          onClick={handleReturnToHome}
          variant="primary-md"
        >
          {UI_LABELS.RETURN_TO_HOME}
        </Button>
      </div>
    </div>
  );
};

// Invitation Response Component
const InvitationResponse: React.FC<{
  onResponseInvitation: (response: string) => void;
  onChangeInvitationResponse: (response: string) => void;
  inivtationResponse: {
    invitedEmail: string;
    inviteCode: string;
    response: string;
  };
  invitationInfo: InviteeStartupInfo;
}> = ({ invitationInfo, inivtationResponse, onResponseInvitation, onChangeInvitationResponse }) => {
  const handleChangeInvitationResponse = (response: string) => {
    onChangeInvitationResponse(response);
    onResponseInvitation(response);
  };

  const renderActionButton = () => {
    if (!inivtationResponse.response) {
      return (
        <div className="flex gap-large">
          <Button
            onClick={() => handleChangeInvitationResponse(STARTUP_INVITATION_RESPONSE.REJECTED)}
            variant="warning-md"
            className="w-[120px]"
          >
            {UI_LABELS.DECLINE}
          </Button>
          <Button
            onClick={() => handleChangeInvitationResponse(STARTUP_INVITATION_RESPONSE.ACCEPTED)}
            variant="primary-md"
            className="w-[120px] bg-success text-neutral-20"
          >
            {UI_LABELS.ACCEPT}
          </Button>
        </div>
      );
    }
    if (inivtationResponse.response === STARTUP_INVITATION_RESPONSE.ACCEPTED) {
      return (
        <div className="flex flex-col items-center">
          <TextLine 
            text={UI_LABELS.ACCEPTED_INVITATION}
            className="text-center text-secondary"
          />
          <TextLine 
            text={UI_LABELS.WAIT_REDIRECT_STARTUP}
            className="text-center text-secondary"
          />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center">
        <TextLine 
          text={UI_LABELS.REJECTED_INVITATION}
          className="text-center text-secondary"
        />
        <TextLine 
          text={UI_LABELS.WAIT_REDIRECT_HOME}
          className="text-center text-secondary"
        />
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center items-center mt-large">
      <div className="rounded-xl p-large bg-neutral-20 flex flex-col gap-large justify-center items-center shadow-lg">
        <div>
          <TextLine 
            text={UI_LABELS.YOURE_INVITED_AS}
            className="text-2xl text-center font-semibold text-secondary mb-small"
          />
          <TextLine 
            text={invitationInfo.positionTitle}
            className="text-2xl text-center font-semibold text-primary"
          />
        </div>
        <div className="flex flex-col gap-regular justify-center items-center">
          <Avatar
            variant="default-lg"
            src={invitationInfo.startupAvt}
            alt="Startup Avatar"
            className="w-24 h-24"
          />
          <div>
            <TextLine 
              text={invitationInfo.startupName}
              className="text-xl text-center font-semibold text-secondary mb-small"
            />
            <TextLine 
              text={invitationInfo.startupGoal}
              className="text-sm text-center font-semibold text-neutral-50"
            />
          </div>
        </div>
        <div>{renderActionButton()}</div>
      </div>
    </div>
  );
};

const StartupInvitation = () => {
  const searchParams = useSearchParams();
  const route = useRouter();

  const [loading, setLoading] = useState(true);
  const [differentAccount, setDifferentAccount] = useState(false);
  const [invitationStatus, setInvitationStatus] = useState<string>('');
  const [inviteeStartupInfo, setInviteeStartupInfo] = useState<InviteeStartupInfo | null>({
    positionTitle: '',
    startupAvt: '',
    startupName: '',
    startupGoal: '',
  });
  const [invitationResponse, setInvitationResponse] = useState({
    invitedEmail: '',
    inviteCode: '',
    response: '',
  });
  const [currentStartupId, setCurrentStartupId] = useState('');

  const invitationCode = searchParams.get('code');
  const invitedEmail = searchParams.get('email');
  let userInfo = JSON.parse(localStorage.getItem('user') as string);

  const handleChangeInvitationResponse = (response: string) => {
    setInvitationResponse({
      invitedEmail: invitedEmail as string,
      inviteCode: invitationCode as string,
      response: response,
    });
  };

  const handleLoginAsDifferentAccount = () => {
    logout().then(() => {
      localStorage.setItem('invitationCode', invitationCode as string);
      localStorage.setItem('invitedEmail', invitedEmail as string);
      localStorage.setItem('status', INVITATION_PENDING_STATUS);
      route.replace('/auth/login');
    });
  };

  const handleCancelLoginAsDifferentAccount = () => {
    localStorage.removeItem('invitedEmail');
    localStorage.removeItem('invitationCode');
    localStorage.removeItem('status');
    route.replace('/');
  };

  const getCheckInvitationStatus = async () => {
    try {
      const response = await checkInvitationStatus({
        inviteCode: invitationCode as string,
      });
      if (
        response.code === STARTUP_INVITATION_RESPONSE_CODE.INVITATION_EXPIRED ||
        response.code === STARTUP_INVITATION_RESPONSE_CODE.INVITATION_INVALID
      ) {
        setInvitationStatus(UI_LABELS.INVITATION_EXPIRED);
        return;
      }

      const data = response.data;
      const startupInfo = {
        positionTitle: data.positionTitle as string,
        startupAvt: data.startup.avtUrl as string,
        startupName: data.startup.name as string,
        startupGoal: getSDGGoal(data.startup.sdgGoal) as string,
      };
      setInviteeStartupInfo(startupInfo);
      setCurrentStartupId(data.startup.id);
    } catch (error) {
      addToast({
        title: PROFILE_MESSAGES.ERROR_CHECKING_INVITATION,
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
      setInvitationStatus(UI_LABELS.INVITATION_EXPIRED);
    }
  };

  const responseInvitation = async (invitationResponse: string) => {
    try {
      const response = await responseStartupInvitation({
        inviteCode: invitationCode as string,
        invitedEmail: invitedEmail as string,
        response: invitationResponse,
      });

      localStorage.removeItem('invitedEmail');
      localStorage.removeItem('invitationCode');
      localStorage.removeItem('status');

      if (response.code === STARTUP_INVITATION_RESPONSE_CODE.INVITATION_REJECTED) {
        route.replace('/');
      } else {
        route.replace(`/startup-detail/${currentStartupId}`);
      }
    } catch (error) {
      addToast({
        title: PROFILE_MESSAGES.ERROR_RESPONDING_INVITATION,
        color: TOAST_COLORS.DANGER,
        timeout: DEFAULT_TOAST_TIMEOUT,
      });
    }
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.email !== invitedEmail) {
        setDifferentAccount(true);
        setLoading(false);
      } else {
        setLoading(false);
        getCheckInvitationStatus();
      }
    } else {
      localStorage.setItem('invitationCode', invitationCode as string);
      localStorage.setItem('invitedEmail', invitedEmail as string);
      localStorage.setItem('status', INVITATION_PENDING_STATUS);
      route.replace('/auth/login');
    }
  }, []);

  if (!invitationCode || !invitedEmail) {
    route.replace('/');
  }

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center">
        <Spinner color="primary" />
      </div>
    );
  }

  const renderInvitation = () => {
    if (differentAccount) {
      return (
        <AlertLoginAs
          email={userInfo.email}
          inviteeEmail={invitedEmail as string}
          onLoginAsDifferentAccount={handleLoginAsDifferentAccount}
          onCancelLoginAsDifferentAccount={handleCancelLoginAsDifferentAccount}
        />
      );
    }

    if (!differentAccount && invitationStatus) {
      return <InvitationStatus message={invitationStatus} />;
    }

    if (!differentAccount && !invitationStatus) {
      return (
        <InvitationResponse
          invitationInfo={inviteeStartupInfo as InviteeStartupInfo}
          inivtationResponse={invitationResponse}
          onResponseInvitation={responseInvitation}
          onChangeInvitationResponse={handleChangeInvitationResponse}
        />
      );
    }
  };

  return <>{renderInvitation()}</>;
};

export default StartupInvitation;
