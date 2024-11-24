"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(
  ({ title, description, className, ...props }, ref) => (
    <div className="flex w-[520px] gap-2.5">
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "data-[state=checked]:bg-gradient-green2 peer mt-[2px] h-5 w-5 shrink-0 rounded-lg border border-gray30 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkGreen focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-greenGradientColor2 data-[state=checked]:text-white",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <Check size={16} strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      <div className="">
        <label
          htmlFor={props.id}
          className="text-base font-bold tracking-[-0.112px] text-gray80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {title}
        </label>
        <p className="text-base font-[450] text-gray60">{description}</p>
      </div>
    </div>
  ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
