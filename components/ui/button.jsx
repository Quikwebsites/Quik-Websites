import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkGreen focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-darkGreen dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
        destructive:
          "bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
        outline:
          "border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        secondary:
          "bg-[radial-gradient(204.89%_123.2%_at_100%_123.2%,#000_12.94%,#283830_55.5%,#000_100%)] hover:bg-darkGreen text-center text-xs font-normal leading-6 tracking-tight text-white",
        ghost:
          "hover:bg-gray5 hover:text-black text-darkGreen text-sm leading-7 tracking-[-0.28px] font-normal",
        link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
        lightGreen:
          "rounded-[8px] bg-lightGreen px-2.5 py-2.5 text-center text-black",
      },
      size: {
        default: "w-max",
        sm: "h-9 rounded-md px-3",
        md: "px-7 py-1 rounded-[70px]",
        lg: "h-11 rounded-md px-8",
        full: "w-full",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
