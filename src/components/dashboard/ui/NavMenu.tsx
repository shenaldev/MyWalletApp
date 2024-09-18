import { DotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMonthYear } from "@/components/providers/MonthYearProvider";

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
    </nav>
  );
}

export default NavMenu;
