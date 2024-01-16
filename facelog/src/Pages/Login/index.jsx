import React, { useState } from "react";
import styles from "../../ReusableCSS/form.module.css";
import "./login.css";
import Logo from "../../Components/Logo";
import HoverButton from "../../Components/CustomButton/HoverButton";
import FormField from "../../Components/FormField";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Axios from "axios";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext";

const Login = () => {

  const [loginType, setloginType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login response is given to other components using context
  const { text, setText } = React.useContext(MyContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast.error("Missing Credentials!");
      return;
    } else if (!loginType) {
      toast.error("Please select the Login type");
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
        const response = await Axios.post("http://localhost:5000/login", {
          loginType,
          email,
          password,
        });

        // Handle the response as needed
        console.log("Login successful", response.data);
        console.log(text, "login response data");
        setText(response.data);
        // Show success toast
        toast.success("Login successful");

        setTimeout(() => {
          if (loginType === "admin") {
            navigate("/adminDashboard");
          } else if (loginType === "employee") {
            navigate("/employeeDashboard");
          } else {
            // Handle other cases or provide a default route
            navigate("/login");
          }
        }, 2000);

        // Clear the form by resetting state variables
        setloginType("");
        setEmail("");
        setPassword("");
      } catch (error) {
        if (error.response) {
            toast.error("Invalid Credentials! User not registered");
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

      {/* Blue Login Form Container */}
      <div className={styles.formContainer}>
        <h1 className={styles.formheading}>Login</h1>

        {/* HTML form */}
        <form className={styles.form}>
          {/* Login Type*/}
          <div className="wrapper">
            <input
              type="radio"
              name="userType"
              value="admin"
              id="option-1"
              checked={loginType === "admin"}
              onChange={(e) => setloginType(e.target.value)}
            />
            <input
              type="radio"
              name="userType"
              value="employee"
              id="option-2"
              checked={loginType === "employee"}
              onChange={(e) => setloginType(e.target.value)}
            />
            <label htmlFor="option-1" className="option option-1">
              <span>Admin</span>
            </label>
            <label htmlFor="option-2" className="option option-2">
              <span>Employee</span>
            </label>
          </div>

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
            label="Password"
            icon={<LockIcon />}
            inputType="password"
            placeholder="123j808"
            value={password}
            setter={setPassword}
            required={true}
          />

          {/* Register button */}
          <div style={{ margin: "30px 0px" }}>
            <HoverButton
              label="Login"
              bgColor="#16344f"
              textColor="#d9eff5"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
