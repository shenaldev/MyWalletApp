import { useMediaQuery } from "@/hooks/use-media-query";

import TopBar from "@/components/dashboard/topbar/top-bar";
import MobileHeader from "@/components/dashboard/ui/mobile-header";
import SideBar from "@/components/dashboard/ui/sidebar";
import { Separator } from "@/components/ui/separator";

type DashboardLayoutProps = {
  children?: React.ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!isDesktop)
    return (
      <div className="h-full w-full bg-background">
        <MobileHeader />
        <Separator />
        <div className="h-full min-h-[100dvh] p-2 md:p-4">{children}</div>
      </div>
    );

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <SideBar />
      <div className="w-full bg-background">
        <TopBar />
        <Separator />
        <div className="container mx-auto p-4">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
