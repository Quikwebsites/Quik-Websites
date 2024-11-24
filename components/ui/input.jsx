import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full max-w-[520px] rounded-full border border-gray30 bg-white p-3 pl-4 !text-base font-[450] tracking-[-0.112px] text-gray60 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-darkGreen placeholder:text-gray40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
