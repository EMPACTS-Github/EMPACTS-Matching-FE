import { Button } from '@heroui/react'
import React from 'react'

type Props = {
  email: string,
  inviteeEmail: string,
  onLoginAsDifferentAccount: () => void,
  onCancelLoginAsDifferentAccount: () => void,
}

const AlertLoginAs = ({ email, inviteeEmail, onLoginAsDifferentAccount, onCancelLoginAsDifferentAccount }: Props) => {
  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="rounded-xl p-8 bg-white flex flex-col gap-2 justify-center items-center">
        <p className="text-xl text-center font-[600] text-[#09090B]">
          {"You're login as"} <span className="text-xl text-center font-[600] text-empacts">{email}</span>
        </p>
        <p className="text-medium text-center font-[600] text-[#09090B]">
          {"Please login as"} <span className="text-medium text-center font-[600] text-empacts">{inviteeEmail}</span> {"to continue"}
        </p>
        <div>
          <Button
            onPress={onCancelLoginAsDifferentAccount}
            variant="solid"
            className="bg-white rounded-lg pl-6 pr-6 border-1 border-[#E4E4E7] mr-5"
          >
            Cancel
          </Button>
          <Button
            onPress={onLoginAsDifferentAccount}
            variant="solid"
            className="bg-empacts rounded-lg pl-6 pr-6 text-white"
          >
            {`Login in as ${inviteeEmail}`}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AlertLoginAs