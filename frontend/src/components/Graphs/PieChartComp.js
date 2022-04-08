import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PieChartComp({ data }) {
  const renderLabel = function (entry) {
    return `${entry.name} (${entry.value})`;
  };

  const onPieEnter = () => {};
  return (
    <PieChart
      overflow={"visible"}
      width={1200}
      height={400}
      onMouseEnter={onPieEnter}
    >
      <Pie
        data={data}
        cx={120}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        isAnimationActive={false}
        label={renderLabel}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
