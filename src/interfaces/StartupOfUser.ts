import { User, Startup } from "./StartupProfile"

//use this interface to get startup of user at dropdown in header
export interface StartupOfUser {
    id: number;
    positionTitle: string;
    role: string;
    description: string | null;
    linkedinUrl: string | null;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    userId: User;
    startupId: Startup;
}

export interface StartupOfUserResponse {
    startupId: string;
    name: string;
    avtUrl: string;
}

export interface MentorOfUserResponse {
    mentorId: string;
    name: string;
    avtUrl: string;
}
