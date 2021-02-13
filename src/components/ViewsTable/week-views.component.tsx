import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(1, 0, 0, 1),
  },
  green: {
    color: green[500],
    fontSize: '1.5rem',
  },
  red: {
    color: red.A200,
    fontSize: '1.5rem',
  },
}));

type WeekViewsProps = {
  thisWeekViews: number;
  change: number;
};

const WeekViews: string = (props: WeekViewsProps) => {
  const { thisWeekViews, change } = props;
  const classes = useStyles();
  const roundChange = Math.round(change);

  return (
    <div className={classes.container}>
      <Typography>{thisWeekViews}</Typography>
      <div
        className={`${classes.bottomRow} ${
          change > 0 ? `${classes.green}` : `${classes.red}`
        }`}
      >
        {change > 0 ? (
          <ArrowUpwardIcon fontSize="small" />
        ) : change < 0 ? (
          <ArrowDownwardIcon fontSize="small" />
        ) : (
          ''
        )}
        <Typography variant="body2">
          {change > 0
            ? `${roundChange}%`
            : change < 0
            ? `${roundChange * -1}%`
            : roundChange}
        </Typography>
      </div>
    </div>
  );
};

export default WeekViews;
