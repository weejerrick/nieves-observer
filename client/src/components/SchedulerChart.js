import React, { useContext } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { DarkModeContext } from "../App";

export default function SchedulerChart(props) {
  const darkModeContext = useContext(DarkModeContext);

  const chartLineColors = {
    dark: [
      "#ffcc80", //orange
      "#80cbc4", //teal
      "#90caf9", //blue
      "#ffab91", //red
      "#b39ddb", //purple
      "#c5e1a5", //green
      "#b0bec5", //steel
      "#fff59d", //yellow
    ],
    light: [
      "#ff9800",
      "#009688",
      "#1e88e5",
      "#ff5722",
      "#673ab7",
      "#8bc34a",
      "#607d8b",
      "#ffeb3b",
    ],
    chooseKey() {
      return darkModeContext ? this.dark : this.light;
    },
  };

  const convertPlotsToRecharts = (schedulerFullDataArray) => {
    let plot_data = [];
    for (let i = 0; i < schedulerFullDataArray.length; i++) {
      const parsedData = JSON.parse(
        schedulerFullDataArray[i].plot.replaceAll("'", '"')
      );
      if (plot_data.length < 1) {
        for (let j = 0; j < parsedData.length; j++) {
          const dataPoint = {
            [schedulerFullDataArray[i].name]: parsedData[j].alt,
          };
          plot_data.push(dataPoint);
        }
      } else {
        for (let j = 0; j < parsedData.length; j++) {
          const newDataPoint = {
            [schedulerFullDataArray[i].name]: parsedData[j].alt,
          };
          plot_data[j] = { ...plot_data[j], ...newDataPoint };
          if (i === schedulerFullDataArray.length - 1) {
            const timeAxis = { time: parsedData[j].time };
            const timePoints = { name: parsedData[j].name };
            plot_data[j] = { ...plot_data[j], ...timeAxis, ...timePoints };
          }
        }
      }
    }
    return plot_data;
  };
  return (
    <ResponsiveContainer>
      <LineChart
        width={300}
        height={150}
        data={convertPlotsToRecharts(props.schedulerData)}
        margin={{
          right: 20,
          left: -20,
          bottom: 25,
        }}
      >
        <CartesianGrid stroke={darkModeContext ? "#616161" : "#D9DDDC"} />
        <YAxis
          stroke={darkModeContext ? "#b0bec5" : "#546e7a"}
          domain={[10, 90]}
          tick={{ fontSize: 10 }}
          allowDataOverflow={true}
        />
        <XAxis dataKey="name" tick={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: darkModeContext ? "#4A4A4A" : "#fff",
          }}
        />
        <ReferenceLine
          x="19:00 PM"
          stroke={darkModeContext ? "#D9DDDC" : "#777B7E"}
          strokeDasharray="3 3"
          strokeWidth={2}
        />
        <ReferenceLine
          x="06:00 AM"
          stroke={darkModeContext ? "#D9DDDC" : "#777B7E"}
          strokeDasharray="3 3"
          strokeWidth={2}
        />
        {Object.keys(convertPlotsToRecharts(props.schedulerData)[0])
          .slice(0, -2)
          .map((keyName, i) => (
            <Line
              type="natural"
              dataKey={keyName}
              dot={false}
              key={i}
              stroke={chartLineColors.chooseKey()[i]}
              unit="°"
            />
          ))}
        <Legend wrapperStyle={{ marginBottom: 20 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
