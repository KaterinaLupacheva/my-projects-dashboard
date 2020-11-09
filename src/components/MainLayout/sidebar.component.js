import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Link from "next/link";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MENU_LIST_ITEMS } from "../../constants/menuItems";
import { sidebarStyles } from "./sidebar.styles";

const useStyles = makeStyles(sidebarStyles);

const Sidebar = ({ open, handleDrawerClose }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {MENU_LIST_ITEMS.map((item, id) => (
          <Link href={item.route}>
            <a>
              <ListItem
                button
                key={id}
                selected={id === selectedIndex}
                onClick={(event) => handleSelect(event, id)}
                classes={{ selected: classes.selected }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ variant: "h5" }}
                />
              </ListItem>
            </a>
          </Link>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
