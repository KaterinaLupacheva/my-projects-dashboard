import {
  Box,
  Container,
  Grid,
  Link,
  Theme,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Footer from '../Footer';

import Sidebar from './Sidebar';
import TopAppBar from './TopAppBar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface AppBarWithSidebarProps {
  children: React.ReactNode;
}

const AppBarWithSidebar = ({
  children,
}: AppBarWithSidebarProps): JSX.Element => {
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
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Container>
        <Footer />
      </main>
    </div>
  );
};

export default AppBarWithSidebar;
