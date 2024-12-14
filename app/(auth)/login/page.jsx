"use client";

import { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import AuthFormCard from "@/components/layout/auth-form-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { auth, db } from "@/lib/firebase/config";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function LoginPage() {
  const { setCurrentUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      // Get the current user customer ID from Firebase
      let customerId;
      const personalInfoQuerySnap = await getDocs(
        collection(db, `users/${data.email}/personalInfo`),
      );
      personalInfoQuerySnap.forEach((doc) => {
        const userData = doc.data();
        customerId = userData?.customerId;
      });

      const user = userCredential.user;
      setCurrentUser({ ...user, customerId });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast({
        title: error.message.includes("auth/invalid-credential")
          ? "Invalid credentials"
          : error.message,
        description: "Check your credentials and try again",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthFormCard
      title="Sign in"
      description="Enter your email and password to sign in!"
    >
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem variant="auth">
                <FormLabel variant="auth">Password*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Min 8 characters"
                    variant="auth"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-[52px] text-midGreen"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

                <FormMessage variant="auth" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between py-7">
            <Checkbox
              variant="simple"
              title="Keep me logged in"
              checked={keepLoggedIn}
              onCheckedChange={setKeepLoggedIn}
            />

            <Link
              href="/auth-action?mode=resetPasswordRequest"
              className="w-full text-right text-sm text-midGreen"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            variant="default"
            size="full"
          >
            {form.formState.isSubmitting ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>

          <Link
            href="https://quik-websites-4289fb.webflow.io/quik-pricing"
            className="mt-6 block w-full text-center text-sm text-darkGreen"
          >
            Not registered yet? Create an Account{" "}
          </Link>
        </form>
      </Form>
    </AuthFormCard>
  );
}
