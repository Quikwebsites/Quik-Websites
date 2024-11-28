"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { confirmPasswordReset } from "firebase/auth";

import { LoaderCircle } from "lucide-react";
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

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export default function NewPasswordForm({ oobCode }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      await confirmPasswordReset(auth, oobCode, data.newPassword);
      router.push("/reset-password?phase=reset-successful");
    } catch (error) {
      console.error(error);
      toast({
        title: error.message,
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem variant="auth">
              <FormLabel variant="auth">New password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Min 8 characters"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem variant="auth">
              <FormLabel variant="auth">Confirm password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm new password"
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
            "Save Password & Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
