"use client";

import DashboardPageHeading from "@/components/layout/dashboard-page-heading";
import { DescriptionCard } from "./DescriptionCard";
import Image from "next/image";
import { useAuthStore } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { MoveRight } from "lucide-react";
import { db } from "@/lib/firebase/config";
import LoadingSpinner from "@/components/layout/loading-spinner";
import { Button } from "@/components/ui/button";
import ActionsButtons from "./ActionsButtons";

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

      <div className="pt-8">
        <div className="flex flex-col gap-2.5 md:flex-row">
          <div className="no-scrollbar h-[297px] w-full overflow-auto rounded-2xl shadow-4px-i md:w-[266px]">
            <Image
              loading="lazy"
              width={600}
              height={800}
              src={`/${websiteData?.subscriptionInfo.design.toLowerCase().split(" ").join("-")}.jpeg`}
              alt={websiteData?.companyInfo.companyName + "Website design"}
              className="h-max object-contain object-top"
            />
          </div>

          <div className="flex w-full flex-col justify-between rounded-2xl bg-white p-6 capitalize shadow-10px">
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-darkGreen">
                {websiteData?.companyInfo.companyName}
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-midGreen">
                {/* {websiteData?.subscriptionInfo.basicOrPremium} design{" "} */}
                {websiteData?.subscriptionInfo.design}
              </p>
            </div>

            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <a
                href={"https://" + websiteData?.domainInfo.domainName}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  className="my-4 h-max w-full rounded-[10px] px-8 py-4 text-sm font-[450] md:my-0"
                >
                  Visit my site <MoveRight size={18} strokeWidth={1.5} />
                </Button>
              </a>

              <ActionsButtons
                domainName={websiteData?.domainInfo?.domainName}
              />
            </div>
          </div>
        </div>

        <section className="mt-2.5 flex w-full flex-col gap-3">
          <DescriptionCard websiteData={websiteData} />
        </section>
      </div>
    </div>
  );
}
