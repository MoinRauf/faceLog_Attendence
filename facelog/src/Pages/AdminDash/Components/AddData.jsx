import React, { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import useDataRow from "./DataRow";

const AddData = ({ closeEvent }) => {
  // const [rows, setRows] = useState([]);
  const setRows=useDataRow((state)=>state.setRows)
  const [EmpId, setEmpId] = useState("");
  const [EmpName, setEmpName] = useState("");
  const [DaysPresent, setDaysPresent] = useState("");
  const [DaysAbsent, setDaysAbsent] = useState("");
  const [DaysLate, setDaysLate] = useState("");
  const [HalfDays, setHalfDays] = useState("");
  const empCollectionRef = collection(db, "EmployeeNew");
  const handleEmpIdChange = (event) => {
    setEmpId(event.target.value);
  };
  const handleEmpNameChange = (event) => {
    setEmpName(event.target.value);
  };
  const handleDaysPresentChange = (event) => {
    setDaysPresent(event.target.value);
  };
  const handleDaysAbsentChange = (event) => {
    setDaysAbsent(event.target.value);
  };
  const handleDaysLateChange = (event) => {
    setDaysLate(event.target.value);
  };
  const handleHalfDaysChange = (event) => {
    setHalfDays(event.target.value);
  };

  const createUser = async () => {
    try {
      await addDoc(empCollectionRef, {
        EmpId: EmpId,
        EmpName: EmpName,
        DaysPresent: DaysPresent,
        DaysAbsent: DaysAbsent,
        DaysLate: DaysLate,
        HalfDays: HalfDays,
      });

      getUsers(); // Update the list according to the data
      closeEvent(); // Correct function name
      Swal.fire("Edit successful"); // Display success message
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error if necessary
    }
  };

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
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        ADD YA REMOVE KRNA HY FUNCTION !!! LAST MAIN
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={40} />
      <Grid continer spacing={2}>
        <Stack spacing={2} direction="row">
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="EmpId"
              type="number"
              variant="outlined"
              size="small"
              value={EmpId}
              onChange={handleEmpIdChange}
              style={{ minWidth: "100%" }}
            />
          </Grid>
          <br />
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Empname"
              type="text"
              variant="outlined"
              size="small"
              value={EmpName}
              onChange={handleEmpNameChange}
              style={{ minWidth: "100%" }}
            />
          </Grid>
        </Stack>
        <br />
        <Stack spacing={2} direction="row">
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="present"
              type="number"
              variant="outlined"
              size="small"
              value={DaysPresent}
              onChange={handleDaysPresentChange}
              style={{ minWidth: "100%" }}
            />
          </Grid>
          <br />
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="absent"
              type="number"
              variant="outlined"
              size="small"
              value={DaysAbsent}
              onChange={handleDaysAbsentChange}
              style={{ minWidth: "100%" }}
            />
          </Grid>
        </Stack>
        <br />
        <Stack spacing={2} direction="row">
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="late"
              type="number"
              variant="outlined"
              size="small"
              value={HalfDays}
              onChange={handleHalfDaysChange}
              style={{ minWidth: "100%" }}
            />
          </Grid>
          <br />
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="half"
              type="number"
              variant="outlined"
              size="small"
              value={DaysLate}
              onChange={handleDaysLateChange}
              style={{ minWidth: "100%" }}
            />
          </Grid>
        </Stack>
        <br />
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={createUser}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
};

export default AddData;
