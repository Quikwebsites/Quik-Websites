import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";
import { BusinessEmailCard } from "./business-email-card";
import SidebarNavigationItem from "./sidebar-navigation-item";

const navigationItems = [
  {
    icon: "HomeIcon",
    title: "My Websites",
    pathname: "/my-websites",
  },
  {
    icon: "CartIcon",
    title: "My Websites",
    pathname: "/my-websites2",
  },
  {
    icon: "DomainsIcon",
    title: "Domains",
    pathname: "/domains",
  },
  {
    icon: "ProfileIcon",
    title: "Profile",
    pathname: "/profile",
  },
  {
    icon: "LockIcon",
    title: "Sign Out",
    pathname: "/sign-out",
  },
];

const bulletPoints = [
  ".com email address",
  "Google Workspace",
  "Look More Professional",
  "Have Brand Consistency",
  "Manage Customer Queries",
];

export default function AppSidebar() {
  return (
    <Sidebar className="shadow-10px overflow-auto rounded-b-[10px] border-none">
      <SidebarHeader className="mx-5 items-center border-b border-[#B7DFCC] pb-[54px] pt-[44px]">
        <Image
          priority
          src="/logo.svg"
          alt="Company logo"
          width={218}
          height={31}
          className="h-auto max-w-[218px]"
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="mt-9 gap-6 p-0 pl-8">
          {navigationItems.map((item, index) => (
            <SidebarNavigationItem
              key={index + item.title}
              title={item.title}
              icon={item.icon}
              pathname={item.pathname}
            />
          ))}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="items-center pb-7">
        <BusinessEmailCard bulletPoints={bulletPoints} />
      </SidebarFooter>
    </Sidebar>
  );
}
