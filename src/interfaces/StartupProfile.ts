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
    startupLink?: string | null;
    credential?: string | null;
    locationBased: string;
    marketFocus?: string | null;
    startupState?: string | null;
    stateDetail?: string | null;
    haveActiveUse?: number;
    revenue?: number;
    otherParticipatedDetail?: string;
    legalEquityDetail?: string;
    investmentDetail?: string;
    fundraisingDetail?: string;
    memberQty: number;
}

export interface Member {
    id: string;
    positionTitle: string;
    role: string;
    description: string | null;
    linkedinUrl: string | null;
    user: User;
}

export interface User {
    id: number;
    email: string;
    name: string;
    avtUrl: string;
    isVerified: boolean;
}