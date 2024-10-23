import { BarChart4Icon, DotIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { Separator } from "../ui/separator";
import { useMonthYear } from "@/providers/month-year-provider";

import getRoute from "@/lib/route-links";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type NavMenuProps = {
  onChange: (status: boolean) => void;
};

function NavMenu({ onChange }: NavMenuProps) {
  const monthYearContext = useMonthYear();
  const { selectedMonth, changeMonth } = monthYearContext;

  function monthChangeHandler(month: number) {
    changeMonth(month);
    onChange(false);
  }

  return (
    <nav className="flex flex-col gap-1">
      {months.map((month, index) => (
        <Button
          key={index}
          size="sm"
          className={`justify-start ${selectedMonth != index ? "text-foreground/80" : "bg-primary text-white hover:bg-primary/90 hover:text-white"}`}
          variant="ghost"
          onClick={() => monthChangeHandler(index)}
        >
          <DotIcon color={selectedMonth == index ? "#ffff" : "#e6e6e6"} />
          {month}
        </Button>
      ))}
      <Separator className="my-4" />
      <div className="flex items-center gap-2 px-3 text-sm">
        <BarChart4Icon className="size-4" />
        <Link to={getRoute("analysis")}>Analysis</Link>
      </div>
    </nav>
  );
}

export default NavMenu;
