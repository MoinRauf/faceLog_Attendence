// HoverButton.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const HoverButton = ({ label, bgColor, textColor, linkTo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const buttonStyle = {
    padding: "10px 20px",
    border: "2px solid #16344f",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "10px",
    cursor: "pointer",
    transition:
      "background-color 0.9s ease, border-radius 0.2s ease, color 1.7s ease",
    textDecoration: "none",
    color: textColor || "white",
    backgroundColor: isHovered ? "#265073" : bgColor || "#9BB8CD", 
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
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

HoverButton.propTypes = {
  label: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  linkTo: PropTypes.string.isRequired,
};

export default HoverButton;
