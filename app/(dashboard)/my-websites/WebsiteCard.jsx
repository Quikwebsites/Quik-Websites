import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function WebsiteCard({ data }) {
  const { name, template, image } = data;

  return (
    <div className="shadow-10px flex w-[251px] flex-col overflow-hidden rounded-[20px] bg-white p-2.5">
      <Image
        loading="lazy"
        src={image}
        alt={name + "Website preview"}
        width={200}
        height={300}
        className="shadow-4px-i aspect-[0.82] w-full rounded-xl object-cover"
      />

      <div className="mt-1.5 flex w-full items-center justify-between gap-10 self-start pl-2.5 pr-1 capitalize">
        <div>
          <p className="text-sm leading-8 tracking-tight text-darkGreen">
            {name}
          </p>
          <p className="text-[10px] leading-5 tracking-tight text-gray600">
            {template}
          </p>
        </div>

        <Link
          href={`/my-websites/details?id=${name.toLowerCase().split(" ").join("-")}`}
        >
          <Button variant="secondary" size="md">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}
