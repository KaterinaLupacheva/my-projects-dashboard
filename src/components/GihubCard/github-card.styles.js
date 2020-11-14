export const githubCardStyles = (theme) => ({
  container: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  statsRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
  },
  paperContainer: {
    height: "100%",
  },
});
