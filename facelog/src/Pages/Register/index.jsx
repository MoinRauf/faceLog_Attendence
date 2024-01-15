import React, { useState } from "react";
import styles from "../../ReusableCSS/form.module.css";
import Logo from "../../Components/Logo";
import HoverButton from "../../Components/CustomButton/HoverButton";
import FormField from '../../Components/FormField';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Axios from "axios";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Missing Credentials!");
      return;
    } else if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    } else if (password.length < 7) {
      toast.error("Password must be at least 7 characters long");
      return;
    } else {
      try {
        // Make the Axios POST request to your API endpoint
        const response = await Axios.post(
          "http://localhost:5000/registerAdmin",
          {
            name,
            email,
            password,
          }
        );

        // Handle the response as needed
        console.log("Registration successful", response.data);

        // Show success toast
        toast.success("Registration successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);

        // Clear the form by resetting state variables
        setName("");
        setEmail("");
        setPassword("");
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 409) {
            toast.error("User with provided credentials already exists");
          } else {
            toast.error("An error occurred while submitting the form");
          }
          console.error(
            "Request failed with status code",
            error.response.status
          );
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("No response received from the server");
          console.error("Request made but no response received");
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("An unexpected error occurred");
          console.error("Error during request setup:", error.message);
        }
      }
    }
  };

  return (
    <div className={styles.formBody}>
      {/* LOGO */}
      <Logo />

      {/* ALERT BOX*/}
      <Toast />

      {/* Blue Admin Registration Form Container */}
      <div className={styles.formContainer}>
        <h1 className={styles.formheading}>Admin Registration</h1>

        {/* HTML form */}
        <form className={styles.form}>
          <FormField
            label={"Name"}
            icon={<PersonIcon />}
            inputType={"text"}
            placeholder={"John Doe"}
            value={name}
            setter={setName}
            required={true}
          />
          <FormField
            label={"Email"}
            icon={<EmailIcon />}
            inputType={"email"}
            placeholder={"johndoe@gmail.com"}
            value={email}
            setter={setEmail}
            required={true}
          />
          <FormField
            label={"Password"}
            icon={<LockIcon />}
            inputType={"password"}
            placeholder={"123j808"}
            value={password}
            setter={setPassword}
            required={true}
          />

          {/* Register button */}
          <div style={{ margin: "30px 0px" }}>
            <HoverButton
              label="Register"
              bgColor="#16344f"
              textColor="#d9eff5"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register
