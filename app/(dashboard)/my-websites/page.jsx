import DashboardPageHeading from "@/components/layout/dashboard-page-heading";
import WebsiteCard from "./WebsiteCard";
import AddNewWebsite from "./AddNewWebsite";
import { websitesData } from "./websites-data";

export const metadata = {
  title: "My Websites",
};

export default function MyWebsitesPage() {
  return (
    <div className="max-w-7xl pb-10">
      <DashboardPageHeading>My Websites</DashboardPageHeading>

      <div className="flex flex-wrap gap-[14px] pt-8">
        {websitesData.map((website) => (
          <WebsiteCard key={website.name} data={website} />
        ))}

        <AddNewWebsite />
      </div>
    </div>
  );
}
