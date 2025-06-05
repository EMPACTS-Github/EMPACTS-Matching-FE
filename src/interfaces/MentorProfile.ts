export interface SuggestMentor {
    id: string;
    name: string;
    mentorUsername: string;
    phone: string | null;
    avtUrl: string;
    status: string;
    description: string;
    sdgFocusExpertises: string[];
    locationBased: string;
    skillOffered: string[];
    languagesSpoken: string[];
    isFavourite: boolean;
    matchScore: number;
}

export interface Mentor {
    id: string;
    name: string;
    mentorUsername: string;
    phone: string | null;
    avtUrl: string;
    status: string;
    description: string;
    sdgFocusExpertises: string[];
    locationBased: string;
    skillOffered: string[];
    languagesSpoken: string[];
}