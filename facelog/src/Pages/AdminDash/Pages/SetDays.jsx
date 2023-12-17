import React from 'react';
import styles from '../../../ReusableCSS/form.module.css';
import Logo from '../../../Components/Logo';
import HoverButton from '../../../Components/CustomButton/HoverButton';
import FormField from '../../../Components/FormField';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventNoteIcon from '@mui/icons-material/EventNote';

const Register = () => {
  return (
    <div className={styles.formBody}>
      {/* LOGO */}
      <Logo />

      {/* Blue Admin Registration Form Container */}
      <div className={styles.formContainer}>
        <h1 className={styles.formheading}>Set Days</h1>

        {/* HTML form */}
        <form>
          <FormField
            label="Absent Days"
            icon={<CalendarMonthIcon />}
            inputType="number"
            placeholder="Enter the number of absent days"
          />
          <FormField
            label="Late Days"
            icon={<EditCalendarIcon />}
            inputType="number"
            placeholder="Enter the number of late days"
          />
          <FormField
            label="Half Days"
            icon={<EventNoteIcon />}
            inputType="number"
            placeholder="Enter the number of half days"
          />
        </form>

        {/* Register button */}
        <div style={{ margin: '10px 0px 30px' }}>
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
