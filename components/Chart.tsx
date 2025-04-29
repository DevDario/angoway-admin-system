// "use client";

import { Bar, BarChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegendContent,
  ChartLegend,
} from "../src/components/ui/chart";
import "./Chart.css";

const chartData = [
  { month: "January", App: 186, semApp: 80 },
  { month: "February", App: 305, semApp: 200 },
  { month: "March", App: 232, semApp: 120 },
  { month: "April", App: 73, semApp: 190 },
  { month: "May", App: 209, semApp: 130 },
  { month: "June", App: 214, semApp: 140 },
];

const chartConfig = {
  App: {
    label: "App",
    color: "#0C6BFF",
  },
  semApp: {
    label: "semApp",
    color: "#06CBFF",
  },
} satisfies ChartConfig;

export default function Chart() {
  return (
    <ChartContainer config={chartConfig} className="chart">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="App" fill="var(--color-App)" radius={4} />
        <Bar dataKey="semApp" fill="var(--color-semApp )" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
