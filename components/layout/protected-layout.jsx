"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/lib/store";

export default function ProtectedLayout({ children }) {
  const { currentUser, loadingState } = useAuthStore();

  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  if (!loadingState) {
    if (!currentUser) {
      redirect("/login");
    }

    return <>{children}</>;
  }
}
