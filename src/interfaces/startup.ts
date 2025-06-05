export interface HomepageStartup {
  id: string;
  name: string;
  description?: string;
  sdgGoal: string;
  avtUrl: string;
  memberQty: number;
}

export interface Startup {
  id: string;
  name: string;
  avtUrl?: string;
  description?: string;
  sdgGoal?: string;
  startupLink?: string;
  locationBased: string;
  memberQty?: number;
  profileLink?: string;
}

export interface SdgGoal {
  id: string;
  label: string;
}

export interface MemberForInvite {
  email: string;
  title: string;
}

export interface SuggestMentors {
  mentor_key: string;
  similarity: number;
}
