import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "sno", label: "SNo", minWidth: 20, align: "center"},
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
  },
];

function createData(sno, date, time, status, salaryded) {
  return { sno, date, time, status, salaryded };
}

const rows = [
  createData(1, "01-01-2024", "09:04", "Present", "-"),
  createData(2, "02-01-2024", "10:00", "Late", "-"),
  createData(3, "03-01-2024", "09:10", "Present", "-"),
  createData(4, "04-01-2024", "09:45", "Present", "-"),
  createData(5, "05-01-2024", "09:02", "Present", "-"),
  createData(6, "06-01-2024", "09:05", "Present", "-"),
  createData(7, "07-01-2024", "09:15", "Present", "-"),
  createData(8, "08-01-2024", "09:15", "Present", "-"),
  createData(9, "09-01-2024", "09:15", "Present", "-"),
  createData(10, "10-01-2024", "09:15", "Present", "-"),
  createData(11, "11-01-2024", "09:15", "Present", "-"),
  createData(12, "12-01-2024", "09:15", "Present", "-"),
  createData(13, "13-01-2024", "09:15", "Present", "-"),
];

const AttendanceReport = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
        count={rows.length}
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
