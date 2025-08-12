import { create } from 'zustand';
import { Mentor } from '@/interfaces/MentorProfile';

interface MentorIdStore {
  mentorId: string;
  setMentorId: (mentorId: string) => void;
}

interface MentorProfileStore {
  mentorProfile: Mentor | null;
  setMentorProfile: (mentorProfile: Mentor) => void;
}

export const useMentorIdStore = create<MentorIdStore>((set) => ({
  mentorId: '',
  setMentorId: (mentorId) => set({ mentorId }),
}));

export const useMentorProfileStore = create<MentorProfileStore>((set) => ({
  mentorProfile: null,
  setMentorProfile: (mentorProfile) => set({ mentorProfile }),
}));
