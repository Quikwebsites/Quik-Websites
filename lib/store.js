import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      loadingState: true,

      currentUser: null,
      setCurrentUser: (userData) => set({ currentUser: userData }),
      resetCurrentUser: () => set({ currentUser: null }),

      emailReset: {
        resetAttempted: false,
        newEmail: {
          email: null,
          isVerified: false,
        },
        oldEmail: {
          email: null,
          isVerified: false,
        },
      },
      setEmailReset: (newState) =>
        set((state) => ({
          emailReset: {
            ...state.emailReset,
            ...newState,
          },
        })),
    }),
    {
      name: "auth-store",
      // skipHydration: true,
      onRehydrateStorage: () => (state) => {
        if (state) state.loadingState = false;
      },
    },
  ),
);
