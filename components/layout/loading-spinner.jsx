import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export default function LoadingSpinner({ position }) {
  return (
    <LoaderCircle
      size={48}
      className={cn("animate-spin text-gray30", position)}
    />
  );
}
