import DashboardPageHeading from "@/components/layout/dashboard-page-heading";
import { websitesData } from "../websites-data";
import { DescriptionCard } from "./DescriptionCard";
import Image from "next/image";

export const metadata = {
  title: "Website Details",
};

export default async function WebsiteDetailsPage({ searchParams }) {
  const { id } = await searchParams;
  const data = websitesData.find(
    (site) => site.name.toLowerCase().split(" ").join("-") === id,
  );

  return (
    <div className="max-w-7xl">
      <DashboardPageHeading>My Websites</DashboardPageHeading>

      <div className="flex flex-col gap-11 pt-8 md:flex-row">
        <Image
          loading="lazy"
          width={600}
          height={800}
          src={data?.image}
          alt={data?.name}
          className="h-max rounded-2xl object-contain object-top md:w-[55%]"
        />

        <section className="flex flex-col gap-3 md:w-[45%]">
          <div className="shadow-10px w-full justify-center rounded-2xl bg-white p-6 capitalize">
            <h2 className="text-2xl font-medium tracking-tight text-darkGreen">
              {data?.name}
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-midGreen">
              {data?.template}
            </p>
          </div>

          <DescriptionCard />
        </section>
      </div>
    </div>
  );
}
