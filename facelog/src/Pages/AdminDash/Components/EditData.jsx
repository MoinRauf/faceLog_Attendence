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
import axios from "axios";

const EditData = ({ fid, closeEvent }) => {
  // console.log("edir table ki fid", fid);
  // console.log(fid, "this is from the edit datatable ");

  const [EmpId, setEmpId] = useState(fid.EmpId);
  const [EmpName, setEmpName] = useState(fid.EmpName);
  const [DaysPresent, setDaysPresent] = useState(fid.DaysPresent);
  const [DaysAbsent, setDaysAbsent] = useState(fid.DaysAbsent);
  const [DaysLate, setDaysLate] = useState(fid.DaysLate);
  const [HalfDays, setHalfDays] = useState(fid.HalfDays);

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

  const CreateUser = async () => {
    // Create an object with the data you want to update
    const updatedFields = {
      EmpId: EmpId,
      EmpName: EmpName,
      DaysPresent: DaysPresent,
      DaysAbsent: DaysAbsent,
      DaysLate: DaysLate,
      HalfDays: HalfDays,
      fid: fid.id,
    };

    try {
      // Make a PATCH request to your API endpoint with the updated data
      //await axios.patch(`http://localhost:3001/Edit/${fid.id}`, updatedFields, {
      const response = await axios.put(
        `http://localhost:3001/Edit/${EmpId}`,
        updatedFields,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Close the modal
      closeEvent();

      // to print the api respone
      console.log("API Response:", response.data);

      // Display success message
      Swal.fire("Edit successful");
      // console.log("log", updatedFields);
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error updating data:", error);
      Swal.fire("Error", "Failed to edit data", "error");
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Edit Data
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={40} />
      <Grid container spacing={2}>
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
            <Button
              variant="contained"
              onClick={CreateUser}
              sx={{
                backgroundColor: "#16344F",
                color: "white",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "#16344F",
                },
              }}
            >
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
};

export default EditData;
