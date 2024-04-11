// Home.js
import React, { useState, useEffect } from "react";
import Logo from "../../Components/Logo";
import styles from "./home.module.css";
import face from "../../Assets/facerecognition2.svg";
import HoverButton from "../../Components/CustomButton/HoverButton";
import Axios from "axios";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";

const Home = () => {
  // First Check if there is an admin registered. 
  const [isAdminReg, setIsAdminReg] = useState(false);

  useEffect(() => {
    const checkadminreg = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:5000/CheckAdminExistence"
        );
     
        if (response.data.adminExists === true) {
          // If there is at least one entry, set isAdminReg to true
          setIsAdminReg(true);
        } else if (response.data.adminExists === false) {
          setIsAdminReg(false);
        }
        console.log("Admin is registered-Response data: ", response.data); 
      } catch (error) {
         if (error.request) {
          // The request was made but no response was received
          toast.error("No response received from the server");
          console.error("Request made but no response received");
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("An unexpected error occurred");
          console.error("Error during request setup:", error.message);
        }
      }
    };

    checkadminreg();
  }, []);


  // Mark Attendance button
  const [name, setname] = useState(null);
  const clockIn = "in";
  const handleClick = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:5000/mark-attendance",
        { clockIn: clockIn }
      );
      console.log("API Response:", response.data);
      const apiname = response.data.name;
      setname(apiname);
      toast.success(`Hi ${apiname}! Your Attendance is marked:)`);
    } catch (error) {
      if (error.response) {
        toast.error("Sorry! You are not registered person");
        console.error("Request failed with status code", error.response.status);
        console.error("Response data:", error.response.data);
      } else {
        toast.error("An unexpected error occurred");
        console.error("Error during request setup:", error.message);
      }
    }
  };

  return (
    <div className={styles.homecontainer}>
      <Logo />

      {/* ALERT BOX*/}
      <Toast />

      <div className={styles.homebody}>
        <div className={styles.hometextarea}>
          <h1>FaceLog Attendance</h1>

          {/* Container for the buttons */}
          <div className={styles.homebuttons}>
            {/* Conditionally render the buttons based on the hasEntry state */}
            {isAdminReg ? (
              // Render Mark My Attendance button
              <HoverButton
                label="Mark My Attendance"
                bgColor="#c0ffd1"
                textColor="#16344f"
                onClick={handleClick}
              />
            ) : (
              // Render Setup System button
              <HoverButton
                label="Setup System"
                bgColor="#c0ffd1"
                textColor="#16344f"
                linkTo="/register"
              />
            )}

            {/* Second button */}
            <HoverButton
              label="Login"
              bgColor="#d9eff5"
              textColor="#16344f"
              linkTo="/login"
            />
          </div>
        </div>
        <div className={styles.faceimg}>
          <img src={face} alt="Face recognition" />
        </div>
      </div>
    </div>
  );
};

export default Home;

