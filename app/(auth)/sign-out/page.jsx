"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import LoadingSpinner from "@/components/layout/loading-spinner";

export default function page() {
  const { resetCurrentUser } = useAuthStore();

  useEffect(() => {
    resetCurrentUser();
    redirect("/login");
  }, []);

  return <LoadingSpinner />;
}
