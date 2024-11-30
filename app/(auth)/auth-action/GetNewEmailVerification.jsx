"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { sendEmailVerification } from "firebase/auth";
import { z } from "zod";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase/config";
import { useAuthStore } from "@/lib/store";
import LoadingSpinner from "@/components/layout/loading-spinner";
import AuthFormCard from "@/components/layout/auth-form-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  newEmail: z.string().email({ message: "Invalid email address" }),
});

export default function GetNewEmailVerification() {
  const { currentUser, loadingState, setEmailReset } = useAuthStore();

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newEmail: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await sendEmailVerification(auth.currentUser);

      setEmailReset({
        resetAttempted: true,
        newEmail: { email: data.newEmail },
        oldEmail: { email: currentUser.email },
      });

      toast({
        title: "Verification email sent",
        description: "Please check your email and follow the instructions.",
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: error.message,
        description: "Check your credentials and try again",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!loadingState && !currentUser) {
      router.push("/login");
    }
  }, [loadingState, currentUser]);

  if (loadingState || !currentUser) return <LoadingSpinner />;

  return (
    <>
      <AuthFormCard
        title="Change your email"
        description="Verify your current email address to proceed"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              disabled
              control={form.control}
              name="currentEmail"
              render={({ field }) => (
                <FormItem variant="auth">
                  <FormLabel variant="auth">Current email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        loadingState ? "email@example.com" : currentUser?.email
                      }
                      variant="auth"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage variant="auth" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem variant="auth">
                  <FormLabel variant="auth">New Email*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      variant="auth"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage variant="auth" />
                </FormItem>
              )}
            />

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              variant="default"
              size="full"
              className="mt-4"
            >
              {form.formState.isSubmitting ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                "Get verification"
              )}
            </Button>

            <Link
              href="/"
              className="mt-6 block w-full text-center text-sm text-darkGreen underline"
            >
              Cancel
            </Link>
          </form>
        </Form>
      </AuthFormCard>

      <p className="mt-8 text-xs font-normal text-gray60">
        Dont have access to your current email address?{" "}
        <Link href={"#"} className="underline">
          Contact Us
        </Link>
      </p>
    </>
  );
}
