import React from 'react';
import styles from '../../../ReusableCSS/form.module.css';
import Logo from '../../../Components/Logo';
import HoverButton from '../../../Components/CustomButton/HoverButton';
import FormField from '../../../Components/FormField';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const RegisterCoAdmin = () => {
  return (
    <div className={styles.formBody}>
      {/* LOGO */}
      <Logo />

      {/* Blue Admin Registration Form Container */}
      <div className={styles.formContainer} style={{ padding: "0px 30px" }}>
        <h1 className={styles.formheading}>Co-Admin Registration</h1>

        {/* HTML form */}
        <form className={styles.form}>
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
            placeholder="******"
          />

          {/* Register button */}
          <div style={{ margin: "30px 0px" }}>
            <HoverButton
              label="Register"
              bgColor="#16344f"
              textColor="#d9eff5"
              // linkTo="/login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCoAdmin;
