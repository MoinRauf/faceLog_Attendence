import React from 'react'
import styles from "./formfield.module.css";
import PropTypes from "prop-types";



const FormField = ({label, icon, inputType, placeholder, marginLeft}) => {
  const fieldStyle = {
    marginLeft: marginLeft || "0", // Default to "0" if marginLeft is not provided
  };
  return (
    <div className={styles.fieldContainer}>
        
      {/*Input Label with Icon*/}
      <div className={styles.labelContainer}>
        <h4 className={styles.labelText}>{label}</h4>
        <div>
          {React.cloneElement(icon, {
            style: { color: "#16344f", fontSize: "1.7em" },
          })}
        </div>
      </div>

      {/*Input Field*/}
      <input
        className={styles.input}
        type={inputType}
        placeholder={placeholder || ""}
        style={fieldStyle}
      />
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  // icon: PropTypes.element.isRequired,
  icon: PropTypes.element,
  inputType: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default FormField;