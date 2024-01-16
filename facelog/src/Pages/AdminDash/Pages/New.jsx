import React, { useContext, useState } from "react";
import axios from "axios";
import styles from "../../../ReusableCSS/form.module.css";
import Logo from "../../../Components/Logo";
import HoverButton from "../../../Components/CustomButton/HoverButton";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import { MyContext } from "../../../MyContext";
import { useNavigate } from "react-router-dom";
import admincss from "../../../Pages/AdminDash/Pages/ADMINCSS/New.css";

const New = () => {
  const [employeeId, setemployeeId] = useState("");
  const [employeeName, setemployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [salary, setSalary] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId || !employeeName || !email || !password || !salary) {
      toast.error("Missing Credentials!");
      return;
    } else if (password.length < 7) {
      toast.error("Password must be at least 7 characters long");
      return;
    } else {
      try {
        // Make the Axios POST request to your API endpoint
        const response = await axios.post(
          "http://localhost:5000/registerEmployee",
          {
            employeeId,
            employeeName,
            email,
            password,
            salary,
          }
        );

        // Handle the response as needed
        console.log("Registration successful", response.data);

        // Show success toast
        toast.success("Registration successful");
        setTimeout(() => {
          navigate("/RegisterEmployee");
        }, 3000);

        // Clear the form by resetting state variables
        setemployeeId("");
        setemployeeName("");
        setEmail("");
        setPassword("");
        setSalary("");

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
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("An unexpected error occurred");
          console.error("Error during request setup:", error.message);
        }
      }
    }
  };
  // const navigate = useNavigate();

  // const { text } = useContext(MyContext);
  // let image = text;

  // const [formData, setFormData] = useState({
  //   employeeId: "",
  //   employeeName: "",
  //   email: "",
  //   password: "",
  //   salary: "",
  // });

  // const handleInputChange = (field, value) => {
  //   setFormData({ ...formData, [field]: value });
  // };
  // console.log(formData, "employee data");
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (
  //     !formData.employeeId ||
  //     !formData.employeeName ||
  //     !formData.email ||
  //     !formData.password ||
  //     !formData.salary
  //   ) {
  //     toast.error("Please fill out all fields");
  //     return;
  //   }

  //   try {
  //     // const formDataObj = new FormData();
  //     // // formDataObj.append("image", image);
  //     // Object.keys(formData).forEach((key) => {
  //     //   formDataObj.append(key, formData[key]);
  //     // });

  //     const response = await axios.post(
  //       "http://localhost:5000/registerEmployee",
  //       formData
  //     );

  //     console.log("Registration successful", response.data);

  //     toast.success("Proceed to take images.");
  //     setTimeout(() => {
  //       navigate("/RegisterEmployee");
  //     }, 3000);

  //     setFormData({
  //       employeeId: "",
  //       employeeName: "",
  //       email: "",
  //       password: "",
  //       salary: "",
  //     });
  //   } catch (error) {
  //     console.error("Registration failed", error);

  //     toast.error("Registration failed. Please try again.");
  //   }
  // };

  return (
    <div>
      <form className={styles.formBody}>
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
        <div className="maindiv90">
          <h1 className="heading90">Employee Registration</h1>

          <div>
            <Stack spacing={7} direction="row">
              <div>
                <div className="center90">
                  <label className="divlabel90">Employee ID:</label>
                </div>
                <input
                  type="number"
                  value={employeeId}
                  placeholder="Enter employee ID"
                  onChange={(e) => setemployeeId(e.target.value)}
                  className="userinput90"
                />
              </div>
              <div>
                <div className="center90">
                  <label className="divlabel90">Employee Name:</label>
                </div>
                <input
                  type="text"
                  value={employeeName}
                  placeholder="Enter employee name"
                  onChange={(e) => setemployeeName(e.target.value)}
                  className="userinput90"
                />
              </div>
            </Stack>
            <Stack spacing={7} direction="row">
              <div>
                <div className="center90">
                  <label className="divlabel90">Email:</label>
                </div>
                <input
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="userinput90"
                />
              </div>
              <div>
                <div className="center90">
                  <label className="divlabel90">Password:</label>
                </div>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="userinput90"
                />
              </div>
            </Stack>
            <Stack spacing={2} direction="row">
              <div>
                <div className="center90">
                  <label className="divlabel90">Salary:</label>
                </div>
                <input
                  type="number"
                  value={salary}
                  placeholder="Enter salary"
                  onChange={(e) => setSalary(e.target.value)}
                  className="userinput90"
                />
              </div>
              <div style={{ margin: "20px 0px 10px 50px" }}>
                <HoverButton
                  label="Register"
                  bgColor="#16344f"
                  textColor="#d9eff5"
                  onClick={handleSubmit}
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
