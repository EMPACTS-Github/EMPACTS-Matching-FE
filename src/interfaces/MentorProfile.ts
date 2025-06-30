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
    marketFocusExpertise?: string;
    experienceWithFundingStage?: string[];
    yearOfProfessionalExperience?: number;
    currentWorkplace?: string;
    currentPosition?: string;
    industryFocus?: string[];
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
    marketFocusExpertise?: string;
    experienceWithFundingStage?: string[];
    yearOfProfessionalExperience?: number;
    currentWorkplace?: string;
    currentPosition?: string;
    industryFocus?: string[];
    isHide?: boolean;
}