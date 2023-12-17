import React from "react";
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import FormField from "../../../Components/FormField";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Stack from "@mui/material/Stack";

const Register = () => {
  return (
    <div className={styles.formBody}>
      {/* LOGO */}
      <Logo />

      {/* Blue Admin Registration Form Container */}
      <div className={styles.formContainer}>
        <h1 className={styles.formheading}>Set Time Interval</h1>

        {/* HTML form */}
        <form>
          <Stack spacing={0} direction="row">
            <FormField
              label="Attendance Time"
              icon={<PersonIcon />}
              inputType="time"
              placeholder="From"
            />
            <FormField
              // label="Attendance Time"
              icon={<PersonIcon />}
              inputType="time"
              placeholder="To"
            />
          </Stack>
          <Stack spacing={0} direction="row">
            <FormField
              label="Present Status"
              icon={<PersonIcon />}
              inputType="time"
              placeholder="From"
            />
            <FormField
              // label="Attendance Time"
              icon={<PersonIcon />}
              inputType="time"
              placeholder="To"
            />
          </Stack>
          <Stack spacing={0} direction="row">
            <FormField
              label="Present Days"
              icon={<EmailIcon />}
              inputType="Number"
              placeholder="Enter the number of Present days"
            />
            <FormField
              label="Absent Days"
              icon={<LockIcon />}
              inputType="Number"
              placeholder="Enter the number of Absent days"
            />
          </Stack>

          <Stack spacing={0} direction="row">
            <FormField
              label="Late Days"
              icon={<EmailIcon />}
              inputType="Number"
              placeholder="Enter the number of Late days"
            />
            <FormField
              label="Half Days"
              icon={<LockIcon />}
              inputType="Number"
              placeholder="Enter the number of Half days"
            />
          </Stack>
        </form>

        {/* Register button */}
        <div style={{ margin: "10px 0px 30px" }}>
          <HoverButton label="Submit" bgColor="#16344f" textColor="#d9eff5" />
        </div>
      </div>
    </div>
  );
};

export default Register;
