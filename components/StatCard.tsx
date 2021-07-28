import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@ramonak/paper';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

interface StatCardProps {
  value: number;
  title: string;
}

const StatCard = ({ value, title }: StatCardProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Paper customClass={classes.paper} elevation={3}>
      <div>
        <Typography variant="h4">{value}</Typography>
        <Typography variant="button">{title}</Typography>
      </div>
    </Paper>
  );
};

export default StatCard;
