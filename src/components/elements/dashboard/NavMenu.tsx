import { useMonthYear } from "@/components/providers/MonthYearProvider";
import { Button } from "@/components/ui/button";
import { DotIcon } from "lucide-react";

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

function NavMenu() {
  const monthYearContext = useMonthYear();
  const { selectedMonth, changeMonth } = monthYearContext;

  function monthChangeHandler(month: number) {
    changeMonth(month);
  }

  return (
    <nav className="flex flex-col gap-1">
      {months.map((month, index) => (
        <Button
          key={index}
          size="sm"
          className={`justify-start ${selectedMonth != index ? "text-white" : ""}`}
          variant={selectedMonth == index ? "sidebar" : "ghost"}
          onClick={() => monthChangeHandler(index)}
        >
          <DotIcon color={selectedMonth == index ? "#4b57d2" : "#FFFF"} />
          {month}
        </Button>
      ))}
    </nav>
  );
}

export default NavMenu;
