import React, { useState } from "react";
import { Chart } from "react-google-charts";
import { MyContext } from "../../../MyContext";
import { useContext } from "react";

// export const data = [
//   ["PENDING", "Hours per Day"],
//   ["Present Days  ", 11],
//   ["Days Late", 5],
//   ["Days Absent", 2],
//   ["Half Days", 2],
//   // ["PENDING", 7],
// ];

// export const options = {
//   // title: "FaceLog System",
// };

export default function PiChart() {
  const { text } = useContext(MyContext);

  const data = [
    ["PENDING", "Hours per Day"],

    ["Present Days  ", text.DaysPresent ? text.DaysPresent : 2],
    ["Days Late", text.DaysLate ? text.DaysLate : 2],
    ["Days Absent", text.DaysAbsent ? text.DaysAbsent : 2],
    ["Half Days", text.HalfDays ? text.HalfDays : 2],
    // ["PENDING", 7],
  ];

  const options = {
    // title: "FaceLog System",
  };
  const chartStyle = {
    // Add your styles here
    // border: '1px solid #ddd',
    // borderRadius: '8px',
    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: "flex",
    width: "100%",
  };
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
      style={chartStyle}
    />
  );
}
