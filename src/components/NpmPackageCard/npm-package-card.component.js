import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import BackDropWithSpinner from "../BackDropWithSpinner/backdrop-with-spinner.component";
import Paper from "@ramonak/paper";
import "@ramonak/paper/dist/index.css";
import { makeStyles } from "@material-ui/core/styles";
import { npmPackageCardStyles } from "./npm-package-card.styles";
import { Typography, Grid } from "@material-ui/core";
import CustomLineChart from '../Charts/LineChart.component'
import StatCard from "../StatCard/stat-card.component";

const useStyles = makeStyles(npmPackageCardStyles);

const NpmPackageCard = (props) => {
  const { packageName } = props;
  const { data, error } = useSWR(`/api/npm/${packageName}`, fetcher);
  const classes = useStyles();

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.lastMonthDownloads) return <div>Error</div>;

  const averageDownloads = (downloadsData) => {
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
          <CustomLineChart data={data.lastMonthDownloads.downloads} lineDataKey="downloads" xDataKey="day"/>
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
