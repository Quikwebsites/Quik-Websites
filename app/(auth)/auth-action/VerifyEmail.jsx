"use client";

import LoadingSpinner from "@/components/layout/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase/config";
import { useAuthStore } from "@/lib/store";
import { applyActionCode, verifyBeforeUpdateEmail } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail({ mode, oobCode }) {
  const {
    currentUser,
    loadingState,
    emailReset,
    setEmailReset,
    resetCurrentUser,
  } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { toast } = useToast();

  // Request email verification to new email
  const verifyNewEmail = async () => {
    try {
      await verifyBeforeUpdateEmail(
        auth.currentUser,
        emailReset?.newEmail?.email,
      );

      setLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error occurred while sending verification to new email",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Verify and update to new email
  const handleNewEmailVerification = async () => {
    try {
      await applyActionCode(auth, oobCode);

      resetCurrentUser();
      setEmailReset({
        newEmail: { isVerified: true },
      });

      setLoading(false);
      router.push("/auth-action?mode=emailChangeSuccess");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error verifying/updating new email",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Verify old email and initiate new email verification
  const handleOldEmailVerification = async () => {
    try {
      await applyActionCode(auth, oobCode);

      setEmailReset({
        oldEmail: { isVerified: true },
      });

      verifyNewEmail();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error verifying old email",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (
      !loadingState &&
      mode === "verifyEmail" &&
      !emailReset?.oldEmail?.isVerified
    ) {
      handleOldEmailVerification();
    }

    if (
      !loadingState &&
      mode === "verifyAndChangeEmail" &&
      !emailReset?.newEmail?.isVerified
    ) {
      handleNewEmailVerification();
    }
  }, [loadingState, emailReset, currentUser]);

  if (loading || loadingState) return <LoadingSpinner />;

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-white p-6 px-6 py-12 shadow-10px md:w-[460px]">
      <Image
        width={48}
        height={48}
        src="/icons/mdi_security.svg"
        alt="security icon"
      />

      <h1 className="my-6 w-8/12 text-center text-4xl font-normal tracking-tight text-darkGreen">
        Verify your new email address
      </h1>
      <p className="text-base font-normal tracking-tight text-gray40">
        You will receive a verification email at:
      </p>

      <div className="mt-8 flex h-[50px] w-full flex-col items-center justify-center rounded-2xl bg-[#EBEBEB] text-center text-sm font-normal tracking-tight text-gray60">
        {emailReset?.newEmail?.email}
      </div>
    </div>
  );
}
