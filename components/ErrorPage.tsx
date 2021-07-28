import { makeStyles, Typography } from '@material-ui/core';
import MoodBadIcon from '@material-ui/icons/MoodBad';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(30),
    flex: 1,
    flexDirection: 'column',
  },
}));

const ErrorPage = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h3">Ooops, something went wrong...</Typography>
      <MoodBadIcon fontSize="large" />
    </div>
  );
};

export default ErrorPage;
