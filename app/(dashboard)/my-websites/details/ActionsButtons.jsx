"use client";
import TooltipStyled from "@/components/layout/tooltip-styled";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import TutorialModal from "./TutorialModal";

export default function ActionsButtons() {
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
      <div className="mt-[22px] flex w-full items-center justify-between">
        <p className="my-auto self-stretch text-base font-[450] leading-loose tracking-tight text-textDark">
          Need to make some changes?
        </p>

        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            className="min-h-[40px] rounded-[10px] px-2"
          >
            <PencilIcon size={14} /> Request Updates
          </Button>

          <TooltipStyled
            title="Markup Guide"
            onClick={() => setShowTutorialModal(true)}
          >
            <p>
              Visit the link below to learn more about how tot use markup
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
