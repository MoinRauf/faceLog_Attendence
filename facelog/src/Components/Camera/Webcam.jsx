// WebcamComponent.js
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import style from "../Camera/WebCam.module.css";
import Logo from "../../Components/Logo/index";
import { MyContext } from "../../MyContext";

const WebcamComponent = ({ isOpen, onClose }) => {
  const { text, setText } = React.useContext(MyContext);


  const webcamRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      // console.log(imageSrc);
      setText(imageSrc);
      onClose(); // Close the camera after capturing the photo
    } else {
      console.error("Webcam reference not available");
    }
  };

  return (
    <div className={style.webBody}>
      <Logo />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px",
        }}
      >
        {" "}
        {isOpen && (
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        )}
        {isOpen && (
          <button
            onClick={capture}
            style={{
              margin: "20px 0px 0px 80px",
              padding: "10px 20px",
              border: "2px solid #16344f",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: isHovered ? "0px" : "6px",
              cursor: "pointer",
              transition: "all 0.3s",
              textDecoration: "none",
              color: "#16344f",
              backgroundColor: "#d9eff5",
              transform: isHovered ? "scale(1.05,1.05)" : "scale(1, 1)",
              boxShadow: isHovered ? "5px 5px 5px #000000" : "",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Capture photo
          </button>
        )}
      </div>
    </div>
  );
};

export default WebcamComponent;
