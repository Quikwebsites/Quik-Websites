import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { InfoIcon } from "lucide-react";
import { TooltipArrow } from "@radix-ui/react-tooltip";

export default function TooltipStyled({ children, title, onClick }) {
  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" className="cursor-help">
            <InfoIcon size={20} />
          </Button>
        </TooltipTrigger>

        <TooltipContent
          side="left"
          sideOffset={8}
          onClick={onClick}
          className="max-w-[312px] rounded-2xl border-none bg-gray80 p-3 text-white"
        >
          <p className="mb-2 text-sm font-bold tracking-tight">{title}</p>
          <div className="text-xs font-[450] leading-5">{children}</div>

          <TooltipArrow className="fill-gray80" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
