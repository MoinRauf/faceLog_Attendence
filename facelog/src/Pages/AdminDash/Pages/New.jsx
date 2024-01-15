import React, { useContext, useState } from "react";
import axios from "axios";
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import { MyContext } from "../../../MyContext";
import { useNavigate } from "react-router-dom";

const New = () => {
  const navigate = useNavigate();

  const { text } = useContext(MyContext);
  let image = text;

  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    email: "",
    password: "",
    salary: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
        !formData.employeeId ||
        !formData.employeeName ||
        !formData.email ||
        !formData.password ||
        !formData.salary
      ) {
        toast.error("Please fill out all fields");
        return;
      }

    try {
      const formDataObj = new FormData();
      formDataObj.append("image", image);
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
      });

      const response = await axios.post(
        "http://localhost:3001/EmpReg",
        formDataObj
      );

      console.log("Registration successful", response.data);

      toast.success("Proceed to take images.");
      setTimeout(() => {
        navigate("/RegisterEmployee");
      }, 3000);

      setFormData({
        employeeId: "",
        employeeName: "",
        email: "",
        password: "",
        salary: "",
      });
    } catch (error) {
      console.error("Registration failed", error);

      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
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
            <Stack spacing={2} direction="row">
              <div>
                <div className="center12">
                  <label className="divlabel12">Salary:</label>
                </div>
                <input
                  type="number"
                  value={formData.salary}
                  placeholder="Enter salary"
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  className="userinput12"
                />
              </div>
              <div style={{ margin: "20px 0px 10px 50px" }}>
                <HoverButton
                  label="Register"
                  bgColor="#16344f"
                  textColor="#d9eff5"
                  type="submit"
                />
              </div>
            </Stack>
          </div>
        </div>
      </form>
    </div>
  );
};

export default New;
