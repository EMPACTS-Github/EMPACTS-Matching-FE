/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { INVITATION_PENDING_STATUS } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner } from '@heroui/spinner';
import AlertLoginAs from './AlertLoginAs';
import { logout } from '@/apis/auth';
import { checkInvitationStatus, responseStartupInvitation } from '@/apis/startup-invitation';
import { addToast } from '@heroui/react';
import { STARTUP_INVITATION_RESPONSE_CODE } from '@/constants/response';
import InvitationStatus from './InvitationStatus';
import { getSDGGoal } from '@/utils/getSDGGoal';
import InvitationResponse from './InvitationResponse';

type InviteeStartupInfo = {
  positionTitle: string;
  startupAvt: string;
  startupName: string;
  startupGoal: string;
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
        setInvitationStatus('Invitation expired!');
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
        title: 'Error in checking invitation status',
        color: 'danger',
        timeout: 5000,
      });
      setInvitationStatus('Invitation expired!');
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
        title: 'Error in responsing invitation',
        color: 'danger',
        timeout: 5000,
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
        <Spinner color="secondary" />
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
