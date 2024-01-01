import React from 'react'
import styles from './dashboard.module.css'
import Logo from "../../../../Components/Logo";
import HoverButton from "../../../../Components/CustomButton/HoverButton";
import AttendanceReport from '../../Component/AttendanceReport';

const DashBoard = () => {
  return (
    <div className={styles.dashboardBody}>
      <div className={styles.dashboardHeader}>
        {/* LOGO */}
        <Logo />

        {/* Change Password */}
        <div className={styles.headerButton}>
          <HoverButton
            label="Change Password"
            bgColor="#c0ffd1"
            textColor="#16344f"
            linkTo="/changePassword"
          />
        </div>
      </div>
      <div className={styles.employeeReport}>
        <h1>Welcome Employee</h1>
        <AttendanceReport />
      </div>
    </div>
  );
}

export default DashBoard
