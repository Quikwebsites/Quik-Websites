"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

import { db } from "@/lib/firebase/config";
import { useAuthStore } from "@/lib/store";
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
import LoadingSpinner from "@/components/layout/loading-spinner";

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
  receiveNewsletters: z.boolean().optional(),
});

export function AccountDataForm() {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuthStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      biography: "",
      receiveNewsletters: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const personalInfoQuerySnap = await getDocs(
        collection(db, `users/${currentUser.email}/personalInfo`),
      );

      if (!querySnap.size) throw new Error("User does not exits");

      const userDocRef = doc(
        db,
        `users/${currentUser.email}/personalInfo`,
        personalInfoQuerySnap.docs[0].id,
      );

      await updateDoc(userDocRef, data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const personalInfoQuerySnap = await getDocs(
        collection(db, `users/${currentUser.email}/personalInfo`),
      );
      personalInfoQuerySnap.forEach((doc) => {
        const userData = doc.data();
        form.reset({
          fullName: userData?.fullName || "",
          phoneNumber: userData?.phoneNumber || "",
          email: userData?.customerEmail || "",
          biography: userData?.customerBiography || "",
          receiveNewsletters: userData?.receiveNewsletters || false,
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <LoadingSpinner position="mx-auto mt-40" />;

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
          name="receiveNewsletters"
          render={({ field }) => (
            <FormItem className="items-start">
              <FormLabel>Notifications</FormLabel>
              <FormControl>
                <Checkbox
                  id="receiveNewsletters"
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
