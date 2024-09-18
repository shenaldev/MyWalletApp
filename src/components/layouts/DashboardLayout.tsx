import { useMediaQuery } from "@/hooks/useMediaQuery";
//IMPORT COMPONENTS
import { Separator } from "@/components/ui/separator";
import SideBar from "@/components/dashboard/ui/SideBar";
import TopBar from "@/components/dashboard/topbar/TopBar";
import MobileHeader from "@/components/dashboard/ui/MobileHeader";

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
