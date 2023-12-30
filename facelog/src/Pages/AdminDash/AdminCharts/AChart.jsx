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
const empCollectionRef = collection(db, "EmployeeNew");
export default function AChart() {
  const { text } = useContext(MyContext);
  const [rows, setRows] = useState([]);
  console.log("okkokokokokokokok", rows,);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const data = await getDocs(empCollectionRef);
      const sortedRows = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => a.EmpId - b.EmpId); // Sorting based on EmpId

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
