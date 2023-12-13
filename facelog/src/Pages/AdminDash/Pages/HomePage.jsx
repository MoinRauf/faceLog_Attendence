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
      <Box style={{ display: "flex", overflowX: "hidden" }}>
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

              <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid
                  xs={10.5}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "50px",
                    paddingTop: "90px",
                  }}
                >
                  <Stack spacing={2} direction="row">
                    <Card variant="plain">
                      <CardContent>
                        <Typography level="title-md">Plain card</Typography>
                        <Typography>Description of the card.</Typography>
                      </CardContent>
                    </Card>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography level="title-md">
                          Outlined card (default)
                        </Typography>
                        <Typography>Description of the card.</Typography>
                      </CardContent>
                    </Card>
                    <Card variant="soft">
                      <CardContent>
                        <Typography level="title-md">Soft card</Typography>
                        <Typography>Description of the card.</Typography>
                      </CardContent>
                    </Card>
                    <Card variant="solid">
                      <CardContent>
                        <Typography level="title-md" textColor="inherit">
                          Solid card
                        </Typography>
                        <Typography textColor="inherit">
                          Description of the card.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Stack>
                </Grid>
                <Grid xs={4}></Grid>
                <Grid xs={4}></Grid>
                <Grid xs={8}></Grid>
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
