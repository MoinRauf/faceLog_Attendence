import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

const RegisterEmployee = () => {
  const webcamRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
      closeCamera();
    } else {
      console.error("Webcam reference not available");
    }
  };

  useEffect(() => {
    if (isCameraOpen) {
      const initializeWebcam = () => {
        if (webcamRef.current) {
        } else {
          console.error("Webcam reference not available");
        }
      };

      initializeWebcam();
    }
  }, [isCameraOpen]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isCameraOpen && (
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      )}
      {isCameraOpen ? (
        <button onClick={capture}>Capture photo</button>
      ) : (
        <button onClick={openCamera}>Open Camera</button>
      )}
    </div>
  );
};

export default RegisterEmployee;
