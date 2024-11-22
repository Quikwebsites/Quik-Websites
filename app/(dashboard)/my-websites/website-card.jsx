import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function WebsiteCard({ data }) {
  const { name, template, image } = data;

  return (
    <div className="flex max-w-[251px] flex-col overflow-hidden rounded-[20px] bg-white p-2.5 shadow-[0px_0px_10px_0px_rgba(115,154,136,0.15)]">
      <Image
        loading="lazy"
        src={image}
        alt={name + "Website preview"}
        width={200}
        height={300}
        className="aspect-[0.82] w-full rounded-xl object-cover shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)_inset]"
      />

      <div className="mt-1.5 flex w-full items-center justify-between gap-10 self-start pl-2.5 pr-1">
        <div>
          <p className="text-sm leading-8 tracking-tight text-darkGreen">
            {name}
          </p>
          <p className="text-[10px] leading-5 tracking-tight text-gray600">
            {template}
          </p>
        </div>

        <Link href="/my-websites/details">
          <Button variant="secondary" size="md">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}
