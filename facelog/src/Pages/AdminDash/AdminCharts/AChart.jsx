// import React, { PureComponent, useContext } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { MyContext } from "../../../MyContext";

// export default class Example extends PureComponent {

//   render() {
// const { text } = useContext(MyContext);

// const data = [
//   {
//     name: "Page A",
//     DaysPresent: 4000,
//     DaysAbsent: 2400,
//     // amt: 2400,
//   },
//   {
//     name: "Page B",
//     DaysPresent: 3000,
//     DaysAbsent: 1398,
//     // amt: 2210,
//   },
//   {
//     name: "Page C",
//     DaysPresent: 2000,
//     DaysAbsent: 9800,
//     // amt: 2290,
//   },
//   {
//     name: "Page D",
//     DaysPresent: 2780,
//     DaysAbsent: 3908,
//     // amt: 2000,
//   },
//   {
//     name: "Page E",
//     DaysPresent: 1890,
//     DaysAbsent: 4800,
//     // amt: 2181,
//   },
//   {
//     name: "Page F",
//     DaysPresent: 2390,
//     DaysAbsent: 3800,
//     // amt: 2500,
//   },
//   {
//     name: "Page G",
//     DaysPresent: 3490,
//     DaysAbsent: 4300,
//     // amt: 2100,
//   },
// ];
//     return (
//       <ResponsiveContainer
//         width="100%"
//         height="100%"
//         style={{ backgroundColor: "white" }}
//       >
//         <LineChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//           // Set background color for the chart
//         >
//           <CartesianGrid strokeDasharray="3 3" fill="white" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="DaysPresent"
//             stroke="#8884d8"
//             activeDot={{ r: 8 }}
//           />
//           <Line type="monotone" dataKey="DaysAbsent" stroke="#82ca9d" />
//         </LineChart>
//       </ResponsiveContainer>
//     );
//   }
// }
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
  console.log("asdfghjgfdsa", rows);

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
  const data = [
    {
      DaysPresent: 25,
      HalfDays: 8,
      EmpName: "John",
      DaysLate: 2,
      DaysAbsent: 5,
      EmpId: 1,
      id: "abc123",
    },
    {
      DaysPresent: 28,
      HalfDays: 4,
      EmpName: "Alice",
      DaysLate: 3,
      DaysAbsent: 2,
      EmpId: 2,
      id: "def456",
    },
    {
      DaysPresent: 30,
      HalfDays: 6,
      EmpName: "Bob",
      DaysLate: 1,
      DaysAbsent: 1,
      EmpId: 3,
      id: "ghi789",
    },
    {
      DaysPresent: 29,
      HalfDays: 5,
      EmpName: "Eve",
      DaysLate: 4,
      DaysAbsent: 3,
      EmpId: 4,
      id: "jkl012",
    },
    {
      DaysPresent: 27,
      HalfDays: 7,
      EmpName: "Charlie",
      DaysLate: 2,
      DaysAbsent: 4,
      EmpId: 5,
      id: "mno345",
    },

    // {
    //   name: text.EmpName,
    //   DaysPresent: text.DaysPresent ? text.DaysPresent * 1000 : 3000,
    //   DaysAbsent: text.DaysAbsent ? text.DaysAbsent * 1000 : 3000,
    //   // amt: 2400,
    // },
    // {
    //   name: "Page B",
    //   DaysPresent: ,
    //   DaysAbsent: 1398,
    //   // amt: 2210,
    // },
    // {
    //   name: "Page C",
    //   DaysPresent: 2000,
    //   DaysAbsent: 9800,
    //   // amt: 2290,
    // },
    // {
    //   name: "Page D",
    //   DaysPresent: 2780,
    //   DaysAbsent: 3908,
    //   // amt: 2000,
    // },
    // {
    //   name: "Page E",
    //   DaysPresent: 1890,
    //   DaysAbsent: 4800,
    //   // amt: 2181,
    // },
    // {
    //   name: "Page F",
    //   DaysPresent: 2390,
    //   DaysAbsent: 3800,
    //   // amt: 2500,
    // },
    // {
    //   name: "Page G",
    //   DaysPresent: 3490,
    //   DaysAbsent: 4300,
    //   // amt: 2100,
    // },
  ];
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
