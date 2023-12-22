import React, { useState } from "react";
import WebcamComponent from "../../../Components/Camera/Webcam";
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import FormField from "../../../Components/FormField";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PaidIcon from "@mui/icons-material/Paid";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import Stack from "@mui/material/Stack";
import captureimg from "../../../Components/FormField/formfield.module.css";


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
          <div className={styles.formBody}>
            {/* LOGO */}
            <Logo />

            {/* Blue Admin Registration Form Container */}
            <div className={styles.formContainer}>
              <h1 className={styles.formheading}>Employee Registration</h1>

              {/* HTML form */}
              <form className={styles.form}>
                <Stack spacing={0} direction="row">
                  <FormField
                    label="Employee ID"
                    icon={<BadgeIcon />}
                    inputType="number"
                    placeholder="12345"
                    min="0"
                  />
                  <FormField
                    label="Employee Name"
                    icon={<PersonIcon />}
                    inputType="text"
                    placeholder="John Doe"
                  />
                </Stack>
                <Stack spacing={0} direction="row">
                  <FormField
                    label="Email"
                    icon={<EmailIcon />}
                    inputType="email"
                    placeholder="johndoe@gmail.com"
                  />
                  <FormField
                    label="Password"
                    icon={<LockIcon />}
                    inputType="password"
                    placeholder="******"
                  />
                </Stack>
                <Stack spacing={0} direction="row">
                  <FormField
                    label="Salary"
                    icon={<PaidIcon />}
                    inputType="number"
                    placeholder="20000"
                    min="0"
                  />

                  <div className={captureimg.fieldContainer}>
                    {/*Input Label with Icon*/}
                    <div className={captureimg.labelContainer}>
                      <h4 className={captureimg.labelText}>Facial Images</h4>
                      <PhotoCameraFrontIcon />
                    </div>

                    {/*Input Field*/}
                    <input
                      type="file"
                      id="capture"
                      style={{ display: "none" }}
                      required
                    />
                    <label htmlFor="capture">
                      <HoverButton
                        label="Take Images"
                        bgColor="#16344f"
                        textColor="#d9eff5"
                        onClick={openCamera}
                      />
                      {/* No Images */}
                    </label>
                  </div>
                </Stack>

                {/* Register button */}
                <div style={{ margin: "30px 0px" }}>
                  <HoverButton
                    label="Register"
                    bgColor="#16344f"
                    textColor="#d9eff5"
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterEmployee;
