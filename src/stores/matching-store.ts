import { create } from "zustand";
import { Matching } from "@/interfaces/matching";

interface MatchingStore {
    matches: Matching[] | null;
    setMatches: (matches: Matching[] | null) => void;
}

export const useMatchingStore = create<MatchingStore>((set) => ({
    matches: null,
    setMatches: (matches) => set({ matches }),
}));