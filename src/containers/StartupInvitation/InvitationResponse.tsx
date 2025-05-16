import { STARTUP_INVITATION_RESPONSE } from '@/constants'
import { Avatar, Button } from '@heroui/react'
import React from 'react'

type Props = {
  onResponseInvitation: (response: string) => void,
  onChangeInvitationResponse: (response: string) => void,
  inivtationResponse: string,
  invitationInfo: {
    positionTitle: string,
    startupAvt: string,
    startupName: string,
    startupGoal: string,
  }
}

const InvitationResponse = ({
  invitationInfo,
  inivtationResponse,
  onResponseInvitation,
  onChangeInvitationResponse,
}: Props) => {

  const handleChangeInvitationResponse = (response: string) => {
    onChangeInvitationResponse(response);
    onResponseInvitation(response);
  }

  const renderActionButton = () => {
    if (!inivtationResponse) {
      return (
        <>
          <Button
            onPress={() => handleChangeInvitationResponse(STARTUP_INVITATION_RESPONSE.REJECTED)}
            variant="solid"
            color="danger"
            className="rounded-lg p-3 mr-5"
          >
            Decline
          </Button>
          <Button
            onPress={() => handleChangeInvitationResponse(STARTUP_INVITATION_RESPONSE.ACCEPTED)}
            variant="solid"
            color="success"
            className="rounded-lg p-3"
          >
            Accept
          </Button>
        </>
      )
    }
    if (inivtationResponse === STARTUP_INVITATION_RESPONSE.ACCEPTED) {
      return (
        <div>
          <p className="text-center">
            You have accepted invitation
          </p>
          <p className="text-center">
            Please wait and we will redirect you to startup homepage
          </p>
        </div>
      )
    }
    return (
      <div>
        <p className="text-center">
          You have rejected this invitation
        </p>
        <p className="text-center">
          Please wait and we will redirect you to homepage
        </p>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="rounded-xl p-8 bg-white flex flex-col gap-8 justify-center items-center">
        <div>
          <p className="text-2xl text-center font-[600] text-[#09090B] mb-2">{"You're invited as"}</p>
          <p className="text-2xl text-center font-[600] text-empacts">{invitationInfo.positionTitle}</p>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Avatar
            size="lg"
            src={invitationInfo.startupAvt}
            className="w-[148px] h-[148px]"
          />
          <div>
            <p className="text-xl text-center font-[600] text-[#09090B] mb-2">{invitationInfo.startupName}</p>
            <p className="text-sm text-center font-[600] text-[#71717A]">{invitationInfo.startupGoal}</p>
          </div>
        </div>
        <div>
          {renderActionButton()}
        </div>
      </div>
    </div>
  )
}

export default InvitationResponse;
