import React, { useState } from "react";
import WebcamComponent from "../../../Components/Camera/Webcam";
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import FormField from "../../../Components/FormField";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Stack from "@mui/material/Stack";
import CreateIcon from "@mui/icons-material/Create";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const RegisterEmployee = () => {
  // State to track the camera's open/closed status
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Function to open the camera
  const openCamera = () => {
    setIsCameraOpen(true);
  };

  // Function to close the camera
  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  return (
    <div>
      {/* Check if the camera is open */}
      {isCameraOpen ? (
        // Render WebcamComponent if the camera is open
        <WebcamComponent isOpen={isCameraOpen} onClose={closeCamera} />
      ) : (
        // Render the Register Employee page if the camera is closed
        <>
          <p>Register Employee Page</p>
          <button onClick={openCamera}>Open Camera</button>
        </>
      )}
    </div>
  );
};

export default RegisterEmployee;
