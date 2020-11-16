import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import BackDropWithSpinner from "../BackDropWithSpinner/backdrop-with-spinner.component";
import Paper from "@ramonak/paper";
import "@ramonak/paper/dist/index.css";
import { Typography } from "@material-ui/core";

const NpmPackageCard = (props) => {
  const { packageName } = props;
  const { data, error } = useSWR(`/api/npm/${packageName}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.downloads) return <div>Error</div>;

  return (
    <Paper elevation={3}>
      <Typography variant="h6" align="center">
        {data.downloads.package}
      </Typography>
    </Paper>
  );
};

export default NpmPackageCard;
