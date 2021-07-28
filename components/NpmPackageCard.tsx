import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@ramonak/paper';
import useSWR from 'swr';

import { INpmDownloads } from '../types/general';
import { fetcher } from '../utils/fetcher';
import CustomLineChart from './LineChart';
import StatCard from './StatCard';
import ErrorPage from '../components/ErrorPage';

const useStyles = makeStyles((theme: Theme) => ({
  paperContainer: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
}));

interface NpmPackageCardProps {
  packageName: string;
}

const NpmPackageCard = ({ packageName }: NpmPackageCardProps): JSX.Element => {
  const classes = useStyles();
  const { data, error } = useSWR(`/api/npm/${packageName}`, fetcher);

  if (error) return <ErrorPage />;

  const averageDownloads = (downloadsData: INpmDownloads[]) => {
    const sum = downloadsData.reduce((a, b) => a + b.downloads, 0);
    const avg = Math.round(sum / downloadsData.length) || 0;
    return avg;
  };

  return (
    <Paper elevation={3} customClass={classes.paperContainer}>
      {!data ? (
        <div className={classes.container}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.lastMonthDownloads.package}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <CustomLineChart
                data={data?.lastMonthDownloads.downloads}
                lineDataKey="downloads"
                xDataKey="day"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={12}>
                  <StatCard
                    title="Average per day"
                    value={averageDownloads(data?.lastMonthDownloads.downloads)}
                    withBorder
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <StatCard
                    title="Weekly downloads"
                    value={data?.weeklyDownloads.downloads}
                    withBorder
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Paper>
  );
};

export default NpmPackageCard;
