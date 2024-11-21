import AppSidebar from "@/components/layout/app-sidebar";
import Breadcrumbs from "@/components/layout/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="bg-background w-full px-11 pt-8">
        <div className="mb-2.5 flex items-center">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="ml-1 mr-[11px] h-4 w-px bg-gray30"
          />
          <Breadcrumbs />
        </div>

        {children}
      </main>
    </SidebarProvider>
  );
}
