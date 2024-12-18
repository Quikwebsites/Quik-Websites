"use client";
import TooltipStyled from "@/components/layout/tooltip-styled";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import TutorialModal from "./TutorialModal";

export default function ActionsButtons({ domainName }) {
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  useEffect(() => {
    if (showTutorialModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showTutorialModal]);

  return (
    <>
      <div className="flex w-full items-center justify-end gap-4">
        <p className="my-auto self-stretch text-xs font-[450] leading-loose tracking-tight text-textDark md:text-base">
          Need to make some changes?
        </p>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:support@quikwebsites.com?subject=Markup Request - from ${domainName}`}
          >
            <Button
              variant="lightGreen"
              className="min-h-[40px] rounded-[10px] px-2 text-xs font-normal"
            >
              <PencilIcon size={14} /> Request Updates
            </Button>
          </a>

          <TooltipStyled
            title="Markup Guide"
            onClick={() => setShowTutorialModal(true)}
          >
            <p>
              Visit the link below to learn more about how to use markup
              <br />
              <br />
              <span className="cursor-pointer underline">
                https://www.youtube.com/watch?v=A_18Yt64GWI
              </span>
            </p>
          </TooltipStyled>
        </div>
      </div>

      {showTutorialModal && (
        <TutorialModal setShowTutorialModal={setShowTutorialModal} />
      )}
    </>
  );
}
