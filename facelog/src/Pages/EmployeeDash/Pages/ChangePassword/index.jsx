import React from 'react';
import styles from "../../../../ReusableCSS/form.module.css";
import Logo from '../../../../Components/Logo';
import HoverButton from '../../../../Components/CustomButton/HoverButton';
import FormField from '../../../../Components/FormField';
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const ChangePassword = () => {
  return (
    <div className={styles.formBody}>
      {/* LOGO */}
      <Logo />

      {/* Blue Change Password Form Container */}
      <div className={styles.formContainer}>
        <h1 className={styles.formheading}>Change Password</h1>

        {/* HTML form */}
        <form className={styles.form}>
          {/* Form Fields*/}
          <FormField
            label="Email"
            icon={<EmailIcon />}
            inputType="email"
            placeholder="johndoe@gmail.com"
          />
          <FormField
            label="Old Password"
            icon={<LockIcon />}
            inputType="password"
            placeholder="123j808"
          />

          <FormField
            label="New Password"
            icon={<LockIcon />}
            inputType="password"
            placeholder="123j808"
          />

          {/* Register button */}
          <div style={{ margin: "30px 0px" }}>
            <HoverButton
              label="Submit"
              bgColor="#16344f"
              textColor="#d9eff5"
              linkTo="/"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword
