import React from "react";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({
  position = "top-right",
  autoClose = 2000,
  theme = "light",
}) => {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
    />
  );
};

export default Toast;
