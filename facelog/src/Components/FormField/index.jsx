import React from 'react'
import styles from "./formfield.module.css";
import PropTypes from "prop-types";



const FormField = ({label, icon, inputType, placeholder, min, value, setter, required}) => {
  return (
    <div className={styles.fieldContainer}>
      {/*Input Label with Icon*/}
      <div className={styles.labelContainer}>
        <h4 className={styles.labelText}>{label}</h4>
        {icon && (
          <div>
            {React.cloneElement(icon, {
              style: { color: "#16344f", fontSize: "1.7em" },
            })}
          </div>
        )}
      </div>

      {/*Input Field*/}
      <input
        className={styles.input}
        type={inputType}
        placeholder={placeholder || ""}
        min={min || ""}
        value={value}
        onChange={(e) => setter(e.target.value)}
        required={required}
      />
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  inputType: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default FormField;
