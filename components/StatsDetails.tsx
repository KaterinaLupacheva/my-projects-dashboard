import { Dialog, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

import { StatsData } from '../types/general';
import CustomLineChart from './LineChart';

const useStyles = makeStyles((theme) => ({
  modal: {
    height: '50vh',
  },
  chartContainer: {
    width: '90%',
    height: '70%',
    margin: theme.spacing(2),
  },
  title: {
    paddingTop: theme.spacing(2),
  },
}));

interface StatsDetailsProps {
  handleClose: () => void;
  open: boolean;
  data: StatsData[];
  title: string;
  isDevto?: boolean;
}

const StatsDetails = ({
  open,
  data,
  handleClose,
  title,
  isDevto,
}: StatsDetailsProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="details-dialog"
      open={open}
      maxWidth="md"
      fullWidth
      classes={{ paper: classes.modal }}
    >
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        className={classes.title}
      >
        {title}
      </Typography>
      <div className={classes.chartContainer}>
        <CustomLineChart
          data={data}
          lineDataKey="count"
          xDataKey="date"
          isDevto={isDevto}
        />
      </div>
    </Dialog>
  );
};

export default StatsDetails;
