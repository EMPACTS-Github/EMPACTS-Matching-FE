'use client';

import axiosInstance from '.';
import { ConnectionMeeting } from '@/interfaces/matching';

export const getConnectionMeetings = async (params: {
  actor: 'mentor' | 'startup';
  profileId: string;
  status?: string;
  view?: 'past' | 'upcoming' | 'canceled';
}) => {
  const { actor, profileId, status, view } = params;
  const queryParams = new URLSearchParams({
    actor,
    profileId,
    ...(status && { status }),
    ...(view && { view }),
  });

  const response = await axiosInstance.get(`/connection-meetings?${queryParams.toString()}`);
  return response.data;
};

export const updateConnectionMeetingStatus = async (
  meetingId: string,
  status: 'SCHEDULING' | 'SCHEDULED' | 'CANCELLED' | 'COMPLETED' | 'EXPIRED'
) => {
  const response = await axiosInstance.patch(`/connection-meetings/${meetingId}/status`, {
    status,
  });
  return response.data;
};

export const cancelConnectionMeeting = async (meetingId: string) => {
  return updateConnectionMeetingStatus(meetingId, 'CANCELLED');
};
