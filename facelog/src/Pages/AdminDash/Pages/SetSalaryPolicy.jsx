import React from 'react'
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import FormField from '../../../Components/FormField';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventNoteIcon from '@mui/icons-material/EventNote';


const Register = () => {
  return (
    <div className={styles.formBody}>
      {/* LOGO */}
      <Logo />

      {/* Blue Admin Registration Form Container */}
      <div className={styles.formContainer} style={{ padding: "0px 30px" }}>
        <h1 className={styles.formheading}>Salary Deduction Policy</h1>

        {/* HTML form */}
        <form className={styles.form}>
          <FormField
            label="Absent Days"
            // icon={<CalendarMonthIcon />}
            inputType="Number"
            placeholder="%"
            min="0"
          />
          <FormField
            label="Late Days"
            // icon={<EditCalendarIcon />}
            inputType="Number"
            placeholder="%"
            min="0"
          />
          <FormField
            label="Half Days"
            // icon={<EventNoteIcon />}
            inputType="Number"
            placeholder="%"
            min="0"
          />

          {/* Register button */}
          <div style={{ margin: "30px 0px" }}>
            <HoverButton
              label="Submit"
              bgColor="#16344f"
              textColor="#d9eff5"
              // linkTo="/login"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register
