import React from 'react'
import Logo from '../../Components/Logo';
import styles from "./home.module.css";
import face from "../../Assets/facerecognition.svg";
import CustomButton from '../../Components/CustomButton';


const Home = () => {
  return (
    <div className={styles.homecontainer}>
      <Logo />
      <div className={styles.homebody}>
        <div className={styles.hometextarea}>
          <h1>FaceLog Attendance</h1>
          <div className={styles.homebuttons}>
            <CustomButton
              btnLabel="Setup System"
              bgColor="#c0ffd1"
              textColor="#16344f"
              linkto="/register"
            />
            <CustomButton
              btnLabel="Login"
              bgColor="#d9eff5"
              textColor="#16344f"
              linkto="/login"
            />
          </div>
        </div>
        <div className={styles.faceimg}>
          <img src={face} alt="Face recognition" />
        </div>
      </div>
    </div>
  );
}

export default Home
