import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { useAuthProvider } from "@/components/providers/auth-provider";
import { useMonthYear } from "@/components/providers/MonthYearProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";

const currentYear = new Date().getFullYear();
function SelectYear() {
  const { user } = useAuthProvider();
  const monthYearContext = useMonthYear();

  const { data: oldestYear, isLoading } = useQuery({
    queryKey: [user],
    queryFn: async () => {
      return await axiosCall({ method: "GET", urlPath: ApiUrls.user.year });
    },
    refetchOnWindowFocus: false,
  });

  /**
   * Generate the options for the select element
   * based on the user registration year
   * and the current year
   * @returns {string[]} - The options for the select element
   */
  const selectOptions = useMemo(() => {
    const userRegistredYear = oldestYear ?? currentYear;
    const options: string[] = [];

    for (let i = userRegistredYear; i <= currentYear; i++) {
      options.push(i.toString());
    }

    return options;
  }, [oldestYear]);

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
        {isLoading && (
          <SelectItem value="loading" className="animate-pulse" disabled={true}>
            Loading...
          </SelectItem>
        )}
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
