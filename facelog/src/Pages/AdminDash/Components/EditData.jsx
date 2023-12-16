// import { Button, Grid, IconButton, Typography } from "@mui/material";
// import React from "react";
// import CloseIcon from "@mui/icons-material/Close";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { useState } from "react";
// import { db } from "../../../firebase-config";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import Swal from "sweetalert2";

// export default function EditForm({ closeEvent }) {
//   const [EmpId, setEmpId] = useState(0);
//   const [EmpName, setEmpName] = useState("");
//   const [DaysPresent, setDaysPresent] = useState(0);
//   const [DaysAbsent, setDaysAbsent] = useState(0);
//   const [DaysLate, setDaysLate] = useState(0);
//   const [HalfDays, setHalfDays] = useState(0);
//   const [rows, setRows] = useState([]);
//   const empCollectionRef = collection(db, "EmployeeNew");

//   const edituser = async () => {
//     await updateDoc(empCollectionRef, {
//       EmpId: EmpId,
//       EmpName: EmpName,
//       DaysAbsent: DaysAbsent,
//       DaysLate: DaysLate,
//       HalfDays: HalfDays,
//     });
//     getUsers(); //update the list acc: to data
//     CloseEvent();
//     Swal.fire("edit successfullt");
//   };

//   const getUsers = async () => {
//     try {
//       const data = await getDocs(empCollectionRef);
//       const sortedRows = data.docs
//         .map((doc) => ({ ...doc.data(), id: doc.id }))
//         .sort((a, b) => a.EmpId - b.EmpId); // Sorting based on EmpId

//       setRows(sortedRows);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   return (
//     <>
//       <Box sx={{ m: 2 }} />
//       <Typography variant="h5" align="center">
//         Edit
//       </Typography>
//       <IconButton
//         style={{ position: "absolute", top: "0", right: "0" }}
//         onClick={closeEvent}
//       >
//         <CloseIcon />
//       </IconButton>
//       <Box height={30} />
//       <Grid continer spacing={2}>
//         <Grid item xs={12}>
//           <Box
//             component="form"
//             sx={{
//               "& > :not(style)": { m: 1, width: "25ch" },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <TextField
//               id="outlined-basic"
//               label="EmpId"
//               type="number"
//               variant="outlined"
//               size="small"
//               value={EmpId}
//               style={{ minWidth: "100%" }}
//             />
//           </Box>
//         </Grid>
//         <Grid item xs={6}>
//           <Box
//             component="form"
//             sx={{
//               "& > :not(style)": { m: 1, width: "25ch" },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <TextField
//               id="outlined-basic"
//               label="EmpName"
//               value={EmpName}
//               type="string"
//               variant="outlined"
//               size="small"
//               style={{ minWidth: "100%" }}
//             />
//           </Box>
//         </Grid>
//         <Grid item xs={6}>
//           <Box
//             component="form"
//             sx={{
//               "& > :not(style)": { m: 1, width: "25ch" },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <TextField
//               id="outlined-basic"
//               label="DaysPresent"
//               value={DaysPresent}
//               variant="outlined"
//               type="string"
//               size="small"
//               style={{ minWidth: "100%" }}
//             />
//           </Box>
//         </Grid>
//         <Grid item xs={6}>
//           <Box
//             component="form"
//             sx={{
//               "& > :not(style)": { m: 1, width: "25ch" },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <TextField
//               id="outlined-basic"
//               label="DaysAbsent"
//               value={DaysAbsent}
//               type="string"
//               variant="outlined"
//               size="small"
//               style={{ minWidth: "100%" }}
//             />
//           </Box>
//         </Grid>
//         <Grid item xs={6}>
//           <Box
//             component="form"
//             sx={{
//               "& > :not(style)": { m: 1, width: "25ch" },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <TextField
//               id="outlined-basic"
//               label="DaysLate"
//               value={DaysLate}
//               variant="outlined"
//               type="string"
//               size="small"
//               style={{ minWidth: "100%" }}
//             />
//           </Box>
//         </Grid>
//         <Grid item xs={6}>
//           <Box
//             component="form"
//             sx={{
//               "& > :not(style)": { m: 1, width: "25ch" },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <TextField
//               id="outlined-basic"
//               label="HalfDays"
//               value={HalfDays}
//               type="string"
//               variant="outlined"
//               size="small"
//               style={{ minWidth: "100%" }}
//             />
//           </Box>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="h5" align="center">
//             <Button variant="contained" onClick={edituser()}>
//               Submit
//             </Button>
//           </Typography>
//         </Grid>
//       </Grid>
//     </>
//   );
// }
