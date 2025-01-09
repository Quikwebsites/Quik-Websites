import Image from "next/image";
import Link from "next/link";
import BackButton from "./BackButton";
import { Suspense } from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-background">
      <div className="relative flex items-center justify-end pr-3 pt-6 md:justify-center md:pr-0 md:pt-12">
        <Suspense>
          <BackButton />
        </Suspense>

        <Image
          priority
          src="/logo.svg"
          alt="quik websites logo"
          width={218}
          height={31}
          className="h-auto w-[168px] md:w-[218px]"
        />
      </div>

      <main className="flex h-full w-full flex-col items-center justify-center p-4">
        {children}
      </main>

      {/* Footer */}
      <div className="flex w-full justify-between border-t border-gray30 bg-gray5 px-6 py-2 text-xs font-medium tracking-[-0.098px] md:px-16 md:py-4 md:text-sm">
        <p className="text-darkGreen">Copyright 2025 Quikwebsites</p>

        <div className="flex gap-3 text-midGreen md:gap-8">
          <Link
            href={`${process.env.NEXT_PUBLIC_WEBFLOW_URL}/privacy-policy`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-textDark"
          >
            Privacy Policy
          </Link>

          <Link
            href={`${process.env.NEXT_PUBLIC_WEBFLOW_URL}/terms-and-conditions`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-textDark"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
