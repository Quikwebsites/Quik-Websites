"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/profile">Username</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {segments.map((path, index) => (
          <React.Fragment key={path + index}>
            {index + 1 !== segments.length ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${path}`}>
                    {path.split("-").join(" ")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>{path.split("-").join(" ")}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
