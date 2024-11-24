import TooltipStyled from "@/components/layout/tooltip-styled";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { AccountDataForm } from "./AccountDataForm";

export default function AccountTabContent() {
  return (
    <div className="mt-8 flex w-full flex-col">
      {/* Your Profile section */}
      <div className="flex w-full flex-wrap items-center justify-between gap-6 border-b border-gray20 pb-6">
        <div className="space-y-1">
          <p className="text-xl font-bold tracking-normal text-gray80">
            Your Profile
          </p>
          <p className="text-grey60 text-base leading-relaxed">
            Please update your profile settings here
          </p>
        </div>

        <div className="flex items-center gap-2">
          <TooltipStyled title="Upgrade today">
            <p>
              Get ranked higher with advanced SEO and page Meta data
              optimizations
            </p>
          </TooltipStyled>

          <Button variant="gradient">
            Go Premium <Star size={20} strokeWidth={2.5} />
          </Button>
        </div>
      </div>

      <AccountDataForm />
    </div>
  );
}
