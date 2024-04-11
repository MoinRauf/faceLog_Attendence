// HoverButton.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const HoverButton = ({ label, bgColor, textColor, linkTo, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const buttonStyle = {
    padding: "10px 20px",
    margin:"10px",
    // gap:"200px",
    border: "2px solid #16344f",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: isHovered ? "0px" : "6px",
    cursor: "pointer",
    transition: "all 0.3s",
    textDecoration: "none",
    color: textColor || "#16344f",
    backgroundColor: bgColor || "#d9eff5",
    transform: isHovered ? "scale(1.05,1.05)" : "scale(1, 1)",
    boxShadow: isHovered ? "5px 5px 5px #000000" : "",
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    navigate(linkTo);
  };
  

  return (
    <button
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={linkTo ? handleClick : onClick}
    >
      {label}
    </button>
  );
};

HoverButton.propTypes = {
  label: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  linkTo: PropTypes.string,
};

export default HoverButton;
