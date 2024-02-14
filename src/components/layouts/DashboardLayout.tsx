import { Separator } from "@/components/ui/separator";
import TopBar from "@/components/elements/dashboard/TopBar";
import SideBar from "@/components/elements/dashboard/SideBar";
import MobileHeader from "@/components/elements/dashboard/MobileHeader";
//IMPORT HOOKS
import { useMediaQuery } from "@/hooks/useMediaQuery";

type DashboardLayoutProps = {
  children?: React.ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!isDesktop)
    return (
      <div className="h-full w-full bg-dashboardBackground">
        <MobileHeader />
        <Separator />
        <div className="h-full min-h-[100dvh] px-4 py-4">{children}</div>
      </div>
    );

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <SideBar />
      <div className="w-full bg-dashboardBackground">
        <TopBar />
        <Separator />
        <div className="container mx-auto px-4 py-4">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
