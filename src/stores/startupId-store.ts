import { create } from "zustand";

interface StartupIdStore {
    startupId: string;
    setStartupId: (startupId: string) => void;
}

export const useStartupIdStore = create<StartupIdStore>((set) => ({
    startupId: '',
    setStartupId: (startupId) => set({ startupId }),
}));