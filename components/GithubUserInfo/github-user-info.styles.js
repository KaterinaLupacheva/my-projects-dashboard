export const githubUserInfoStyles = (theme) => ({
  container: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
  },
  avatar: {
    borderRadius: '100%',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  gridColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  margin: {
    marginBottom: theme.spacing(3),
  },
});
