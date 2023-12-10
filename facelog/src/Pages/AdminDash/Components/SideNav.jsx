import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import SupervisorAccountTwoToneIcon from "@mui/icons-material/SupervisorAccountTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import PolicyTwoToneIcon from "@mui/icons-material/PolicyTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { useNavigate } from "react-router-dom";
import PermIdentityTwoToneIcon from "@mui/icons-material/PermIdentityTwoTone";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideNav() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <Box style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ background: "#265073" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <CalendarMonthTwoToneIcon />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ paddingLeft: "16px" }}
              >
                FaceLog
              </Typography>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ paddingRight: "16px" }}
              >
                Welcome Admin
              </Typography>
              <PermIdentityTwoToneIcon />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* home start */}
        <List>
          <ListItem
            disablePadding
            style={{ display: "block", marginBottom: "10px" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&:hover": {
                  backgroundColor: "#265073", // Change to your desired blue color
                  borderRadius: "10px", // 10px border radius on hover
                  transition:
                    "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius
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
                  transition:
                    "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius when not hovered
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HomeTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Home" style={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          {/* home end */}
          {/* employee reg start */}
          <ListItem
            disablePadding
            style={{ display: "block", marginBottom: "10px" }}
            onClick={() => {
              navigate("/RegisterEmployee");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&:hover": {
                  backgroundColor: "#265073", // Change to your desired blue color
                  borderRadius: "10px", // 10px border radius on hover
                  transition:
                    "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius
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
                  transition:
                    "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius when not hovered
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HowToRegTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Register Employee"
                style={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {/* employee reg end */}

          {/* coadmin reg start */}
          <ListItem
            disablePadding
            style={{ display: "block", marginBottom: "10px" }}
            onClick={() => {
              navigate("/RegisterCoAdmin");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&:hover": {
                  backgroundColor: "#265073", // Change to your desired blue color
                  borderRadius: "10px", // 10px border radius on hover
                  transition:
                    "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius
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
                  transition:
                    "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius when not hovered
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SupervisorAccountTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Register Co Admin"
                style={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
            {/* co admin reg end */}

            {/* settimeinterval start */}
          </ListItem>
          <ListItem
            disablePadding
            style={{ display: "block", marginBottom: "10px" }}
            onClick={() => {
              navigate("/SetTimeInterval");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&:hover": {
                  backgroundColor: "#265073", // Change to your desired blue color
                  borderRadius: "10px", // 10px border radius on hover
                  transition:
                    "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius
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
                  transition:
                    "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius when not hovered
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AccessTimeTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Set Time Interval"
                style={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>

            {/* settimeinterval end */}

            {/* setdays start */}
          </ListItem>
          <ListItem
            disablePadding
            style={{ display: "block", marginBottom: "10px" }}
            onClick={() => {
              navigate("/SetDays");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&:hover": {
                  backgroundColor: "#265073", // Change to your desired blue color
                  borderRadius: "10px", // 10px border radius on hover
                  transition:
                    "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius
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
                  transition:
                    "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius when not hovered
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <CalendarMonthTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Set Days"
                style={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {/* setdays end */}
          <ListItem
            disablePadding
            style={{ display: "block", marginBottom: "10px" }}
            onClick={() => {
              navigate("/SetSalaryPolicy");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&:hover": {
                  backgroundColor: "#265073", // Change to your desired blue color
                  borderRadius: "10px", // 10px border radius on hover
                  transition:
                    "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius
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
                  transition:
                    "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius when not hovered
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PolicyTwoToneIcon />
              </ListItemIcon>
              {/* setsalarypolicy start */}
              <ListItemText
                primary="Set Salary Policy"
                style={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
            {/* setsalarypolicy end */}

            {/* logout start */}
          </ListItem>
          <ListItem
            disablePadding
            style={{ display: "block", marginBottom: "10px" }}
            onClick={() => {
              navigate("/LogOut");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&:hover": {
                  backgroundColor: "#265073", // Change to your desired blue color
                  borderRadius: "10px", // 10px border radius on hover
                  transition:
                    "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius
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
                  transition:
                    "background-color 0.9s ease, border-radius 0.2s ease", // 0.2 second transition for background color and border radius when not hovered
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                style={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {/* logout end */}
        </List>

        {/* <Divider />
        <List>
        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List> */}
      </Drawer>
    </Box>
  );
}
