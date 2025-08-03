import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface User {
  hasProfile: boolean;
}

interface LoginResponse {
  email: string;
  user: User;
}

// Utility function to handle post-login routing logic
export const handlePostLoginRouting = (
  router: AppRouterInstance,
  response: LoginResponse
) => {
  const hasInvitationStatus = localStorage.getItem("status");

  if (hasInvitationStatus) {
    const invitationCode = localStorage.getItem("invitationCode");
    const invitedEmail = localStorage.getItem("invitedEmail");

    if (invitedEmail === response.email) {
      router.push(
        `/startup-invitation?code=${invitationCode}&email=${invitedEmail}`
      );
    } else {
      router.push("/profiles");
    }
  } else {
    if (response.user.hasProfile) {
      router.push("/profiles");
    } else {
      router.push("/profiles/new");
    }
  }
};
