import AppSidebar from "@/components/layout/app-sidebar";
import Breadcrumbs from "@/components/layout/breadcrumbs";
import ProtectedLayout from "@/components/layout/protected-layout";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedLayout>
      <SidebarProvider>
        <AppSidebar />

        <main className="bg-background w-full px-6 py-4 md:px-11 md:py-8">
          <div className="mb-2.5 flex items-center">
            <SidebarTrigger className="-ml-2" />

            <Separator
              orientation="vertical"
              className="ml-1 mr-[11px] h-4 w-px bg-gray30"
            />
            <Breadcrumbs />
          </div>

          {children}
        </main>
      </SidebarProvider>
    </ProtectedLayout>
  );
}
