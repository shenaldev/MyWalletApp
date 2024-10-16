import ThemeToggle from "../topbar/theme-toggle";
import MobileNavDrawer from "./mobilenav-drawer";

function MobileHeader() {
  return (
    <div className="flex justify-between bg-primary p-4 dark:bg-slate-950">
      <MobileNavDrawer />
      <h1 className="text-2xl font-semibold text-white">My Wallet App</h1>
      <ThemeToggle />
    </div>
  );
}

export default MobileHeader;
