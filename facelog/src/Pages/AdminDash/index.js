import React from 'react'
import HomePage from "./Pages/HomePage";
import { Route, Routes } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
<Routes>
<Route  path="/"  element={<HomePage/>} />
{/* <Route path="*" element={<Error />} /> */}
</Routes>
    </>
  );
}

export default AdminDashboard;
