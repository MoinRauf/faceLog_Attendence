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
        <h1 className={styles.formheading}>Register Employee</h1>

        {/* HTML form */}
        <form>
          <Stack spacing={0} direction="row">
            <FormField
              label="Employee Id"
              icon={<PersonIcon />}
              inputType="number"
              placeholder="Enter Employee Id"
            />
            <FormField
              label="Employee Name"
              icon={<EmailIcon />}
              inputType="text"
              placeholder="Enter Employee Name"
            />
          </Stack>

          <Stack spacing={0} direction="row">
            <FormField
              label="Email"
              icon={<LockIcon />}
              inputType="email"
              placeholder="Enter Email"
            />
            <FormField
              label="Password"
              icon={<LockIcon />}
              inputType="password"
              placeholder="Enter Password"
            />
          </Stack>

          <Stack spacing={0} direction="row">
            <FormField
              label="Salary"
              icon={<LockIcon />}
              inputType="number"
              placeholder="Enter Salary"
            />
            <Stack spacing={0} direction="row">
              <FormField
                label="Facial Images"
                icon={<LockIcon />}
                inputType="Number"
                placeholder="- - -"
              />
              <div style={{ margin: "10px 0px 30px" }}>
                <HoverButton
                  label="Take Images"
                  bgColor="#16344f"
                  textColor="#d9eff5"
                />
              </div>
            </Stack>
          </Stack>
        </form>

        {/* Register button */}
        <div style={{ margin: "10px 0px 30px" }}>
          <HoverButton
            label="Submit"
            bgColor="#16344f"
            textColor="#d9eff5"
            // linkTo="/login"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
