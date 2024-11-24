"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, X } from "lucide-react";
import PhoneNumberInput from "@/components/layout/phone-number-input";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
  email: z.string().email({ message: "Invalid email address" }),
  biography: z.string(),
  notifications: z.boolean().optional(),
});

export function AccountDataForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "Joe guyster",
      phoneNumber: "+1234567890",
      email: "Joe@gmail.com",
      biography:
        "Hi there! 👋 I'm X-AE-A-19, an AI enthusiast and fitness aficionado. When I'm not crunching numbers or optimizing algorithms, you can find me hitting the gym.",
      notifications: true,
    },
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneNumberInput {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email address" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="biography"
          render={({ field }) => (
            <FormItem className="items-start">
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here."
                  className="text-area-resizer"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notifications"
          render={({ field }) => (
            <FormItem className="items-start">
              <FormLabel>Notifications</FormLabel>
              <FormControl>
                <Checkbox
                  id="notifications"
                  title="Newsletter"
                  description="You will be notified about our latest updates"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className="text-sm font-bold"
          >
            Cancel <X size={20} />
          </Button>
          <Button
            type="submit"
            variant="secondary"
            size="sm"
            className="text-sm font-bold"
          >
            Save <Check size={20} />
          </Button>
        </div>
      </form>
    </Form>
  );
}
