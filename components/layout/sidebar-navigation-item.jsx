"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import {
  HomeIcon,
  CartIcon,
  DomainsIcon,
  ProfileIcon,
  LockIcon,
} from "./icons";

const icons = { HomeIcon, CartIcon, DomainsIcon, ProfileIcon, LockIcon };

export default function SidebarNavigationItem({ icon, title, pathname }) {
  const currentPathname = usePathname();
  const isActive =
    pathname === `/${currentPathname.split("/").filter(Boolean)[0]}`;

  const IconComponent = icons[icon];

  return (
    <Link
      href={pathname}
      className={`flex h-9 w-full items-center gap-3 p-0 text-base tracking-[-0.32px] ${isActive ? "justify-between font-medium text-darkGreen" : "font-normal text-midGreen"}`}
    >
      <div className="flex items-center gap-3">
        <IconComponent fill={isActive ? "#16240D" : "#739A88"} width={24} />

        <p>{title}</p>
      </div>

      {isActive && (
        <Separator orientation="vertical" className="rounded-2xl bg-lime-950" />
      )}
    </Link>
  );
}
