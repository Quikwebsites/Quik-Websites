"use client";

import Link from "next/link";
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
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
    router.push("/reset-password?phase=new-password");
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

        <Button type="submit" variant="default" size="full" className="mt-4">
          Request code
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
