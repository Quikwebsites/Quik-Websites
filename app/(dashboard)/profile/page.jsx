import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardPageHeading from "@/components/layout/dashboard-page-heading";
import AccountTabContent from "./AccountTabContent";
import PaymentsTabContent from "./(payments-tab)/PaymentsTabContent";

export const metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <div className="max-w-7xl">
      <DashboardPageHeading>Account Settings</DashboardPageHeading>

      <div className="flex w-full flex-col gap-11 pt-6 md:flex-row">
        <Tabs defaultValue="payments" className="w-full">
          <TabsList>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <AccountTabContent />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentsTabContent />
          </TabsContent>

          <TabsContent value="subscription">Subscription</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
