import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      loadingState: true,

      setCurrentUser: ({
        uid,
        accessToken,
        email,
        displayName,
        phoneNumber,
        photoURL,
        emailVerified,
      }) =>
        set(
          (state) =>
            (state.currentUser = {
              uid,
              accessToken,
              email,
              displayName,
              phoneNumber,
              photoURL,
              emailVerified,
            }),
        ),
    }),
    {
      name: "auth-store",
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        if (state) state.loadingState = false;
      },
    },
  ),
);
