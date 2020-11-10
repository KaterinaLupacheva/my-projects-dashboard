import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { topAppBarStyles } from "./top-app-bar.styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
} from "@material-ui/core";
import LocalCafeRoundedIcon from "@material-ui/icons/LocalCafeRounded";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(topAppBarStyles);

const TopAppBar = ({ open, handleDrawerOpen }) => {
  const classes = useStyles();

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
          align="center"
        >
          My Projects Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
