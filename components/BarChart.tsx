"use client";
import React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Janeiro", viagens: 186 },
  { month: "Fevereiro", viagens: 305 },
  { month: "Março", viagens: 237 },
  { month: "Abril", viagens: 73 },
  { month: "Maio", viagens: 209 },
  { month: "Junho", viagens: 214 },
  { month: "Julho", viagens: 200 },
  { month: "Agosto", viagens: 204 },
  { month: "Setembro", viagens: 109 },
  { month: "Outubro", viagens: 205 },
  { month: "Novembro", viagens: 104 },
  { month: "Dezembro", viagens: 84 },
];

const chartConfig = {
  viagens: {
    label: "viagens",
  },
} satisfies ChartConfig;

export default function CustomBarChart({
  data,
  config,
  description,
  footerText,
}: {
  data?: { [month: string]: number }[];
  config?: ChartConfig;
  description?: string;
  footerText?: string;
}) {
  return (
    <Card style={{ padding: 20 }}>
      <CardHeader>
        <CardDescription>
          {description || "Janeiro - Junho 2025"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config || chartConfig}>
          <BarChart
            accessibilityLayer
            data={data || chartData}
            margin={{
              top: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="viagens" fill="#0C6BFF" radius={8}>
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
