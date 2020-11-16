import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import BackDropWithSpinner from "../BackDropWithSpinner/backdrop-with-spinner.component";
import Paper from "@ramonak/paper";
import "@ramonak/paper/dist/index.css";
import { makeStyles } from "@material-ui/core/styles";
import { npmPackageCardStyles } from "./npm-package-card.styles";
import { Typography, Box } from "@material-ui/core";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
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

  const renderLineChart = (
    <LineChart
      width={600}
      height={300}
      data={data.lastMonthDownloads.downloads}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <Line type="monotone" dataKey="downloads" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  return (
    <Paper elevation={3} customClass={classes.paperContainer}>
      <Typography variant="h6" align="center">
        {data.lastMonthDownloads.package}
      </Typography>
      <Box m={1} className={classes.dataContainer}>
        {renderLineChart}
        <Box className={classes.statsContainer}>
          <StatCard
            title="Average per day"
            value={averageDownloads(data.lastMonthDownloads.downloads)}
          />
          <StatCard
            title="Weekly downloads"
            value={data.weeklyDownloads.downloads}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default NpmPackageCard;
