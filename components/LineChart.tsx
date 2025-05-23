// "use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../src/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../src/components/ui/chart";

const chartData = [
  { day: "1", faturado: 80000 },
  { day: "2", faturado: 50000 },
  { day: "3", faturado: 30000 },
  { day: "4", faturado: 90000 },
  { day: "5", faturado: 10000 },
  { day: "6", faturado: 14300 },
  { day: "7", faturado: 26300 },
];

const chartConfig = {
  day: {
    label: "dia",
  },
  faturado: {
    label: "faturado(Kz) ",
  },
} satisfies ChartConfig;

export default function CustomLineChart({
  data,
  config,
  description,
  footerText,
}: {
  data?: { [day: string]: number }[];
  config?: ChartConfig;
  description?: string;
  footerText?: string;
}) {
  return (
    <Card style={{ padding: 20 }}>
      <CardHeader>
        <CardDescription>
          {description || "Total Faturado na Semana"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config || chartConfig}
          style={{ height: 250, width: "100%" }}
        >
          <LineChart
            accessibilityLayer
            data={data || chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="faturado"
              type="natural"
              stroke="#0C6BFF"
              strokeWidth={2}
              dot={{
                fill: "#06CBFF",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div
          className="leading-none text-muted-foreground"
          style={{ paddingBottom: "10px" }}
        >
          {footerText || "Mostrando o total faturado nos últimos 7 dias."}
        </div>
      </CardFooter>
    </Card>
  );
}
