import React, { useState } from "react";
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import FormField from "../../../Components/FormField";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import EventNoteIcon from "@mui/icons-material/EventNote";

const SetDays = () => {
  const [formValues, setFormValues] = useState({
    absentDays: "",
    lateDays: "",
    halfDays: "",
  });

  const handleInputChange = (fieldName, value) => {
    setFormValues({
      ...formValues,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        console.log("Form data submitted successfully!");
        // Handle success,
      } else {
        console.error("Failed to submit form data");
        // Handle failure
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className={styles.formBody}>
      {/* LOGO */}
      <Logo />

      {/* Blue Admin Registration Form Container */}
      <div className={styles.formContainer}>
        <h1 className={styles.formheading}>Permissable Days</h1>

        {/* HTML form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormField
            label="Absent Days"
            // icon={<CalendarMonthIcon />}
            inputType="number"
            placeholder="Enter the number of absent days"
            min="0"
            onChange={(e) => handleInputChange("absentDays", e.target.value)}
          />
          <FormField
            label="Late Days"
            // icon={<EditCalendarIcon />}
            inputType="number"
            placeholder="Enter the number of late days"
            min="0"
            onChange={(e) => handleInputChange("lateDays", e.target.value)}
          />
          <FormField
            label="Half Days"
            // icon={<EventNoteIcon />}
            inputType="number"
            placeholder="Enter the number of half days"
            min="0"
            onChange={(e) => handleInputChange("halfDays", e.target.value)}
          />
          {/* <div style={{ margin: "30px 0px" }}></div> */}

          {/* Register button */}
          <div style={{ margin: "30px 0px" }}>
            <HoverButton
              label="Submit"
              bgColor="#16344f"
              textColor="#d9eff5"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetDays;
