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
  },
  statsRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
  },
});
