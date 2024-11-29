"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { sendEmailVerification } from "firebase/auth";
import { z } from "zod";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase/config";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/lib/store";

const formSchema = z.object({
  // currentEmail: z.string().email({ message: "Invalid email address" }),
  newEmail: z.string().email({ message: "Invalid email address" }),
});

export default function GetNewEmailVerification() {
  const { currentUser } = useAuthStore();

  // console.log(currentUser);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentEmail: currentUser.email,
      newEmail: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await sendEmailVerification(auth.currentUser);
    } catch (error) {
      console.error(error);
      toast({
        title: error.message,
        description: "Check your credentials and try again",
        variant: "destructive",
      });
    }
  };

  return (
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
                  placeholder="email@example.com"
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
  );
}
