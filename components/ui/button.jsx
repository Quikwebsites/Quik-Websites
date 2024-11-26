import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkGreen focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 dark:ring-offset-darkGreen dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "bg-darkGreen text-white hover:bg-darkGreen/90 text-sm font-normal",
        destructive:
          "bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
        outline:
          "border border-gray30 bg-white text-gray60 hover:bg-gray5 hover:text-gray80 rounded-full",
        secondary:
          "bg-[radial-gradient(204.89%_123.2%_at_100%_123.2%,#000_12.94%,#283830_55.5%,#000_100%)] hover:bg-darkGreen text-center text-xs font-normal leading-6 tracking-tight text-white",
        gradient:
          "bg-gradient-green1 rounded-full px-4 py-2.5 text-sm font-bold tracking-[-0.084px] text-white",
        ghost:
          "hover:bg-gray5 hover:text-black text-darkGreen text-sm leading-7 tracking-[-0.28px] font-normal",
        link: "text-darkGreen underline underline-offset-2 hover:underline dark:text-gray20",
        lightGreen:
          "rounded-[8px] bg-lightGreen px-2.5 py-2.5 text-center text-black",
      },
      size: {
        default: "w-max",
        sm: "px-4 py-2.5 rounded-full",
        md: "px-7 py-1 rounded-[70px]",
        lg: "h-11 rounded-md px-8",
        full: "h-14 w-full rounded-2xl p-2.5",
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
