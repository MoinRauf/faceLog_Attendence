import React from "react";
import logoImg from "../../Assets/logo_img_darkbg.svg";
import styles from "./logo.module.css";

const Logo = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src={logoImg} alt="Facelog logo" />
        <h3>FaceLog</h3>
      </div>
    </div>
  );
};

export default Logo;
