import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import BackDropWithSpinner from "../src/components/BackDropWithSpinner/backdrop-with-spinner.component";
import GithubUserInfo from "../src/components/GithubUserInfo/github-user-info.component";
import GithubCard from "../src/components/GihubCard/github-card.component";
import { Typography, Grid } from "@material-ui/core";

const GitHub = () => {
  const { data, error } = useSWR("/api/github", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.user || !data.repos) return <div>Error</div>;

  return (
    <div>
      <GithubUserInfo {...data.user} />
      <Typography variant="h3" align="center" gutterBottom>
        Repositories
      </Typography>
      <Grid container spacing={2}>
        {data.repos.map((repo) => {
          if (!repo.fork) {
            return (
              <Grid item sm={6}>
                <GithubCard {...repo} key={repo.id} />
              </Grid>
            );
          }
        })}
      </Grid>
    </div>
  );
};

export default GitHub;
