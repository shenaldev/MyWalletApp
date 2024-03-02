import { useMonthYear } from "@/components/providers/MonthYearProvider";
import SelectYear from "./SelectYear";
import ThemeToggle from "./ThemeToggle";
import UserDropdown from "./UserDropdown";

function TopBar() {
  const yearMonthContext = useMonthYear();
  const date = new Date(
    yearMonthContext.selectedYear,
    yearMonthContext.selectedMonth,
  );
  const monthName = date.toLocaleString("default", { month: "long" });

  return (
    <div className="h-20 w-full bg-violet-100 dark:bg-slate-900 dark:text-white">
      <div className="flex h-full items-center justify-between px-4">
        <div className="min-w-28">
          <SelectYear />
        </div>
        <h3 className="hidden text-center font-semibold md:block">
          {monthName} Month's Transactions
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
