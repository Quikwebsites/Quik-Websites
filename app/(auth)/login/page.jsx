"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import AuthFormCard from "@/components/layout/auth-form-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
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

            <Link href="#" className="text-sm text-midGreen">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" variant="default" size="full">
            Sign In
          </Button>

          <Link
            href="#"
            className="mt-6 block w-full text-center text-sm text-darkGreen"
          >
            Not registered yet? Create an Account{" "}
          </Link>
        </form>
      </Form>
    </AuthFormCard>
  );
}
