import { drawerWidth } from "../../theme";

export const sidebarStyles = (theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.background.dark,
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  selected: {
    backgroundColor: `${theme.palette.background.selected} !important`,
    fontWeight: 600,
  },
  link: {
    textDecoration: "none",
  },
  linkText: {
    color: theme.palette.primary.grey,
  },
  linkTextSelected: {
    color: theme.palette.primary.selected,
  },
});
