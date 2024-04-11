import React, { useState } from "react";
import { Chart } from "react-google-charts";
import { MyContext } from "../../../MyContext";
import { useContext } from "react";

export default function PiChart() {
  const { text } = useContext(MyContext);

  // console.log("ya days paresent ki value hai", text.DaysPresent)
  const data = [
    ["PENDING", "Hours per Day"],
    ["Present Days  ", text.DaysPresent ? text.DaysPresent : 2],
    ["Days Late", text.DaysLate ? text.DaysLate : 2],
    // ["Days Absent", text.DaysAbsent ? text.DaysAbsent : 2],
    ["Half Days", text.HalfDays ? text.HalfDays : 2],
  ];
// console.log(text.DaysPresent)
  const options = {
    title: ` Employee ID: ${text.EmpId || "- - -"}   ,  Employee Name: ${
      text.EmpName || "- - -"
    }`,
  };

  const chartStyle = {
    display: "block",
    width: "105%",
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"360px"}
      style={chartStyle}
    />
  );
}