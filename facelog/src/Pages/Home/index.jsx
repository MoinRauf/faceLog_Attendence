// Home.js
import React from "react";
import Logo from "../../Components/Logo";
import styles from "./home.module.css";
import face from "../../Assets/facerecognition2.svg";
import HoverButton from "../../Components/CustomButton/HoverButton";

const Home = () => {
  return (
    <div className={styles.homecontainer}>
      <Logo />
      <div className={styles.homebody}>
        <div className={styles.hometextarea}>
          <h1>FaceLog Attendance</h1>

          {/* Container for the buttons */}
          <div className={styles.homebuttons}>
            {/* First button */}
            <HoverButton
              label="Setup System"
              bgColor="#c0ffd1"
              textColor="#16344f"
              linkTo="/register"
            />
            {/* Second button */}
            <HoverButton
              label="Login"
              bgColor="#d9eff5"
              textColor="#16344f"
              linkTo="/login"
            />
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

