"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmationBox({
  title,
  description = "Redirecting you to login in:",
  navigateTo = "/login",
}) {
  const [seconds, setSeconds] = useState(10);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);

    if (seconds <= 0) {
      clearInterval(interval);
      router.push(navigateTo);
    }

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="shadow-10px flex w-full flex-col items-center justify-center rounded-2xl bg-white p-6 px-6 py-12 md:w-[360px]">
      <Check
        size={48}
        className="bg-gradient-green2 rounded-full p-2 text-white"
      />

      <h1 className="my-6 text-center text-4xl font-normal tracking-tight text-darkGreen">
        {title}
      </h1>
      <p className="text-base font-normal tracking-tight text-gray40">
        {description}
      </p>

      <p className="mt-8 text-center text-4xl font-normal tracking-tight text-darkGreen">
        <span className="font-medium">{seconds}</span> seconds
      </p>
    </div>
  );
}
