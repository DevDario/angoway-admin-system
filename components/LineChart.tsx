"use client";

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
import { WeeklyEarningsResponse } from "types/weekly-earnings.response";

export default function CustomLineChart({
  data,
  config,
  description,
  footerText,
  axisDataKey,
  lineDataKey
}: {
  data: WeeklyEarningsResponse[] | any;
  config: ChartConfig;
  description: string;
  footerText?: string;
  axisDataKey: string;
  lineDataKey: string;
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
          config={config}
          style={{ height: 250, width: "100%" }}
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey={axisDataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey={lineDataKey}
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
