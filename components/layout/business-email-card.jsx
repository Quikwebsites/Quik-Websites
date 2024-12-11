"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import StripePricingTableModal from "./stripe-pricing-table-modal";
import { useState } from "react";

export function BusinessEmailCard({ bulletPoints }) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  return (
    <div className="flex w-full max-w-[228px] flex-col items-center rounded-2xl bg-darkGreen p-[18px]">
      <h5 className="w-[170px] border-b border-solid border-b-lightGreen pb-2.5 text-center text-lg font-bold capitalize tracking-[-0.36px] text-lightGreen">
        Get a business email
      </h5>

      <div className="mt-3 flex w-[170px] max-w-full flex-col gap-2.5">
        {bulletPoints.map((point, index) => (
          <div key={index} className="flex w-full">
            <Image
              loading="lazy"
              width={13}
              height={9}
              src="/icons/checkmark-green.svg"
              alt={`${point} bullet point`}
              className="my-auto mr-[12px]"
            />

            <p className="flex-1 text-sm font-normal leading-6 tracking-[-0.176px] text-lightGreen">
              {point}
            </p>
          </div>
        ))}
      </div>

      <Button
        variant="lightGreen"
        className="mt-5 w-full text-[16px]/[25px] font-[450]"
        onClick={() => setShowUpgradeModal(true)}
      >
        Upgrade
      </Button>

      {showUpgradeModal && (
        <StripePricingTableModal setShowUpgradeModal={setShowUpgradeModal} />
      )}
    </div>
  );
}
