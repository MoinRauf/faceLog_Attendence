import React from "react";
import { Link } from "react-router-dom";
import styles from "./custombutton.module.css";


const CustomButton = ({ btnLabel, bgColor, textColor, linkto }) => {
    return (
      <div className={styles.boxStyle} style={{ backgroundColor: bgColor }}>
        <Link
          to={linkto}
          style={{ color: textColor }}
        >
          {btnLabel}
        </Link>
        {/* <button
        className={styles.boxStyle}
          style={{backgroundColor: bgColor}}
        >
          <Link
            to={linkto}
            style={{color: textColor}}
          >
            {btnLabel}
          </Link>
        </button> */}
      </div>
    );
};

export default CustomButton;
