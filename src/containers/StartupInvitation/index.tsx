"use client";
import { INVITATION_PENDING_STATUS } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";
import AlertLoginAs from "./AlertLoginAs";
import { logout } from "@/apis/auth";

const StartupInvitation = () => {
  const searchParams = useSearchParams();
  const route = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [differentAccount, setDifferentAccount] = useState(false);

  const invitationCode = searchParams.get('code');
  const inviteeEmail = searchParams.get('email');
  let userInfo = JSON.parse(localStorage.getItem('user') as string);
  
  const handleLoginAsDifferentAccount = () => {
    logout()
      .then(() => {
        localStorage.setItem('invitationCode', invitationCode as string);
        localStorage.setItem('inviteeEmail', inviteeEmail as string);
        localStorage.setItem('status', INVITATION_PENDING_STATUS);
        route.replace('/auth/login');
      })
  }

  const handleCancelLoginAsDifferentAccount = () => {
    route.replace('/');
  }

  useEffect(() => {
    if (userInfo) {
      if (userInfo.email !== inviteeEmail){
        setDifferentAccount(true);
        setLoading(false);
      }
    } else {
      localStorage.setItem('invitationCode', invitationCode as string);
      localStorage.setItem('inviteeEmail', inviteeEmail as string);
      localStorage.setItem('status', INVITATION_PENDING_STATUS);
      route.replace('/auth/login');
    }
  }, [invitationCode, inviteeEmail, route, userInfo])

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center">
        <Spinner color="secondary" />
      </div>
    )
  }

  return (
    <>
      {
        differentAccount && <AlertLoginAs 
          email={userInfo.email}
          inviteeEmail={inviteeEmail as string}
          onLoginAsDifferentAccount={handleLoginAsDifferentAccount}
          onCancelLoginAsDifferentAccount={handleCancelLoginAsDifferentAccount}
          />
      }
    </>
  )
}

export default StartupInvitation;
