import * as React from "react";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SignalCellularAltTwoToneIcon from "@mui/icons-material/SignalCellularAltTwoTone";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { MyContext } from "../../../MyContext";
// modal imported
import Modal from "@mui/material/Modal";
import AddData from "./AddData";
import EditData from "./EditData";
import useDataRow from "./DataRow";
// model style which align modal in center
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DataTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [rows, setRows] = useState([]);
  // haldel modal open and close state start
  const [formid, SetFormid] = useState("");
  const [open, setOpen] = useState(false);
  const [editopen, setEditopen] = useState(false);
  const setRows = useDataRow((state) => state.setRows);
  const rows = useDataRow((state) => state.rows);

  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditopen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditopen(false);

  console.log(formid, "this is from datatable ");
  // haldel modal open and close state end

  const [filterrow, setfilterrow] = useState("");
  const { text, setText } = React.useContext(MyContext);
  console.log(filterrow, "asfbsiaugfiasufgiasu");
  setText(filterrow);
  console.log("moin", text);

  const empCollectionRef = collection(db, "EmployeeNew");

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16344F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const edituser = (
    EmpId,
    EmpName,
    DaysAbsent,
    DaysPresent,
    HalfDays,
    DaysLate,
    id
  ) => {
    const Data = {
      id: id,
      EmpId: EmpId,
      EmpName: EmpName,
      DaysPresent: DaysPresent,
      DaysAbsent: DaysAbsent,
      DaysLate: DaysLate,
      HalfDays: HalfDays,
    };
    console.log("setformid k upper wali line", Data);
    SetFormid(Data);
    handleEditOpen();
  };

  const viewUser = (id) => {
    console.log(rows);
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].id === id) {
        setfilterrow(rows[i]);
        // Swal.fire(
        //   "Graph Updated!",
        //   "Employee graph has been successfully updated.",
        //   "success"
        // );

        break;
      }
    }
  };
  const deleteApi = async (id) => {
    const userDoc = doc(db, "EmployeeNew", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };
  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      getUsers();
    }
  };

  return (
    <>
      {/* model div start */}
      <div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddData closeEvent={handleClose} />
          </Box>
        </Modal>

        <Modal
          open={editopen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditData closeEvent={handleEditClose} fid={formid} />
          </Box>
        </Modal>
      </div>
      {/* modal div end */}
      {rows.length > 0 && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Employee List
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300, paddingLeft: "10px" }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.EmpName || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Name" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={handleOpen}
            >
              Add
            </Button>
          </Stack>
          <Box height={10} />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Employee id
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Employee Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    DaysPresent
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    DaysAbsent
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    DaysLate
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    HalfDays
                  </TableCell>

                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell key={row.id} align="left">
                        {row.EmpId}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.EmpName}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.DaysPresent}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.DaysAbsent}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.DaysLate}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.HalfDays}
                      </TableCell>
                      {/* <TableCell key={row.id} align="left"> */}
                      {row.Action}

                      <TableCell align="left">
                        <Stack spacing={2} direction="row">
                          <EditIcon
                            style={{
                              fontSize: "20px",
                              color: "blue",
                              cursor: "pointer",
                            }}
                            className="cursor-pointer"
                            onClick={() =>
                              edituser(
                                row.EmpId,
                                row.EmpName,
                                row.DaysPresent,
                                row.DaysAbsent,
                                row.DaysLate,
                                row.HalfDays,
                                row.id
                              )
                            }
                          />
                          <DeleteIcon
                            style={{
                              fontSize: "20px",
                              color: "darkred",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              deleteUser(row.id);
                            }}
                          />
                          <SignalCellularAltTwoToneIcon
                            style={{
                              fontSize: "20px",
                              color: "Green",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              viewUser(row.id);

                              // Calculate 80% of the page height
                              window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top

                              // Swal.fire(
                              //   "User Viewed!",
                              //   "User details have been viewed.",
                              //   "success"
                              // );
                            }}
                          />
                        </Stack>
                        {/* </TableCell> */}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      {/* skeleton start */}

      {/* skeleton end */}

      {rows.length === 0 && (
        <>
          <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={30} />
            <Box height={40} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={30} />
            <Box height={40} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={30} />
            <Box height={40} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={30} />
            <Box height={40} />
          </Paper>
        </>
      )}
    </>
  );
}
