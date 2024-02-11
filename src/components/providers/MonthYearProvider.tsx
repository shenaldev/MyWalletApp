import { createContext, PropsWithChildren, useContext, useState } from "react";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

type MonthYearContextProps = {
  selectedYear: number;
  selectedMonth: number;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
};

const MonthYearContext = createContext<MonthYearContextProps>({
  selectedYear: currentYear,
  selectedMonth: currentMonth,
  changeYear: () => {},
  changeMonth: () => {},
});

export default function MonthYearProvider({ children }: PropsWithChildren) {
  const [selectedYear, setYear] = useState(currentYear);
  const [selectedMonth, setMonth] = useState(currentMonth);

  const changeYear = (year: number) => {
    setYear(year);
  };

  const changeMonth = (month: number) => {
    setMonth(month);
  };

  const values = {
    selectedYear,
    selectedMonth,
    changeYear,
    changeMonth,
  };

  return (
    <MonthYearContext.Provider value={values}>
      {children}
    </MonthYearContext.Provider>
  );
}

export const useMonthYear = () => {
  const context = useContext(MonthYearContext);

  if (context === undefined) {
    throw new Error("useMonthYear must be used within a MonthYearProvider");
  }

  return context;
};
