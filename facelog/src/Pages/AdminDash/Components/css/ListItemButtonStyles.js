// ListItemButtonStyles.js
const listItemButtonStyles = (open) => ({
  minHeight: 48,
  justifyContent: open ? "initial" : "center",
  px: 2.5,
  "&:hover": {
    transform: "scale(1.1, 1.1)",
    transition: "transform 0.3s ease", // 0.2 second transition for background color and border radius
  },
  "&:not(:hover)": {
    transition: "transform 0.3s ease", // 0.2 second transition for background color and border radius when not hovered
  },
});

export default listItemButtonStyles;
