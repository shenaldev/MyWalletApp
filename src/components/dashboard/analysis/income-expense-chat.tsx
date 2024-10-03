import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Months } from "@/data/months";

const chartConfig = {
  incomes: {
    label: "Incomes",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type IncomeExpenseChartProps = {
  payments: any;
  incomes: any;
};

function IncomeExpenseChart({ payments, incomes }: IncomeExpenseChartProps) {
  const chartData = [];

  for (let i = 0; i < 12; i++) {
    const data = {
      month: Months[i],
      incomes: incomes[i].total,
      expenses: payments[i].total,
    };
    chartData.push(data);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Incomes And Expenses</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="max-h-[360px] min-h-[340px] w-full"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="incomes" fill="var(--color-incomes)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default IncomeExpenseChart;
