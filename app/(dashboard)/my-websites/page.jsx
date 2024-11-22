import DashboardPageHeading from "@/components/layout/dashboard-page-heading";
import WebsiteCard from "./website-card";
import AddNewWebsite from "./add-new-website";

const websitesData = [
  {
    name: "Website name",
    template: "Template Name",
    image: "/website-template-1.jpg",
  },
  {
    name: "Website name",
    template: "Template Name",
    image: "/website-template-2.jpg",
  },
  {
    name: "Website name",
    template: "Template Name",
    image: "/website-template-3.jpg",
  },
];

export const metadata = {
  title: "My Websites",
};

export default function MyWebsitesPage() {
  return (
    <div className="pb-10">
      <DashboardPageHeading>My Websites</DashboardPageHeading>

      <div className="flex flex-wrap gap-[14px] pt-8">
        {websitesData.map((website) => (
          <WebsiteCard data={website} />
        ))}

        <AddNewWebsite />
      </div>
    </div>
  );
}
