import React, { useState } from "react";
import axios from "axios";
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import admincss from "../../../Pages/AdminDash/Pages/ADMINCSS/SetDays.css";

const SetDays = () => {
  const navigate = useNavigate();
  // State variables to store input values
  const [allowed_absent_days, setAbsentDays] = useState("");
  const [allowed_late_days, setHalfDays] = useState("");
  const [allowed_half_days, setLateDays] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!allowed_absent_days || !allowed_late_days || !allowed_half_days) {
      // Show error toast and return
      toast.error("Please fill out all fields");
      return;
    }

    try {
      // Make an API request using axios
      const response = await axios.post(
        "http://localhost:5000/policy/setDays",
        {
          allowed_absent_days,
          allowed_late_days,
          allowed_half_days,
        }
      );

      // Handle the response as needed
      console.log("API Response:", response.data);

      // Show success toast
      toast.success("Form submitted successfully");

      setTimeout(() => {
        navigate("/admindashboard");
      }, 4000);

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
      <div class="maindiv">
        <h1 class="heading">Permissible Days</h1>

        <div>
          <div>
            <div class="center">
              <label class="divlabel">Absent Days:</label>
            </div>
            <input
              type="number"
              value={allowed_absent_days}
              placeholder="Enter the number of absent days"
              onChange={(e) => setAbsentDays(e.target.value)}
              className="userinput"
            />
          </div>
          <div>
            <div class="center">
              <label class="divlabel">Half Days:</label>
            </div>
            <input
              type="number"
              value={allowed_late_days}
              onChange={(e) => setHalfDays(e.target.value)}
              placeholder="Enter the number of absent days"
              className="userinput"
            />
          </div>
          <div>
            <div class="center">
              <label class="divlabel">Late Days:</label>
            </div>
            <input
              type="number"
              value={allowed_half_days}
              placeholder="Enter the number of absent days"
              onChange={(e) => setLateDays(e.target.value)}
              className="userinput"
            />
          </div>
          <div style={{ margin: "30px 0px 10px 120px" }}>
            <HoverButton
              label="Submit"
              bgColor="#16344f"
              textColor="#d9eff5"
              type="submit"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SetDays;
