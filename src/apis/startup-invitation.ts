import axiosInstance from ".";

interface ICheckInvitationStatus {
  inviteCode: string;
}

interface IResponseStartupInvitation {
  invitedEmail: string;
  inviteCode: string;
  response: string;
}

export const checkInvitationStatus = async (data: ICheckInvitationStatus) => {
  const response = await axiosInstance.post('/startup-invitation/invitation-status', data);
  return response.data;
};

export const responseStartupInvitation = async (data: IResponseStartupInvitation) => {
  const response = await axiosInstance.post('/startup-invitation/response', data);
  return response.data;
};
