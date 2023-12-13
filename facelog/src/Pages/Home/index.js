// Home.js
import React from "react";
import Logo from "../../Components/Logo";
import styles from "./home.module.css";
import face from "../../Assets/facerecognition.svg";
import HoverButton from "../../Components/CustomButton/HoverButton";

const Home = () => {
  return (
    <div className={styles.homecontainer}>
      <Logo />
      <div className={styles.homebody}>
        <div className={styles.hometextarea}>
          <h1>FaceLog Attendance</h1>

          {/* Container for the buttons */}
          <div className={styles.homebuttonsContainer}>
            {/* First button */}
            <div className={styles.homebuttons}>
              <HoverButton label="Login" linkTo="/login" />
            </div>

            {/* Second button */}
            <div className={styles.homebuttons}>
              <HoverButton label="Register" linkTo="/register" />
            </div>
          </div>
        </div>
        <div className={styles.faceimg}>
          <img src={face} alt="Face recognition" />
        </div>
      </div>
    </div>
  );
};

export default Home;

// es file main b change hua hy kafi
