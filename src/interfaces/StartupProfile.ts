export interface StartupProfileResponse {
    startup: Startup;
    members: Member[];
}

export interface Startup {
    id: string;
    name: string;
    startupUsername: string;
    phone: string | null;
    avtUrl: string;
    status: string;
    description: string | null;
    sdgGoal: string;
    startupLink: string | null;
    credential: string | null;
    locationBased: string;
    marketFocus: string | null;
    startupState: string | null;
    stateSetail: string | null;
    haveActiveUse: number;
    revenue: number;
    otherParticipatedDetail: string;
    legalEquityDetail: string;
    investmentDetail: string;
    fundraisingDetail: string;
    pushState: number;
    memberQty: number;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Member {
    id: string;
    positionTitle: string;
    role: string;
    description: string | null;
    linkedinUrl: string | null;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export interface User {
    id: number;
    email: string;
    name: string;
    avtUrl: string;
    isVerified: boolean;
}