import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Axios from "axios";
import { MyContext } from "../../../MyContext";
import { useContext } from "react";

const columns = [
  { id: "sNo", label: "SNo", minWidth: 20, align: "center" },
  { id: "date", label: "Date", minWidth: 150, align: "center" },
  { id: "time", label: "Time", minWidth: 150, align: "center" },
  {
    id: "status",
    label: "Status",
    minWidth: 150,
    align: "center",
  },
  {
    id: "salaryded",
    label: "Salary\u00a0Deduction",
    minWidth: 150,
    align: "center",
    format: (value) => `${value}%`,
  },
];

const AttendanceReport = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { text } = useContext(MyContext);
  console.log(text, "employee dashboard");
  const empid = text.id;
  const empname = text.name;

  useEffect(() => {
    const fetchData = async (empid) => {
      try {
        // Replace the URL with your actual API endpoint
        const response = await Axios.get(
          `http://localhost:5000/employee/dashboard/${empid}`
        );
        if (response.data.result) {
          console.log("API Response:", response.data.result);
          const apiData = response.data.result;
          // Assuming the API response has a 'data' property containing an array

          setData(apiData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(empid); // Pass empid as an argument to fetchData
  }, [empid]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "90%",
        overflow: "hidden",
        margin: "20px 65px",
        backgroundColor: "#d9eff5",
        border: "5px solid #16344f",
        boxShadow: "10px 10px 26px 5px rgba(0,0,0,0.52);",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontSize: "22px",
                    fontWeight: "bold",
                    fontFamily: "PT Serif, serif",
                    background: "#ccdff0",
                    color: "#16344f",
                    borderBottom: "2px solid #16344f",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            fontSize: "18px",
                            fontFamily: "PT Serif, serif",
                            color: "#16344f",
                            borderBottom: "1px solid #16344f",
                          }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{
          color: "#16344f",
        }}
      />
    </Paper>
  );
};

export default AttendanceReport;
