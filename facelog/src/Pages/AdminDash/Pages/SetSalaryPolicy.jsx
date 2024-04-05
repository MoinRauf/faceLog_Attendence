import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import styles from "../../../ReusableCSS/form.module.css";
import adminPageStyles from "../../../Pages/AdminDash/Pages/ADMINCSS/SetSalaryPolicy.css";
import "react-toastify/dist/ReactToastify.css";

const SetSalaryPolicy = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    perAbsentDeduct: "",
    perLateDeduct: "",
    perHalfDayDeduct: "",
  });

  const clearForm = () => {
    setFormState({
      perAbsentDeduct: "",
      perLateDeduct: "",
      perHalfDayDeduct: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!formState.perAbsentDeduct || !formState.perLateDeduct || !formState.perHalfDayDeduct) {
      // Show error toast and return
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/policy/setSalaryDeduction", { ...formState });

      console.log("API Response:", response.data);

      // Show success toast
      toast.success("Form submitted successfully");

      setTimeout(() => {
        navigate("/admindashboard");
      }, 3000);

      // Clear the form by resetting state variables
      clearForm();
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
        {["perAbsentDeduct", "perLateDeduct", "perHalfDayDeduct"].map((field) => (
          <div key={field} className={styles.formField}>
            <div className="center">
              <label className="divlabel1">{field.replace("per", "")}:</label>
            </div>
            <input
              type="number"
              value={formState[field]}
              onChange={(e) => setFormState({ ...formState, [field]: e.target.value })}
              placeholder="%"
              min="0"
              className="userinput1"
            />
          </div>
        ))}
        <div style={{ margin: "30px 0px 30px 150px" }}>
          <HoverButton label="Submit" bgColor="#16344f" textColor="#d9eff5" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default SetSalaryPolicy;
