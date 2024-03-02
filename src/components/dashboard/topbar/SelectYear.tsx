import { useMemo } from "react";
//IMPORT COMPONENTS
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//IMPORT CONTEXT
import { useAuth } from "@/components/providers/AuthProvider";
import { useMonthYear } from "@/components/providers/MonthYearProvider";

const currentYear = new Date().getFullYear();
function SelectYear() {
  const auth = useAuth();
  const { user } = auth;
  const monthYearContext = useMonthYear();

  /**
   * Generate the options for the select element
   * based on the user registration year
   * and the current year
   * @returns {string[]} - The options for the select element
   */
  const selectOptions = useMemo(() => {
    const userRegistredYear = new Date(
      user?.created_at || currentYear,
    ).getFullYear();

    const options: string[] = [];

    for (let i = userRegistredYear; i <= currentYear; i++) {
      options.push(i.toString());
    }

    return options;
  }, []);

  // Handle the year change and update the context
  function yearChangeHandler(year: string) {
    if (year == monthYearContext.selectedYear.toString()) return;

    if (year != null) {
      monthYearContext.changeYear(parseInt(year));
    }
  }
  return (
    <Select
      defaultValue={currentYear.toString()}
      onValueChange={(year) => yearChangeHandler(year)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Year" />
      </SelectTrigger>
      <SelectContent>
        {selectOptions.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectYear;
