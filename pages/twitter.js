import CustomHead from "../src/components/Head/head";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import BackDropWithSpinner from "../src/components/BackDropWithSpinner/backdrop-with-spinner.component";
import TwitterUserInfo from "../src/components/TwitterUserInfo/twitter-user-info.component";
import TweetCard from "../src/components/TweetCard/tweet-card.component";
import { Box, Typography, Grid, Divider } from "@material-ui/core";

const Twitter = () => {
  const { data, error } = useSWR("/api/twitter", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.userData || !data.tweetsData) return <div>Error</div>;

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
        <TwitterUserInfo {...data.userData} />

        <Divider />

        <Box p={2}>
          <Typography variant="h2" align="center">
            Tweets
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {data.tweetsData.map((tweet, id) => (
            <Grid item sm={6} key={id}>
              <TweetCard {...tweet} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Twitter;
