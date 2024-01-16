import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import AdminDashboard from "../Pages/AdminDash";
import LogOut from "../Pages/AdminDash/Pages/LogOut";
import RegisterCoAdmin from "../Pages/AdminDash/Pages/RegisterCoAdmin";
import RegisterEmployee from "../Pages/AdminDash/Pages/RegisterEmployee";
import SetDays from "../Pages/AdminDash/Pages/SetDays";
import SetSalaryPolicy from "../Pages/AdminDash/Pages/SetSalaryPolicy";
import SetTimeInterval from "../Pages/AdminDash/Pages/SetTimeInterval";
import Error from "../Pages/AdminDash/Pages/errorpage";
import DashBoard from "../Pages/EmployeeDash/Pages/Dashboard";
import ChangePassword from "../Pages/EmployeeDash/Pages/ChangePassword";
import New from "../Pages/AdminDash/Pages/New";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/LogOut" element={<LogOut />} />
        <Route path="/RegisterCoAdmin" element={<RegisterCoAdmin />} />
        <Route path="/RegisterEmployee" element={<RegisterEmployee />} />
        <Route path="/SetDays" element={<SetDays />} />
        <Route path="/SetSalaryPolicy" element={<SetSalaryPolicy />} />
        <Route path="/SetTimeInterval" element={<SetTimeInterval />} />
        <Route path="/employeeDashboard" element={<DashBoard />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/New" element={<New />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
