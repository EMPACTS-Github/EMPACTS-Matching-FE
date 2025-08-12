import { StartupProfileResponse } from '@/interfaces/StartupProfile';
import { create } from 'zustand';

interface StartupIdStore {
  startupId: string;
  setStartupId: (startupId: string) => void;
}

interface StartupProfileStore {
  startupProfile: StartupProfileResponse | null;
  setStartupProfile: (startupProfile: StartupProfileResponse | null) => void;
}

export const useStartupIdStore = create<StartupIdStore>((set) => ({
  startupId: '',
  setStartupId: (startupId) => set({ startupId }),
}));

export const useStartupProfileStore = create<StartupProfileStore>((set) => ({
  startupProfile: null,
  setStartupProfile: (startupProfile) => set({ startupProfile }),
}));
