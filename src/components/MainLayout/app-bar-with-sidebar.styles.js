export const appBarWithSidebarStyles = theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column"
  },
  copyright: {
    marginTop: "auto"
  }
});
