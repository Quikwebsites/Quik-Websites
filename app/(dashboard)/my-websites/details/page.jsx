"use client";

import DashboardPageHeading from "@/components/layout/dashboard-page-heading";
import { DescriptionCard } from "./DescriptionCard";
import Image from "next/image";
import { useAuthStore } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import LoadingSpinner from "@/components/layout/loading-spinner";

export default function WebsiteDetailsPage() {
  const [loading, setLoading] = useState(true);
  const [websiteData, setWebsiteData] = useState();
  const { currentUser } = useAuthStore();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchWebsitesByDomain = async () => {
    let websiteNum = 1;

    try {
      while (true) {
        let currWebsiteData;

        const querySnap = await getDocs(
          collection(db, `users/${currentUser.email}/website${websiteNum}`),
        );
        querySnap.forEach((doc) => {
          currWebsiteData = doc.data();
        });

        if (currWebsiteData.domainInfo.domainName === id) {
          setWebsiteData(currWebsiteData);
          break;
        }

        if (!querySnap.size) break;

        websiteNum++;
      }
    } catch (error) {
      console.error("Error fetching websites:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsitesByDomain();
  }, []);

  if (loading) return <LoadingSpinner position="mx-auto mt-40" />;

  return (
    <div className="max-w-7xl">
      <DashboardPageHeading>My Websites</DashboardPageHeading>

      <div className="flex flex-col gap-11 pt-8 md:flex-row">
        <Image
          loading="lazy"
          width={600}
          height={800}
          src={`/website-template-${websiteData?.subscriptionInfo.design}.jpg`}
          alt={websiteData?.companyInfo.companyName + "Website design"}
          className="h-max rounded-2xl object-contain object-top md:w-[55%]"
        />

        <section className="flex flex-col gap-3 md:w-[45%]">
          <div className="w-full justify-center rounded-2xl bg-white p-6 capitalize shadow-10px">
            <h2 className="text-2xl font-medium tracking-tight text-darkGreen">
              {websiteData?.companyInfo.companyName}
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-midGreen">
              {websiteData?.subscriptionInfo.basicOrPremium} design{" "}
              {websiteData?.subscriptionInfo.design}
            </p>
          </div>

          <DescriptionCard websiteData={websiteData} />
        </section>
      </div>
    </div>
  );
}
