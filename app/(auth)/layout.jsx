import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="relative flex justify-center pt-6 md:pt-12">
        <Button
          variant="ghost"
          className="absolute bottom-0 left-3 md:left-36 md:px-2.5 md:py-1"
        >
          <ChevronLeft /> Back to website
        </Button>

        <Image
          priority
          src="/logo.svg"
          alt="quik websites logo"
          width={218}
          height={31}
          className="h-auto w-[168px] md:w-[218px]"
        />
      </div>

      <main className="flex h-full w-full flex-col items-center justify-center">
        {children}
      </main>

      {/* Footer */}
      <div className="flex w-full justify-between border-t border-gray30 bg-gray5 px-6 py-2 text-xs font-medium tracking-[-0.098px] md:px-16 md:py-4 md:text-sm">
        <p className="text-darkGreen">Copyright 2025 Quikwebsites</p>

        <div className="flex gap-3 text-midGreen md:gap-8">
          <Link
            href="https://www.quikwebsites.com/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-textDark"
          >
            Privacy Policy
          </Link>

          <Link
            href="https://www.quikwebsites.com/terms-of-service"
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
