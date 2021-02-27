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
import { makeStyles, Theme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { MENU_LIST_ITEMS } from '../../constants/menu-items';
import { CustomTheme } from '../../styles/CustomTheme';
import { drawerWidth } from '../../styles/theme';

const useStyles = makeStyles((theme: Theme) => ({
  drawerTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerTitle: {
    paddingLeft: theme.spacing(3),
    color: theme.palette.secondary.main,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: CustomTheme.color.bgDark,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  divider: {
    backgroundColor: CustomTheme.color.grey,
  },
  list: {
    padding: 0,
  },
  selected: {
    backgroundColor: `${CustomTheme.color.bgSelected} !important`,
    fontWeight: 600,
  },
  link: {
    textDecoration: 'none',
  },
  linkText: {
    color: CustomTheme.color.grey,
  },
  linkTextSelected: {
    color: CustomTheme.color.bgSelected,
  },
}));

interface SideBarProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const Sidebar = ({ open, handleDrawerClose }: SideBarProps): JSX.Element => {
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
