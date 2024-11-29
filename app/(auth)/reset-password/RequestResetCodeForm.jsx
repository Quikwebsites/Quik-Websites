"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { auth } from "@/lib/firebase/config";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function RequestResetCodeForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast({
        title: "Verification email sent",
        description:
          "Check your email for the password reset link. If you don't get the email, please try again with valid credentials.",
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem variant="auth">
              <FormLabel variant="auth">Email*</FormLabel>
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
            "Request code"
          )}
        </Button>

        <Link
          href="/login"
          className="mt-6 block w-full text-center text-sm text-darkGreen underline"
        >
          Return to login
        </Link>
      </form>
    </Form>
  );
}
