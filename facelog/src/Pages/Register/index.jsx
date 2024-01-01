import React, { useState } from "react";
import styles from "../../ReusableCSS/form.module.css";
import Logo from "../../Components/Logo";
import HoverButton from "../../Components/CustomButton/HoverButton";
import FormField from '../../Components/FormField';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Missing or Invalid Credentials!");
      return;
    } else {
          try {
            // Make the Axios POST request to your API endpoint
            const response = await Axios.post(
              "http://localhost:3001/SetTimeInterval",
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
    }
  };

  return (
    <div className={styles.formBody}>
      {/* LOGO */}
      <Logo />

      {/* ALERT BOX*/}
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
              // linkTo="/login"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register
