import CustomHead from "../src/components/Head/head";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import BackDropWithSpinner from "../src/components/BackDropWithSpinner/backdrop-with-spinner.component";
import TwitterUserInfo from "../src/components/TwitterUserInfo/twitter-user-info.component";
import { Box, Typography } from "@material-ui/core";

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
      </Box>
    </>
  );
};

export default Twitter;
