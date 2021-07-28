import { Typography } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Paper from '@ramonak/paper';
import React, { useState } from 'react';

import { prepareStatsDetails } from '../utils/stats-helpers';
import StatsDetails from './StatsDetails';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing(1),
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    paddingTop: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
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

interface DetailedStatCardProps {
  data: any;
  value: number;
  title: string;
  isDevto?: boolean;
}

const DetailedStatCard = ({
  data,
  value,
  title,
  ...otherProps
}: DetailedStatCardProps): JSX.Element => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { change, transformedData } = prepareStatsDetails(data);
  const color = change > 0 ? `${classes.green}` : `${classes.red}`;

  return (
    <Paper customClass={classes.paper} elevation={3}>
      <div className={classes.container}>
        <Typography variant="h4">{value}</Typography>
        <Typography variant="button">{title}</Typography>
      </div>
      <div className={classes.column}>
        <IconButton onClick={() => setIsModalOpen(true)} size="small">
          <OpenInNewIcon fontSize="small" color="secondary" />
        </IconButton>
        <Typography className={color}>{change}</Typography>
      </div>
      <StatsDetails
        open={isModalOpen}
        handleClose={handleModalClose}
        data={transformedData}
        title={title}
        {...otherProps}
      />
    </Paper>
  );
};

export default DetailedStatCard;
