import { create } from 'zustand';
import { Matching } from '@/interfaces/matching';

interface MatchingStore {
  matches: Matching[] | null;
  setMatches: (matches: Matching[] | null) => void;
}

interface MatchingRequestListStore {
  matchingRequestList: Matching[] | null;
  setMatchingRequestList: (matchingRequestList: Matching[] | null) => void;
}

export const useMatchingStore = create<MatchingStore>((set) => ({
  matches: null,
  setMatches: (matches) => set({ matches }),
}));

export const useMatchingRequestListStore = create<MatchingRequestListStore>((set) => ({
  matchingRequestList: null,
  setMatchingRequestList: (matchingRequestList: Matching[] | null) => set({ matchingRequestList }),
}));
