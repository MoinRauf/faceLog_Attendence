import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MyContext } from "../../../MyContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";
import axios from "axios";
const empCollectionRef = collection(db, "EmployeeNew");
export default function AChart() {
  const { text } = useContext(MyContext);
  const [rows, setRows] = useState([]);
  // console.log("okkokokokokokokok", rows, text);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      // const response = await axios.get("https://dummyjson.com/products");
      const response = await axios.get(
        "http://localhost:5000/api/admin/dashboard"
      );

      const { result } = response.data; // Change to 'result' instead of 'products'
      console.log(result, "employee data");

      const mappedRows = result.map((employee) => ({
        id: employee.EmpId, // Extract the ID string from EmpId object
        EmpName: employee.EmpName,
        DaysPresent: employee.DaysPresent,
        DaysAbsent: employee.DaysAbsent,
      }));

      const sortedRows = mappedRows.sort((a, b) => a.id.localeCompare(b.id)); // Use localeCompare for string comparison

      setRows(sortedRows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      style={{ backgroundColor: "white" }}
    >
      <LineChart
        width={500}
        height={300}
        data={rows}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        // Set background color for the chart
      >
        <CartesianGrid strokeDasharray="3 3" fill="white" />
        <XAxis dataKey="EmpName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="DaysPresent"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="DaysAbsent" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
