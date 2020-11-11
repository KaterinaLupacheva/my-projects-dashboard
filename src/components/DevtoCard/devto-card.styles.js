export const devtoCardStyles = (theme) => ({
  container: {
    textDecoration: "none",
    color: theme.palette.textPrimary,
    width: "100%",
  },
  rowContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  paddingSide: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
});
