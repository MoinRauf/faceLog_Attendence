import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["PENDING", "Hours per Day"],
  ["Present Days  ", 11],
  ["Days Late", 2],
  ["Days Absent", 2],
  ["Half Days", 2],
  // ["PENDING", 7],
];

export const options = {
  // title: "FaceLog System",
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
