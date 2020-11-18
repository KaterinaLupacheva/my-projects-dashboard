export const twitterUserInfoStyles = (theme) => ({
  container: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  avatar: {
    borderRadius: "100%",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0.5),
  },
});
