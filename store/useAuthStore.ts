import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState } from "../interfaces/auth.types";

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,

  setLoggedIn: async (val: boolean) => {
    await AsyncStorage.setItem("isLoggedIn", val ? "true" : "false");
    set({ isLoggedIn: val });
  },

  checkLoginStatus: async () => {
    const value = await AsyncStorage.getItem("isLoggedIn");
    set({ isLoggedIn: value === "true" });
  },

  logout: async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("user_email");
    set({ isLoggedIn: false });
  },
}));
