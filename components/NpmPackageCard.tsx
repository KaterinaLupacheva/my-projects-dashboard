import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@ramonak/paper';
import useSWR from 'swr';

import { INpmDownloads } from '../types/general';
import { fetcher } from '../utils/fetcher';
import BackDropWithSpinner from './BackdropWithSpinner';
import CustomLineChart from './LineChart';
import StatCard from './StatCard';

const useStyles = makeStyles((theme: Theme) => ({
  paperContainer: {
    padding: theme.spacing(1),
  },
}));

interface NpmPackageCardProps {
  packageName: string;
}

const NpmPackageCard = ({ packageName }: NpmPackageCardProps): JSX.Element => {
  const { data, error } = useSWR(`/api/npm/${packageName}`, fetcher);
  const classes = useStyles();

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.lastMonthDownloads) return <div>Error</div>;

  const averageDownloads = (downloadsData: INpmDownloads[]) => {
    const sum = downloadsData.reduce((a, b) => a + b.downloads, 0);
    const avg = Math.round(sum / downloadsData.length) || 0;
    return avg;
  };

  return (
    <Paper elevation={3} customClass={classes.paperContainer}>
      <Typography variant="h6" align="center" gutterBottom>
        {data.lastMonthDownloads.package}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <CustomLineChart
            data={data.lastMonthDownloads.downloads}
            lineDataKey="downloads"
            xDataKey="day"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container>
            <Grid item xs={12} sm={6} md={12}>
              <StatCard
                title="Average per day"
                value={averageDownloads(data.lastMonthDownloads.downloads)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <StatCard
                title="Weekly downloads"
                value={data.weeklyDownloads.downloads}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NpmPackageCard;
