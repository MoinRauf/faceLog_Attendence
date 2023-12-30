import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { MyContext } from "../../../MyContext";
import { useContext } from "react";

export default function PiChart() {
  const { text } = useContext(MyContext);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Simulating asynchronous data loading
    const fetchData = async () => {
      // Replace the following with your actual data fetching logic
      return {
        DaysPresent: 5,
        DaysLate: 2,
        DaysAbsent: 1,
        HalfDays: 3,
      };
    };

    fetchData().then((data) => {
      console.log("Fetched data:", data);

      // Update state when data changes
      setChartData([
        ["PENDING", "Hours per Day"],
        ["Present Days", data.DaysPresent ? data.DaysPresent : 2],
        ["Days Late", data.DaysLate ? data.DaysLate : 2],
        ["Days Absent", data.DaysAbsent ? data.DaysAbsent : 2],
        ["Half Days", data.HalfDays ? data.HalfDays : 2],
      ]);
    });
  }, [text]);

  useEffect(() => {
    console.log("Updating chartData:", chartData);
  }, [chartData]);

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
      key={JSON.stringify(chartData)}
      chartType="PieChart"
      data={chartData}
      options={options}
      width={"100%"}
      height={"360px"}
      style={chartStyle}
    />
  );
}
