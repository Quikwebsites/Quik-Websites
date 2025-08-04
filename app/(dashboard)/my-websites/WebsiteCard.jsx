import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function WebsiteCard({ data }) {
  const { companyInfo, domainInfo, subscriptionInfo } = data || {};

  return (
    <div className="flex w-[251px] flex-col overflow-hidden rounded-[20px] bg-white p-2.5 shadow-10px">
      <Image
        loading="lazy"
        src={`/${subscriptionInfo?.design?.toLowerCase().split(" ").join("-")}.jpeg`}
        alt={companyInfo?.companyName + "Website preview"}
        width={200}
        height={300}
        className="aspect-[0.82] w-full rounded-xl object-cover object-top shadow-4px-i"
      />

      <div className="mt-1.5 flex w-full items-center justify-between self-start pl-2.5 pr-1 capitalize">
        <div>
          <p className="max-w-[130px] truncate text-sm leading-8 tracking-tight text-darkGreen">
            {companyInfo?.companyName}
          </p>
          <p className="text-[10px] leading-5 tracking-tight text-gray600">
            {subscriptionInfo?.design}
            {/* {subscriptionInfo.basicOrPremium} design {subscriptionInfo.design} */}
          </p>
        </div>

        <Link href={`/my-websites/details?id=${domainInfo?.domainName}`}>
          <Button variant="secondary" size="md">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}
