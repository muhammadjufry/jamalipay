"use client";
import { useTheme } from "next-themes";
import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
type Props = {
  isAmount: boolean;
  data: {
    date: string;
    value: number;
  }[];
  tooltipName: string;
  height?: number;
};

export function Chart({ isAmount, data, tooltipName, height }: Props) {
  const { resolvedTheme } = useTheme();

  const formatNumber = (num: string) => {
    return `${isAmount ? "$" : ""}${Number(
      parseFloat(num).toFixed(2)
    ).toLocaleString("en")}`;
  };

  return (
    <ResponsiveContainer width="100%" height={height || 300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient x1="0" y1="0" x2="0" y2="1" id="areaChart">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="date"
          interval="preserveStartEnd"
          className="text-sm"
          stroke={`${resolvedTheme === "dark" ? "white" : "black"}`}
          minTickGap={200}
          tickMargin={10}
        />
        <Tooltip
          labelFormatter={(label) => {
            return <p>{label}</p>;
          }}
          labelStyle={{ fontSize: "14px" }}
          itemStyle={{ fontSize: "14px" }}
          formatter={(value) => formatNumber(value?.toString() || "")}
        />
        <Area
          type="monotone"
          dataKey="value"
          name={tooltipName}
          stroke="#0ea5e9"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#areaChart)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
