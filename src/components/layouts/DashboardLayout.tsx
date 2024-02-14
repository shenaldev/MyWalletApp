import SideBar from "../elements/dashboard/SideBar";
import TopBar from "../elements/dashboard/TopBar";
import { Separator } from "../ui/separator";

type DashboardLayoutProps = {
  children?: React.ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full bg-dashboardBackground">
        <TopBar />
        <Separator className="bg-gray-300" />
        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
