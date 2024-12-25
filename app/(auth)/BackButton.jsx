"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function BackButton() {
  const mode = useSearchParams().get("mode");
  const router = useRouter();

  const isChangeEmailPage = mode === "changeEmailRequest";

  return (
    <Button
      variant="ghost"
      onClick={() =>
        isChangeEmailPage
          ? router.push("/")
          : router.push(process.env.NEXT_PUBLIC_WEBFLOW_URL)
      }
      className="absolute bottom-0 left-3 md:left-36 md:px-2.5 md:py-1"
    >
      <ChevronLeft size={18} /> Back to{" "}
      {isChangeEmailPage ? "dashboard" : "home"}
    </Button>
  );
}
