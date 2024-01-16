import React, { useState } from "react";
import styles from "../../../../ReusableCSS/form.module.css";
import Logo from '../../../../Components/Logo';
import HoverButton from '../../../../Components/CustomButton/HoverButton';
import FormField from '../../../../Components/FormField';
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Axios from "axios";
import { toast } from "react-toastify";
import Toast from "../../../../Components/Toast";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !oldPassword || !newPassword) {
      toast.error("Missing Credentials!");
      return;
    } else if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    } else if (newPassword.length < 7) {
      toast.error("New Password must be at least 7 characters long");
      return;
    } else {
      try {
        // Make the Axios POST request to your API endpoint
        const response = await Axios.post(
          "http://localhost:5000/ChangePassword",
          {
            email,
            oldPassword,
            newPassword,
          }
        );

        // Handle the response as needed
        console.log("Password Changed successfully", response.data);

        // Show success toast
        toast.success("Password Changed successfully");

        setTimeout(() => {
          navigate("/employeeDashboard");
        }, 2000);

        // Clear the form by resetting state variables
        setEmail("");
        setOldPassword("");
        setnewPassword("");
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 404) {
            toast.error("Invalid Email or Password");
          } else {
            toast.error("An error occurred while submitting the form");
          }
          console.error(
            "Request failed with status code",
            error.response.status
          );
          console.error("Response data:", error.response.data);
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

      {/* Blue Change Password Form Container */}
      <div className={styles.formContainer}>
        <h1 className={styles.formheading}>Change Password</h1>

        {/* HTML form */}
        <form className={styles.form}>
          {/* Form Fields*/}
          <FormField
            label="Email"
            icon={<EmailIcon />}
            inputType="email"
            placeholder="johndoe@gmail.com"
            value={email}
            setter={setEmail}
            required={true}
          />
          <FormField
            label="Old Password"
            icon={<LockIcon />}
            inputType="password"
            placeholder="123j808"
            value={oldPassword}
            setter={setOldPassword}
            required={true}
          />

          <FormField
            label="New Password"
            icon={<LockIcon />}
            inputType="password"
            placeholder="123j808"
            value={newPassword}
            setter={setnewPassword}
            required={true}
          />

          {/* Register button */}
          <div style={{ margin: "30px 0px" }}>
            <HoverButton
              label="Submit"
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

export default ChangePassword
