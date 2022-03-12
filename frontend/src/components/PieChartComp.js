import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function PieChartComp ({data}){
  const  renderLabel = function(entry) {
    return `${entry.name} (${entry.value})`;
}
    const demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';

    const onPieEnter=()=>{}
    return (
      <PieChart style={{marginLeft: "35%"}} overflow={"visible"} width={1200} height={400} onMouseEnter={onPieEnter}>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label ={renderLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        
      
      </PieChart>
    );
  }

