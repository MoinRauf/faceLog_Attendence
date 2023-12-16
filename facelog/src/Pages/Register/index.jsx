import React from 'react'
import styles from "./adminRegister.module.css";
import Logo from "../../Components/Logo";
import HoverButton from "../../Components/CustomButton/HoverButton";
import FormField from '../../Components/FormField';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Register = () => {
  return (
    <div className={styles.formBody}>
      {/* LOGO */}
      <Logo />

      {/* Blue Admin Registration Form Container */}
      <div className={styles.formContainer}>
        <h1 className={styles.formheading}>Admin Registration</h1>

        {/* HTML form */}
        <form>
          <FormField
            label="Name"
            icon={<PersonIcon />}
            inputType="text"
            placeholder="John Doe"
          />
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
            label="Register"
            bgColor="#16344f"
            textColor="#d9eff5"
            linkTo="/login"
          />
        </div>
      </div>
    </div>
  );
}

export default Register
