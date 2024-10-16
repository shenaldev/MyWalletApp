import { useMonthYear } from "@/components/providers/month-year-provider";

import { cn } from "@/lib/utils";

import SelectYear from "./select-year";
import ThemeToggle from "./theme-toggle";
import UserDropdown from "./user-dropdown";

type TopBarProps = {
  title?: string;
  className?: string;
};

function TopBar({ title, className }: TopBarProps) {
  const yearMonthContext = useMonthYear();
  const date = new Date(
    yearMonthContext.selectedYear,
    yearMonthContext.selectedMonth,
  );
  const monthName = date.toLocaleString("default", { month: "long" });
  const classes = cn(
    "h-20 w-full shadow dark:background dark:text-white",
    className,
  );

  return (
    <div className={classes}>
      <div className="flex h-full items-center justify-between px-4">
        <div className="min-w-28">
          <SelectYear />
        </div>
        <h3 className="hidden text-center font-semibold md:block">
          {title ? title : `${monthName} Month's Transactions`}
        </h3>
        <div className="flex items-center gap-4">
          <UserDropdown />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
