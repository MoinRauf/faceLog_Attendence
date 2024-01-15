import React, { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import admincss from "../../../Pages/AdminDash/Pages/ADMINCSS/SetTimeInterval.css";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SetTimeInterval = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    attendanceStartTime: "",
    attendanceEndTime: "",
    presentStartTime: "",
    presentEndTime: "",
  
    lateStartTime: "",
    lateEndTime: "",
    halfDayStartTime: "",
    halfDayEndTime: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the fields are empty
    const isFormEmpty = Object.values(formData).some((value) => value === "");
    if (isFormEmpty) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // Make the Axios POST request to your API endpoint
      const response = await Axios.post(
        "http://localhost:3001/SetTimeInterval",
        formData
      );

      // Handle the response as needed
      console.log("Submission successful", response.data);

      // Show success toast
      toast.success("Submission successful");

      // Clear the form
      setFormData({
        attendanceStartTime: "",
        attendanceEndTime: "",
        presentStartTime: "",
        presentEndTime: "",
        lateStartTime: "",
        lateEndTime: "",
        halfDayStartTime: "",
        halfDayEndTime: "",
      });

      setTimeout(() => {
        navigate("/admindashboard");
      }, 3000);
    } catch (error) {
      console.error("Submission failed", error);
      // Handle errors (e.g., show error messages to the user)
      toast.error("Submission failed. Please try again.");
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
      <div className="maindiv111">
        <h1 className="heading111">Set Time Interval</h1>

        {/* HTML form */}

        <div>
          <div>
            <div className="center111">
              <label className="divlabel111">Attendance Timing </label>
            </div>
            <Stack spacing={7} direction="row">
              <input
                type="time"
                value={formData.attendanceStartTime}
                onChange={(e) =>
                  handleInputChange("attendanceStartTime", e.target.value)
                }
                className="userinput111"
              />
              <input
                type="time"
                value={formData.attendanceEndTime}
                onChange={(e) =>
                  handleInputChange("attendanceEndTime", e.target.value)
                }
                className="userinput111"
              />
            </Stack>
          </div>

          <div>
            <div className="center111">
              <label className="divlabel111">Present Timing </label>
            </div>
            <Stack spacing={7} direction="row">
              <input
                type="time"
                value={formData.presentStartTime}
                onChange={(e) =>
                  handleInputChange("presentStartTime", e.target.value)
                }
                className="userinput111"
              />
              <input
                type="time"
                value={formData.presentEndTime}
                onChange={(e) =>
                  handleInputChange("presentEndTime", e.target.value)
                }
                className="userinput111"
              />
            </Stack>
          </div>

          {/* <div>
            <div className="center111">
              <label className="divlabel111">Absent Timing </label>
            </div>
            <Stack spacing={7} direction="row">
              <input
                type="time"
                value={formData.absentStartTime}
                onChange={(e) =>
                  handleInputChange("absentStartTime", e.target.value)
                }
                className="userinput111"
              />
              <input
                type="time"
                value={formData.absentEndTime}
                onChange={(e) =>
                  handleInputChange("absentEndTime", e.target.value)
                }
                className="userinput111"
              />
            </Stack>
          </div> */}

          <div>
            <div className="center111">
              <label className="divlabel111">Late Timing </label>
            </div>
            <Stack spacing={7} direction="row">
              <input
                type="time"
                value={formData.lateStartTime}
                onChange={(e) =>
                  handleInputChange("lateStartTime", e.target.value)
                }
                className="userinput111"
              />
              <input
                type="time"
                value={formData.lateEndTime}
                onChange={(e) =>
                  handleInputChange("lateEndTime", e.target.value)
                }
                className="userinput111"
              />
            </Stack>
          </div>

          <div>
            <div className="center111">
              <label className="divlabel111">Half Day Timing </label>
            </div>
            <Stack spacing={7} direction="row">
              <input
                type="time"
                value={formData.halfDayStartTime}
                onChange={(e) =>
                  handleInputChange("halfDayStartTime", e.target.value)
                }
                className="userinput111"
              />
              <input
                type="time"
                value={formData.halfDayEndTime}
                onChange={(e) =>
                  handleInputChange("halfDayEndTime", e.target.value)
                }
                className="userinput111"
              />
            </Stack>
          </div>

          {/*  button */}
          <div style={{ margin: "50px 0px 30px 300px" }}>
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

export default SetTimeInterval;
