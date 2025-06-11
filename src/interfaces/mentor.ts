export interface Mentor {
    id: string;
    name: string;
    avtUrl?: string;
    description?: string;
    sdgGoal?: string;
    locationBased?: string;
}

export interface SdgGoal {
    id: string;
    label: string;
}
