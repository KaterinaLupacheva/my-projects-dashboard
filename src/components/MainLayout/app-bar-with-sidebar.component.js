import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { appBarWithSidebarStyles } from "./app-bar-with-sidebar.styles";
import Sidebar from "./sidebar.component";
import TopAppBar from "./top-app-bar.component";
import { Grid, Box, Typography, Link, Container } from "@material-ui/core";

const useStyles = makeStyles(appBarWithSidebarStyles);

const AppBarWithSidebar = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <TopAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {children}
          </Grid>
          <Box pt={4} className={classes.copyright}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://ramonak.io/">
        ramonak.io
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default AppBarWithSidebar;
