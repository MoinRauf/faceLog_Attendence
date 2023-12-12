import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["PENDING", "Hours per Day"],
  ["PENDING", 11],
  ["PENDING", 2],
  ["ComPENDING", 2],
  ["PENDING", 2],
  ["PENDING", 7],
];

export const options = {
  title: "FaceLog System",
};

export default function PiChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"120%"}
      height={"400px"}
    />
  );
}
