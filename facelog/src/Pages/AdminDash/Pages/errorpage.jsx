import React from "react";
import styles from "../../../ReusableCSS/form.module.css";

const Error = () => {
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
      <p style={{ fontWeight: "bolder", fontSize: "40px", color: "#D9EFF5" }}>
        PAGE NOT FOUND
      </p>
    </div>
  );
};

export default Error;
