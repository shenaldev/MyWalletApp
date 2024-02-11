import SideBar from "../elements/dashboard/SideBar";
import TopBar from "../elements/dashboard/TopBar";

type DashboardLayoutProps = {
  children?: React.ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      <SideBar />
      <div className="bg-dashboardBackground w-full">
        <TopBar />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
