import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { MENU_LIST_ITEMS } from '../../constants/menu-items';
import { sidebarStyles } from './sidebar.styles';

const useStyles = makeStyles(sidebarStyles);

const Sidebar = ({ open, handleDrawerClose }) => {
  const classes = useStyles();
  const router = useRouter();
  const initialSelection = () => {
    return MENU_LIST_ITEMS.findIndex((el) => el.route === router.pathname);
  };

  const [selectedIndex, setSelectedIndex] = useState(initialSelection());

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.drawerTitleContainer}>
        <Typography variant="h5" classes={{ root: classes.drawerTitle }}>
          Dashboard
        </Typography>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon classes={{ root: classes.linkText }} />
          </IconButton>
        </div>
      </div>
      <Divider classes={{ root: classes.divider }} />
      <List classes={{ root: classes.list }}>
        {MENU_LIST_ITEMS.map((item, id) => (
          <Link href={item.route} key={id}>
            <a className={classes.link}>
              <ListItem
                button
                selected={id === selectedIndex}
                onClick={() => setSelectedIndex(id)}
                classes={{ selected: classes.selected }}
              >
                <ListItemIcon
                  classes={{
                    root:
                      id === selectedIndex
                        ? classes.linkTextSelected
                        : classes.linkText,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ variant: 'subtitle1' }}
                  classes={{
                    root:
                      id === selectedIndex
                        ? classes.linkTextSelected
                        : classes.linkText,
                  }}
                />
              </ListItem>
            </a>
          </Link>
        ))}
      </List>
      <Divider classes={{ root: classes.divider }} />
    </Drawer>
  );
};

export default Sidebar;
