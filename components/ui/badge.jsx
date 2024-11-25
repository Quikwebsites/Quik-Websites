import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-gray60 px-2 py-0.5 leading-10 text-sm capitalize font-[450] transition-colors focus:outline-none focus:ring-1 focus:ring-gray80 focus:ring-offset-2 ",
  {
    variants: {
      variant: {
        default: "border-transparent bg-darkGreen text-white ",
        success: "border-transparent bg-success5 text-success50 ",
        warning: "border-transparent bg-warning5 text-warning50 ",
        brand: "border-transparent bg-brand5 text-brand50 ",
        destructive: "border-transparent bg-destructive5 text-destructive50  ",
        outline: "text-gray60 ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
