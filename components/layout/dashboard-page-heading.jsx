import { cn } from "@/lib/utils";

export default function DashboardPageHeading({ children, className }) {
  return (
    <h1
      className={cn(
        "text-[28px]/[42px] font-medium tracking-[-0.56px] text-black",
        className,
      )}
    >
      {children}
    </h1>
  );
}
