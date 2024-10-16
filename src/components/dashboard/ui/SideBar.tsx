import { BarChart4Icon } from "lucide-react";
import { Link } from "react-router-dom";

import { Separator } from "@/components/ui/separator";

//IMPORT UTILS
import getRoute from "@/lib/route-links";

//IMPORT COMPONENTS
import NavMenu from "./nav-menu";

function SideBar() {
  return (
    <div className="box-border flex min-h-[100vh] w-[280px] flex-col gap-4 border-r border-r-slate-200 bg-background p-4 dark:border-r-slate-800">
      <div className="pt-4">
        <h1 className="text-2xl font-semibold text-foreground">
          My Wallet App
        </h1>
        <Separator className="my-2" />
      </div>
      <div className="grow">
        <p className="mb-2 text-sm font-normal text-slate-800 dark:text-slate-200">
          Select Month
        </p>
        <NavMenu onChange={() => {}} />
        <Separator className="my-4" />
        <div className="flex items-center gap-2 px-3 text-sm">
          <BarChart4Icon className="size-4" />
          <Link to={getRoute("analysis")}>Analysis</Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
