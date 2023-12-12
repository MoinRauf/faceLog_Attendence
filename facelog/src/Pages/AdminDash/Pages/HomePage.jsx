import React from "react";
import SideNav from "../Components/SideNav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/joy/Grid";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import AChart from "../AdminCharts/AChart";
import PiChart from "../AdminCharts/PiChart";
import DataTable from "../Components/DataTable";

const HomePage = () => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  return (
    <>
      <Box height={10} />
      <Box style={{ display: "flex" }}>
        <SideNav />
        <Box component="main" style={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Card
            variant="soft"
            style={{ margin: "10px", backgroundColor: "#091D36" }}
          >
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid
                xs={0}
                style={{
                  marginLeft: "20px",
                  fontSize: "40px",
                  fontWeight: "bolder",
                  color: "white",
                }}
              >
                DashBoard
              </Grid>
              {/* remove start */}
              <Grid
                xs={10.5}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "50px",
                }}
              >
                <Stack spacing={6} direction="row">
                  <Card
                    variant="solid"
                    sx={{
                      height: 15 + "vh",
                      width: 40 + "%",
                      backgroundColor: "white",
                      color: "black",
                    }}
                  >
                    <CardContent>
                      <Typography
                        level="title-md"
                        style={{ fontSize: "30px", textAlign: "center" }}
                      >
                        Days Present
                      </Typography>
                      <Typography
                        style={{ fontSize: "30px", textAlign: "center" }}
                      >
                        34
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{ height: 15 + "vh", width: 40 + "%", color: "black" }}
                  >
                    <CardContent>
                      <Typography
                        level="title-md"
                        style={{ fontSize: "30px", textAlign: "center" }}
                      >
                        Days Late
                      </Typography>
                      <Typography
                        style={{ fontSize: "30px", textAlign: "center" }}
                      >
                        4
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>

              <Grid
                xs={11}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "50px",
                }}
              >
                <Stack spacing={5.7} direction="row">
                  <Card
                    variant="outlined"
                    sx={{
                      height: 15 + "vh",
                      width: 40 + "%",
                      // backgroundColor: "#16344F",
                      // color: "white",
                      backgroundColor: "white",
                      color: "black",
                    }}
                  >
                    <CardContent>
                      <Typography
                        level="title-md"
                        style={{ fontSize: "30px", textAlign: "center" }}
                      >
                        Days Absent
                      </Typography>
                      <Typography
                        style={{ fontSize: "30px", textAlign: "center" }}
                      >
                        3
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    variant="soft"
                    sx={{
                      height: 15 + "vh",
                      width: 40 + "%",
                      // backgroundColor: "#D9EFF5",
                      backgroundColor: "white",
                      color: "black",
                    }}
                  >
                    <CardContent>
                      <Typography
                        level="title-md"
                        style={{
                          fontSize: "30px",
                          textAlign: "center",
                          padding: "10px",
                        }}
                      >
                        Half Days
                      </Typography>
                      <Typography
                        style={{ fontSize: "30px", textAlign: "center" }}
                      >
                        12
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
              {/* remove end */}
            </Grid>
            <Box height={20} />
            <Grid container spacing={0.2} sx={{ flexGrow: 1 }}>
              <Grid xs={5} style={{ margin: "50px" }}>
                <Card
                  variant="solid"
                  sx={{
                    padding: "30px",
                    height: 50 + "vh",
                    backgroundColor: "#16344F",
                  }}
                >
                  <CardContent>
                    <AChart />
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                xs={5}
                style={{
                  margin: "50px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Card
                  variant="solid"
                  sx={{
                    padding: "30px",
                    height: 50 + "vh",
                    backgroundColor: "#16344F",
                  }}
                >
                  <CardContent>
                    <PiChart />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {/* data table start */}
            <DataTable />
            {/* data table end */}
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
