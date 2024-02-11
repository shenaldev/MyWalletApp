import { Separator } from "@/components/ui/separator";
import NavMenu from "./NavMenu";

function SideBar() {
  return (
    <div className="box-border flex h-[100vh] w-[280px] flex-col gap-4 border-r border-r-slate-200 bg-primary p-4">
      <div className="pt-4">
        <h1 className="text-2xl font-semibold text-white dark:text-black">
          My Wallet App
        </h1>
        <Separator className="my-2" />
      </div>
      <div className="grow">
        <p className="mb-2 text-sm font-normal text-slate-200">Select Month</p>
        <NavMenu />
      </div>
      <div></div>
    </div>
  );
}

export default SideBar;
