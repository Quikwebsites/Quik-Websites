"use client";

import DashboardPageHeading from "@/components/layout/dashboard-page-heading";
import WebsiteCard from "./WebsiteCard";
import AddNewWebsite from "./AddNewWebsite";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuthStore } from "@/lib/store";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/layout/loading-spinner";

export default function MyWebsitesPage() {
  const [loading, setLoading] = useState(true);
  const [websitesData, setWebsitesData] = useState([]);
  const { currentUser } = useAuthStore();

  const fetchAllWebsites = async () => {
    let websiteNum = 1;
    const allWebsitesData = [];

    try {
      while (true) {
        const querySnap = await getDocs(
          collection(db, `users/${currentUser.email}/website${websiteNum}`),
        );
        querySnap.forEach((doc) => {
          allWebsitesData.push({ ...doc.data() });
        });

        if (!querySnap.size) break;

        websiteNum++;
      }

      setWebsitesData(allWebsitesData);
    } catch (error) {
      console.error("Error fetching websites:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) fetchAllWebsites();
  }, [currentUser]);

  return (
    <div className="max-w-7xl pb-10">
      <DashboardPageHeading>My Websites</DashboardPageHeading>

      {loading ? (
        <LoadingSpinner position="mx-auto mt-40" />
      ) : (
        <div className="flex flex-wrap justify-center gap-[14px] pt-8 animate-in md:justify-start">
          {websitesData &&
            websitesData.map((website) => (
              <WebsiteCard key={website.domainInfo.domainName} data={website} />
            ))}

          <AddNewWebsite />
        </div>
      )}
    </div>
  );
}
