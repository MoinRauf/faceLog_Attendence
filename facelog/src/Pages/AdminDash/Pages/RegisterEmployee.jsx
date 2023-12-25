import React, { useContext, useState } from "react";
import axios from "axios";
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PaidIcon from "@mui/icons-material/Paid";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import Stack from "@mui/material/Stack";
import captureimg from "../../../Components/FormField/formfield.module.css";
import { ToastContainer, toast } from "react-toastify";
import WebcamComponent from "../../../Components/Camera/Webcam";
import { MyContext } from "../../../MyContext";
import admincss from "../../../Pages/AdminDash/Pages/ADMINCSS/RegisterEmployee.css";

const RegisterEmployee = () => {
  // Consume the Context start
  const { text } = useContext(MyContext);
  // image is the jpeg from the camera component
  let image = text;
  console.log("this is text from regemployee file ", image);
  // Consume the Context end
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    email: "",
    password: "",
    salary: "",
  });

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object
      const formDataObj = new FormData();

      // Append image data to FormData
      formDataObj.append("image", image);

      // Append other form data to FormData
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
      });

      // Make the Axios POST request to your API endpoint
      const response = await axios.post(
        "http://localhost:3001/RegisterEmployee",
        formDataObj
      );

      // Handle the response as needed
      console.log("Registration successful", response.data);

      // Show success toast
      toast.success("Registration successful");

      // Clear the form
      setFormData({
        employeeId: "",
        employeeName: "",
        email: "",
        password: "",
        salary: "",
      });
    } catch (error) {
      console.error("Registration failed", error);

      // Show error toast
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      {isCameraOpen ? (
        // Render WebcamComponent if the camera is open
        <WebcamComponent isOpen={isCameraOpen} onClose={closeCamera} />
      ) : (
        // Render the Register Employee page if the camera is closed
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
          <div className="maindiv12">
            <h1 className="heading12">Employee Registration</h1>

            <div>
              <Stack spacing={7} direction="row">
                <div>
                  <div className="center12">
                    <label className="divlabel12">Employee ID:</label>
                  </div>
                  <input
                    type="number"
                    value={formData.employeeId}
                    placeholder="Enter employee ID"
                    onChange={(e) =>
                      handleInputChange("employeeId", e.target.value)
                    }
                    className="userinput12"
                  />
                </div>
                <div>
                  <div className="center12">
                    <label className="divlabel12">Employee Name:</label>
                  </div>
                  <input
                    type="text"
                    value={formData.employeeName}
                    placeholder="Enter employee name"
                    onChange={(e) =>
                      handleInputChange("employeeName", e.target.value)
                    }
                    className="userinput12"
                  />
                </div>
              </Stack>
              <Stack spacing={7} direction="row">
                <div>
                  <div className="center12">
                    <label className="divlabel12">Email:</label>
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    placeholder="Enter email"
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="userinput12"
                  />
                </div>
                <div>
                  <div className="center12">
                    <label className="divlabel12">Password:</label>
                  </div>
                  <input
                    type="password"
                    value={formData.password}
                    placeholder="Enter password"
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="userinput12"
                  />
                </div>
              </Stack>
              <Stack spacing={7} direction="row">
                <div>
                  <div className="center12">
                    <label className="divlabel12">Salary:</label>
                  </div>
                  <input
                    type="number"
                    value={formData.salary}
                    placeholder="Enter salary"
                    onChange={(e) =>
                      handleInputChange("salary", e.target.value)
                    }
                    className="userinput12"
                  />
                </div>
                <div className={captureimg.fieldContainer}>
                  {/* Input Label with Icon */}
                  <div className={captureimg.labelContainer}>
                    <h4 className={captureimg.labelText}> <span style={{fontSize:"20px"}}>Facial Images</span>  <PhotoCameraFrontIcon /> </h4>
                    
                  </div>

                  {/* Input Field */}
                  <input
                    type="file"
                    value={formData.image}
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
              <div style={{ margin: "30px 0px 10px 230px" }}>
                <HoverButton
                  label="Register"
                  bgColor="#16344f"
                  textColor="#d9eff5"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterEmployee;
