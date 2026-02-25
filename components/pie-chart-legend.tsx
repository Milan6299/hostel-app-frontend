"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A pie chart with a legend";

interface ChartData {
  name: string;
  value: number;
  fill: string;
}

export function PieChartLegend({
  title = "No title",
  chartDesc = "No desc",
  chartFooter = "No footer",
  chartData,
  chartConfig,
}: {
  title?: string;
  chartDesc?: string;
  chartData: ChartData[];
  chartFooter: string;
  chartConfig: ChartConfig;
}) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{chartDesc}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="value" label nameKey={"name"} />
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="mt-auto">
        <div className="font-bold text-center w-full">{chartFooter}</div>
      </CardFooter>
    </Card>
  );
}
