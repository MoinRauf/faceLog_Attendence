import React, { useState } from "react";
import axios from "axios";
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import admincss from "../../../Pages/AdminDash/Pages/ADMINCSS/SetDays.css";

const RegisterEmployee = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      // Show error toast and return
      toast.error("Please fill out all fields");
      return;
    }

    try {
      // Make an API request using axios
      const response = await axios.post(
        "http://localhost:5000/attendance/register",
        {
          email,
        }
      );

      // Handle the response as needed
      console.log("API Response:", response.data);

      // Show success toast
      toast.success("Form submitted successfully");

      setTimeout(() => {
        navigate("/admindashboard");
      }, 3000);

      // Clear the form by resetting state variables
      setemail("");
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
        <h1 class="heading">Take Images</h1>

        <div>
          <div>
            <div class="center">
              <label class="divlabel" style={{ paddingBottom: "20px" }}>
                Email
              </label>
            </div>
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setemail(e.target.value)}
              className="userinput"
            />
          </div>

          <div style={{ margin: "30px 0px 10px 60px" }}>
            <HoverButton
              label="Take Images"
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

export default RegisterEmployee;
