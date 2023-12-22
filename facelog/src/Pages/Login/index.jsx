import React from "react";
import styles from "../../ReusableCSS/form.module.css";
import "./login.css";
import Logo from "../../Components/Logo";
import HoverButton from "../../Components/CustomButton/HoverButton";
import FormField from "../../Components/FormField";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
  return (
    <div className={styles.formBody}>
      {/* LOGO */}
      <Logo />

      {/* Blue Login Form Container */}
      <div className={styles.formContainer}>
        <h1 className={styles.formheading}>Login</h1>

        {/* HTML form */}
        <form className={styles.form}>
          {/* Login Type*/}
          <div className="wrapper">
            <input type="radio" name="userType" value="admin" id="option-1" />
            <input
              type="radio"
              name="userType"
              value="employee"
              id="option-2"
              checked
            />
            <label htmlFor="option-1" className="option option-1">
              <span>Admin</span>
            </label>
            <label htmlFor="option-2" className="option option-2">
              <span>Employee</span>
            </label>
          </div>

          {/* Form Fields*/}
          <FormField
            label="Email"
            icon={<EmailIcon />}
            inputType="email"
            placeholder="johndoe@gmail.com"
          />
          <FormField
            label="Password"
            icon={<LockIcon />}
            inputType="password"
            placeholder="123j808"
          />

          {/* Register button */}
          <div style={{ margin: "30px 0px" }}>
            <HoverButton
              label="Login"
              bgColor="#16344f"
              textColor="#d9eff5"
              linkTo="/admindashboard"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
