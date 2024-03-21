import { useMemo } from "react";
//IMPORT COMPONENTS
import { TotalByMonth } from "@/types/ReportResponse";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type MonthlyChartProps = {
  data: TotalByMonth[];
  title: string;
};

function MonthlyChart({ data, title }: MonthlyChartProps) {
  const chartData = useMemo(() => {
    return data?.map((item) => {
      return {
        name: getMonthName(item.month),
        total: Number(item.total),
      };
    });
  }, [data]);

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[340px] text-sm">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            title={title}
            margin={{ top: 0, right: 0, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#0013FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0013FF" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <YAxis width={10} tick={false} />
            <XAxis dataKey="name" />
            <Tooltip />
            <Area
              type="basis"
              dataKey="total"
              stroke="#4b57d2"
              opacity={1}
              fill="url(#colorTotal)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default MonthlyChart;

function getMonthName(index: number) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[index - 1];
}
