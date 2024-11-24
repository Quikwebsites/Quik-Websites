import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[176px] w-full max-w-[520px] rounded-3xl border border-gray30 bg-white p-3 !text-base font-[450] tracking-[-0.112px] !text-gray60 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-darkGreen placeholder:text-gray40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
