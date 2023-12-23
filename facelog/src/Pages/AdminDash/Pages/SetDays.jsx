import React, { useState } from "react";
import axios from "axios";
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import FormField from "../../../Components/FormField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// Define your functional component
const SetDays = () => {
  const navigate = useNavigate();
  // State variables to store input values
  const [absentDays, setAbsentDays] = useState("");
  const [halfDays, setHalfDays] = useState("");
  const [lateDays, setLateDays] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!absentDays || !halfDays || !lateDays) {
      // Show error toast and return
      toast.error("Please fill out all fields");
      return;
    }

    try {
      // Make an API request using axios
      const response = await axios.post("http://localhost:3001/SetDays", {
        absentDays,
        halfDays,
        lateDays,
      });

      // Handle the response as needed
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 100px 20px 20px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#d9eff5",
          borderRadius: "10px",
          boxShadow: "8px 8px 8px #000000",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            color: "#16344f",
            padding: "10px 10px 10px 10px",
            marginLeft: "60px",
            display: "flex",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          Permissible Days
        </h1>

        <div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label
                style={{ color: "#16344f", fontSize: "18px", fontWeight: 550 }}
              >
                Absent Days:
              </label>
            </div>
            <input
              type="number"
              value={absentDays}
              placeholder="Enter the number of absent days"
              onChange={(e) => setAbsentDays(e.target.value)}
              style={{
                padding: "8px",
                backgroundColor: "#c0ffd1",
                color: "#16344f",
                fontSize: "16px",
                border: "1px solid #16344f",
                borderRadius: "5px",
                outline: "none",
                width: "130%",
                marginBottom: "20px",
              }}
            />
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label
                style={{ color: "#16344f", fontSize: "18px", fontWeight: 550 }}
              >
                Half Days:
              </label>
            </div>
            <input
              type="number"
              value={halfDays}
              onChange={(e) => setHalfDays(e.target.value)}
              placeholder="Enter the number of absent days"
              style={{
                padding: "8px",
                backgroundColor: "#c0ffd1",
                color: "#16344f",
                fontSize: "16px",
                border: "1px solid #16344f",
                borderRadius: "5px",
                outline: "none",
                width: "130%",
                marginBottom: "20px",
              }}
            />
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label
                style={{ color: "#16344f", fontSize: "18px", fontWeight: 550 }}
              >
                Late Days:
              </label>
            </div>
            <input
              type="number"
              value={lateDays}
              placeholder="Enter the number of absent days"
              onChange={(e) => setLateDays(e.target.value)}
              style={{
                padding: "8px",
                backgroundColor: "#c0ffd1",
                color: "#16344f",
                fontSize: "16px",
                border: "1px solid #16344f",
                borderRadius: "5px",
                outline: "none",
                width: "130%",
                marginBottom: "20px",
              }}
            />
          </div>
          <div style={{ margin: "30px 0px 30px 80px" }}>
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
