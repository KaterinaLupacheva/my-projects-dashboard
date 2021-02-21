export const tweetCardStyles = (theme) => ({
  container: {
    marginTop: theme.spacing(1),
    height: '100%',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowSpaceBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paddingSide: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    color: 'grey',
  },
});
