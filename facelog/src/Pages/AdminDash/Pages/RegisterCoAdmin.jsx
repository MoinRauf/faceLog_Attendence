import React, { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import admincss from "../../../Pages/AdminDash/Pages/ADMINCSS/RegisterCoAdmin.css";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import { useNavigate } from "react-router-dom";

const RegisterCoAdmin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the fields are empty
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // Make the Axios POST request to your API endpoint
      const response = await Axios.post("http://localhost:5000/registerAdmin", {
        name,
        email,
        password,
      });

      // Handle the response as needed
      console.log("Registration successful", response.data);

      // Show success toast
      toast.success("Registration successful");
      setTimeout(() => {
        navigate("/admindashboard");
      }, 3000);

      // Clear the form by resetting state variables
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration failed", error);
      // Handle errors (e.g., show error messages to the user)
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
      <div className="maindiv11">
        <h1 className="heading11">Co-Admin Registration</h1>

        <div>
          <div>
            <div className="center11">
              <label className="divlabel11">Name:</label>
            </div>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="userinput11"
            />
          </div>
          <div>
            <div className="center11">
              <label className="divlabel11">Email:</label>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="userinput11"
            />
          </div>
          <div>
            <div className="center11">
              <label className="divlabel11">Password:</label>
            </div>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="userinput11"
            />
          </div>
          <div style={{ margin: "30px 0px 10px 150px" }}>
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

export default RegisterCoAdmin;
