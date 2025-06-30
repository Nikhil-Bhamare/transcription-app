import { create } from "zustand";

type NetworkStore = {
  isOffline: boolean;
  setIsOffline: (value: boolean) => void;
};

export const useNetworkStore = create<NetworkStore>((set) => ({
  isOffline: false,
  setIsOffline: (value) => set({ isOffline: value }),
}));
