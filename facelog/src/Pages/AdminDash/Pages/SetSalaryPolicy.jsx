import React, { useState } from "react";
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import adminPageStyles from "../../../Pages/AdminDash/Pages/ADMINCSS/SetSalaryPolicy.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SetSalaryPolicy = () => {
  const navigate = useNavigate();
  const [perAbsentDeduct, setAbsentDays] = useState("");
  const [perLateDeduct, setLateDays] = useState("");
  const [perHalfDayDeduct, setHalfDays] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!perAbsentDeduct || !perLateDeduct || !perHalfDayDeduct) {
      // Show error toast and return
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/policy/setSalaryDeduction",
        {
          perAbsentDeduct,
          perLateDeduct,
          perHalfDayDeduct,
        }
      );

      console.log("API Response:", response.data);

      // Show success toast
      toast.success("Form submitted successfully");

      setTimeout(() => {
        navigate("/admindashboard");
      }, 3000);

      // Clear the form by resetting state variables
      setAbsentDays("");
      setHalfDays("");
      setLateDays("");
    } catch (error) {
      // Handle errors
      console.error("API Error:", error);
      // Show error toast if there is an API error
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formBody}>
      <Logo />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="maindiv1">
        <h1 className="heading1">Salary Deduction Policy</h1>
        <div className={styles.formField}>
          <div className="center">
            <label className="divlabel1">Absent Days:</label>
          </div>

          <input
            type="number"
            value={perAbsentDeduct}
            onChange={(e) => setAbsentDays(e.target.value)}
            // className={adminPageStyles.userinput}
            placeholder="%"
            min="0"
            className="userinput1"
          />
        </div>

        <div className={styles.formField}>
          <div className="center">
            <label className="divlabel1">Late Days:</label>
          </div>
          <input
            type="number"
            value={perLateDeduct}
            onChange={(e) => setLateDays(e.target.value)}
            // className={adminPageStyles.userinput}
            placeholder="%"
            min="0"
            className="userinput1"
          />
        </div>

        <div className={styles.formField}>
          <div className="center">
            <label className="divlabel1">Half Days:</label>
          </div>
          <input
            type="number"
            value={perHalfDayDeduct}
            onChange={(e) => setHalfDays(e.target.value)}
            // className={adminPageStyles.userinput}
            placeholder="%"
            min="0"
            className="userinput1"
          />
        </div>

        <div style={{ margin: "30px 0px 30px 150px" }}>
          <HoverButton
            label="Submit"
            bgColor="#16344f"
            textColor="#d9eff5"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default SetSalaryPolicy;
