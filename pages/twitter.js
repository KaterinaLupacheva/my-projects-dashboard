import CustomHead from "../src/components/Head/head";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import BackDropWithSpinner from "../src/components/BackDropWithSpinner/backdrop-with-spinner.component";
import StatsCard from "../src/components/StatCard/stat-card.component";
import TwitterUserInfo from "../src/components/TwitterUserInfo/twitter-user-info.component";
import { Grid, Box, Typography } from "@material-ui/core";

const Twitter = () => {
  const { data, error } = useSWR("/api/twitter", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.userData) return <div>Error</div>;

  return (
    <>
      <CustomHead title="Twitter stats" />
      <Box style={{ width: "100%" }}>
        <Typography variant="h2" align="center">
          {data.userData.name}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          {data.userData.description}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TwitterUserInfo {...data.userData} />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatsCard
              title="Followers"
              value={data.userData.followers_count}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatsCard title="Following" value={data.userData.friends_count} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Twitter;
