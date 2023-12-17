import React from "react";
import styles from "../../../ReusableCSS/form.module.css";
import HoverButton from "../../../Components/CustomButton/HoverButton";

const LogOut = () => {
  return (
    <div
      className={styles.formBody}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#091D36",
      }}
    >
      <div style={{ padding: "300 px" }}>
        <HoverButton
          label="LogOut"
          bgColor="#c0ffd1"
          textColor="#16344f"
          // linkTo="/register"
        />
      </div>
    </div>
  );
};

export default LogOut;
