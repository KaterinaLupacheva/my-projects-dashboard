import { drawerWidth } from '../../styles/theme';

export const sidebarStyles = (theme) => ({
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
    backgroundColor: theme.palette.background.dark,
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
    backgroundColor: theme.palette.primary.grey,
  },
  list: {
    padding: 0,
  },
  selected: {
    backgroundColor: `${theme.palette.background.selected} !important`,
    fontWeight: 600,
  },
  link: {
    textDecoration: 'none',
  },
  linkText: {
    color: theme.palette.primary.grey,
  },
  linkTextSelected: {
    color: theme.palette.primary.selected,
  },
});
