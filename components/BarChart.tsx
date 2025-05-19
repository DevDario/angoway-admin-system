"use client";
import React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
import { CountMonthlyResponse } from "../types/count-monthly.response";

export default function CustomBarChart({
  data,
  config,
  description,
  footerText,
  axisDataKey,
  barDataKey,
}: {
  data: CountMonthlyResponse[] | any;
  config: ChartConfig;
  description: string;
  footerText: string;
  axisDataKey: string;
  barDataKey: string;
}) {
  return (
    <Card style={{ padding: 20 }}>
      <CardHeader>
        <CardDescription>
          {description || "Janeiro - Junho 2025"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={axisDataKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey={barDataKey} fill="#0C6BFF" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm mx-20">
        <div
          className="leading-none text-muted-foreground"
          style={{ paddingBottom: "10px" }}
        >
          {footerText || "Mostrando o total de viagens realizadas em cada mês."}
        </div>
      </CardFooter>
    </Card>
  );
}
