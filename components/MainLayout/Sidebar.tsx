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
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { MENU_LIST_ITEMS } from '../../constants/menu-items';
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
    backgroundColor: theme.palette.primary.dark,
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
  list: {
    padding: 0,
  },
  selected: {
    backgroundColor: `${theme.palette.primary.light} !important`,
  },
  link: {
    textDecoration: 'none',
  },
  linkText: {
    color: theme.palette.primary.light,
  },
  text: {
    ...theme.typography.h6,
  },
  linkTextSelected: {
    color: theme.palette.primary.contrastText,
  },
  logo: {
    marginLeft: theme.spacing(1),
  },
}));

interface SideBarProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const Sidebar = ({ open, handleDrawerClose }: SideBarProps): JSX.Element => {
  const classes = useStyles();
  const router = useRouter();
  const initialSelection = MENU_LIST_ITEMS.findIndex(
    (el) => el.route === router.pathname
  );
  const [selectedIndex, setSelectedIndex] = useState(
    initialSelection !== -1 ? initialSelection : 0
  );

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.drawerTitleContainer}>
        <div className={classes.logo}>
          <Image src="/logo.png" alt="logo" width={50} height={25} />
        </div>
        <Typography variant="h5" classes={{ root: classes.drawerTitle }}>
          Ramonak
        </Typography>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon classes={{ root: classes.linkText }} />
          </IconButton>
        </div>
      </div>
      <Divider />
      <List classes={{ root: classes.list }}>
        {MENU_LIST_ITEMS.map(({ route, Icon, name }, id) => (
          <Link href={route} key={id}>
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
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  primaryTypographyProps={{ variant: 'subtitle1' }}
                  classes={{
                    root:
                      id === selectedIndex
                        ? classes.linkTextSelected
                        : classes.linkText,
                    primary: classes.text,
                  }}
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
