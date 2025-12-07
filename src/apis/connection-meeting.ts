'use client';

import axiosInstance from '.';
import { MEETING_STATUS } from '@/constants/matching';

export const getConnectionMeetings = async (params: {
  actor: 'mentor' | 'startup';
  profileId: string;
  status?: (typeof MEETING_STATUS)[keyof typeof MEETING_STATUS];
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
  status: (typeof MEETING_STATUS)[keyof typeof MEETING_STATUS]
) => {
  const response = await axiosInstance.patch(`/connection-meetings/${meetingId}/status`, {
    status,
  });
  return response.data;
};

export const cancelConnectionMeeting = async (meetingId: string) => {
  return updateConnectionMeetingStatus(meetingId, 'CANCELLED');
};

export const getMentorBusySchedule = async (mentorId: string) => {
  const response = await axiosInstance.get(`/connection-meetings/mentor/${mentorId}/busy`);
  return response.data;
};

export const createConnectionMeeting = async (params: {
  startupId: string;
  mentorId: string;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  primaryContact: {
    name: string;
    email: string;
    role: string;
  };
  attendees: {
    name: string;
    email: string;
  }[];
}) => {
  const response = await axiosInstance.post('/connection-meetings', params);
  return response.data;
};
