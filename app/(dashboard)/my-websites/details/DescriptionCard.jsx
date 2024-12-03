import { Button } from "@/components/ui/button";
import { Check, MoveRight } from "lucide-react";
import ActionsButtons from "./ActionsButtons";

export function DescriptionCard() {
  return (
    <div className="shadow-10px flex flex-col gap-6 rounded-2xl bg-white p-6">
      <div className="flex w-full flex-col">
        <p className="text-base font-[450] leading-none tracking-tight text-black">
          Site Description
        </p>

        <p className="mt-3 rounded-lg border border-gray20 px-5 pb-28 pt-7 text-sm font-[450] leading-6 tracking-tight text-textDark">
          Your Business Description, Ex. we are an airplane maintence company
          based in Longmont, CO. We offer tuning, modification, and painting
          services. Our hours are from 9am-5pm everyday except sundays on which
          we are closed. Our phone number is (123)-456-7891.
        </p>

        <ActionsButtons />
      </div>

      {/* Domain Info */}
      <div className="flex w-full flex-col pb-8 tracking-tight">
        <p className="text-base font-[450] leading-none tracking-tight text-black">
          Domain
        </p>
        <div className="bg-gray10 mt-3 flex w-full justify-between rounded-lg px-5 py-2">
          <div className="flex items-center gap-2.5">
            <p className="my-auto text-base font-[450] leading-none tracking-tight text-textDark">
              Domain Name
            </p>
            <Check
              size={18}
              strokeWidth={3}
              color="white"
              className="bg-gradient-green2 rounded-full p-0.5"
            />
            <p className="my-auto text-base font-normal text-black">Active</p>
          </div>

          <Button
            variant="secondary"
            className="h-max rounded-[10px] px-5 py-1 font-[450]"
          >
            Visit my site <MoveRight size={18} strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      {/* Active Dates  */}
      <div className="mt-6 flex min-h-[120px] w-full flex-col">
        <p className="text-base font-[450] leading-none tracking-tight text-black">
          Active Dates
        </p>
        <div className="bg-gray10 mt-3 flex w-full items-center justify-between gap-2.5 rounded-lg px-5 py-4 text-base leading-none tracking-tight text-textDark">
          <p className="my-auto font-[450]">Active since</p>
          <time dateTime="2024-10-23" className="font-normal">
            23 October 2024
          </time>
        </div>

        <Button
          variant="link"
          className="mt-3 text-xs font-normal leading-loose tracking-tight text-destructive50"
        >
          De-list website
        </Button>
      </div>
    </div>
  );
}
