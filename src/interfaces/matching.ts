export interface Matching {
  connectRequestCode: string;
  mentorId?: string;
  startupId?: string;
  status?: string;
  meetingLink?: string;
  requestSchedule?: Date;
  note?: string;
}

export interface ConnectRequest {
  id: string;
  startup_id: string;
  mentor_id: string;
  startup_founder_id: string;
  startup_founder_email: string;
  mentor_email: string;
  connect_request_code: string;
  request_schedule: string;
  note: string;
  meeting_link: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'EXPIRED';
  responded_by: string | null;
  responded_at: string | null;
  expired_at: string | null;
  created_at: string;
  updated_at: string;
  mentor?: {
    id: string;
    name: string;
    avtUrl?: string;
    locationBased?: string;
    description?: string;
  };
}

export interface ConnectionMeetingAttendee {
  name: string;
  email: string;
}

export interface ConnectionMeetingPrimaryContact {
  name: string;
  email: string;
  role: 'STARTUP' | 'MENTOR';
}

export interface ConnectionMeeting {
  id: string;
  mentor_id: string;
  startup_id: string;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  status: 'SCHEDULING' | 'SCHEDULED' | 'CANCELLED' | 'COMPLETED' | 'EXPIRED';
  meet_link: string;
  attendees: ConnectionMeetingAttendee[];
  primary_contact: ConnectionMeetingPrimaryContact;
  mentor?: {
    id: string;
    name: string;
    avtUrl?: string;
    locationBased?: string;
    description?: string;
  };
  startup?: {
    id: string;
    name: string;
    avtUrl?: string;
    locationBased?: string;
    description?: string;
  };
}
