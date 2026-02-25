import { PieChartLegend } from "./pie-chart-legend";
import { ChartConfig } from "./ui/chart";

const ExpenseCard = () => {
  const expense = {
    total: 1000,
    personal: 800,
    guest: 200,
  };

  interface ChartData {
    name: string;
    value: number;
    fill: string;
  }
  interface ChartHeader {
    title: string;
    chartDesc: string;
    chartFooter: string;
  }
  const chartData: ChartData[] = [
    { name: "personal", value: 1000, fill: "var(--chart-2)" },
    { name: "guest", value: 400, fill: "var(--chart-1)" },
    { name: "other", value: 100, fill: "var(--chart-5)" },
  ];
  const total: number = chartData.reduce(
    (sum, current) => sum + current.value,
    0,
  );

  const chartAbout: ChartHeader = {
    title: "Expenses",
    chartDesc: "January-Present",
    chartFooter: `Total Expenses: ${total}`,
  };

  const chartConfig = {
    personal: {
      label: "Personal",
    },
    guest: {
      label: "Guest",
      color: "var(--chart-1)",
    },
    other: {
      label: "Other",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;
  return (
    <PieChartLegend
      {...chartAbout}
      chartData={chartData}
      chartConfig={chartConfig}
    />
  );
};

export default ExpenseCard;
