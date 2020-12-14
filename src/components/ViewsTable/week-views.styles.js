import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

export const weekViewsStyles = (theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
   bottomRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(1, 0, 0, 1),
  },
  green: {
    color: green[500],
    fontSize: "1.5rem",
  },
  red: {
    color: red.A200,
    fontSize: "1.5rem",
  },
});
