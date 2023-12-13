// ListItemButtonStyles.js
const listItemButtonStyles = (open) => ({
  minHeight: 48,
  justifyContent: open ? "initial" : "center",
  px: 2.5,
  "&:hover": {
    backgroundColor: "#16344F", // Change to your desired blue color
    borderRadius: "10px", // 10px border radius on hover
    transition: "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius
    "& .MuiListItemIcon-root": {
      color: "white", // Change to your desired text/icon color on hover
      transition: "color 1.7s ease", // 0.2 second transition for text/icon color
    },
    "& .MuiListItemText-root": {
      color: "white", // Change to your desired text/icon color on hover
      transition: "color 1.7  s ease", // 0.2 second transition for text/icon color
      borderBottom: "2px solid white", // White bottom border on hover
      paddingTop: "5px", // Add margin above the bottom border
      paddingBottom: "5px", // Add margin below the bottom border
    },
  },
  "&:not(:hover)": {
    transition: "background-color 2s ease, border-radius 0.9s ease", // 0.2 second transition for background color and border radius when not hovered
  },
});

export default listItemButtonStyles;
