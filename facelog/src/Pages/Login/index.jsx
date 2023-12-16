import React from "react";
import styles from "../../ReusableCSS/form.module.css";
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
        <form>
          <div className={styles.loginType} style={{ display: "flex", justifyContent: "space-around" }}>
            <input type="radio" value="Admin" />
            <div>Admin</div>
            <input type="radio" value="Employee" />
            <div>Employee</div>
          </div>
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
        </form>

        {/* Register button */}
        <div style={{ margin: "10px 0px 30px" }}>
          <HoverButton
            label="Login"
            bgColor="#16344f"
            textColor="#d9eff5"
            linkTo="/admindashboard"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
