import React from "react";
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import FormField from "../../../Components/FormField";
import PersonIcon from "@mui/icons-material/Person";
import Stack from "@mui/material/Stack";

// es file main <form> </form> k icon remove krne hain

const Register = () => {
  return (
    <div
      className={styles.formBody}
      style={{ minHeight: "120vh", paddingTop: "10px" }}
    >
      {/* LOGO */}
      <Logo />

      {/* Blue Admin Registration Form Container */}
      <div className={styles.formContainer} style={{ marginTop: "100px" }}>
        <h1 className={styles.formheading}>Set Time Interval</h1>

        {/* HTML form */}
        <form>
          <Stack spacing={0} direction="row">
            <FormField
              label="Attendance Time"
              icon={<PersonIcon />} // remove   
              inputType="time"
              placeholder="From"
            />
            <FormField
              icon={<PersonIcon />} // remove 
              inputType="time"
              placeholder="To"
            />
          </Stack>

          <Stack spacing={0} direction="row">
            <FormField
              label="Present Status"
              icon={<PersonIcon />} // remove 
              inputType="time"
              placeholder="From"
            />
            <FormField
              icon={<PersonIcon />} // remove 
              inputType="time"
              placeholder="To"
            />
          </Stack>
          <Stack spacing={0} direction="row">
            <FormField
              label="Absent Status"
              icon={<PersonIcon />} // remove 
              inputType="time"
              placeholder="From"
            />
            <FormField
              icon={<PersonIcon />} // remove 
              inputType="time"
              placeholder="To"
            />
          </Stack>

          <Stack spacing={0} direction="row">
            <FormField
              label="Leave Status"
              icon={<PersonIcon />} // remove 
              inputType="time"
              placeholder="From"
            />
            <FormField
              icon={<PersonIcon />} // remove 
              inputType="time"
              placeholder="To"
            />
          </Stack>
          <Stack spacing={0} direction="row">
            <FormField
              label="HalfDays Status"
              icon={<PersonIcon />} // remove 
              inputType="time"
              placeholder="From"
            />
            <FormField
              icon={<PersonIcon />} // remove 
              inputType="time"
              placeholder="To"
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
