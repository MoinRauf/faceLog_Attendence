import React, { useContext } from 'react'
import styles from './dashboard.module.css'
import Logo from "../../../../Components/Logo";
import HoverButton from "../../../../Components/CustomButton/HoverButton";
import AttendanceReport from '../../Component/AttendanceReport';
import { MyContext } from '../../../../MyContext';

const DashBoard = () => {
  const { text } = useContext(MyContext);
  console.log(text, "employee dashboard")
  const empname = text.name;
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
          
          <HoverButton
            label="Log Out"
            bgColor="#c0ffd1"
            textColor="#16344f"
            linkTo="/"
            
          />
          
        </div>
        
      </div>
      <div className={styles.employeeReport}>
        <h1>
          Welcome <span style={{textTransform: "capitalize"}}>{empname}</span>
        </h1>
        <AttendanceReport />
      </div>
    </div>
  );
}

export default DashBoard
