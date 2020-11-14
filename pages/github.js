import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import BackDropWithSpinner from "../src/components/BackDropWithSpinner/backdrop-with-spinner.component";
import GithubUserInfo from "../src/components/GithubUserInfo/github-user-info.component";
import GithubCard from "../src/components/GihubCard/github-card.component";
import {
  Typography,
  Grid,
  Divider,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

const GitHub = () => {
  const { data, error } = useSWR("/api/github", fetcher);
  const [sortedRepos, setSortedRepos] = useState(null);
  const [sortType, setSortType] = useState("stars");

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        stars: "stargazers_count",
        forks: "forks_count",
        upd: "updated_at",
      };
      const sortProperty = types[type];
      const reposArr = data.repos;
      if (type === "upd") {
        setSortedRepos(
          [...reposArr].sort(
            (a, b) => Date.parse(b[sortProperty]) - Date.parse(a[sortProperty])
          )
        );
      } else {
        setSortedRepos(
          [...reposArr].sort((a, b) => b[sortProperty] - a[sortProperty])
        );
      }
    };

    data && sortArray(sortType);
  }, [sortType]);

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.user || !data.repos) return <div>Error</div>;

  const countTotalStars = (repos) => {
    let result = 0;
    repos.forEach((repo) => {
      if (repo.owner.login === data.user.login) {
        result += repo.stargazers_count;
      }
    });
    return result;
  };

  const renderRepos = (repos) => {
    return (
      <Grid container spacing={2}>
        {repos.map((repo) => {
          if (!repo.fork && repo.owner.login === data.user.login) {
            return (
              <Grid item sm={6} key={repo.id}>
                <GithubCard {...repo} />
              </Grid>
            );
          }
        })}
      </Grid>
    );
  };

  return (
    <div>
      <GithubUserInfo {...data.user} totalStars={countTotalStars(data.repos)} />
      <Divider />
      <Box m={3} />
      <Typography variant="h3" align="center" gutterBottom>
        Repositories
      </Typography>
      <Box m={3}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Sorted by</FormLabel>
          <RadioGroup
            row
            aria-label="sort"
            name="sorted-repos"
            value={sortType}
            onChange={(event) => setSortType(event.target.value)}
          >
            <FormControlLabel value="stars" control={<Radio />} label="Stars" />
            <FormControlLabel value="forks" control={<Radio />} label="forks" />
            <FormControlLabel value="upd" control={<Radio />} label="Updated" />
          </RadioGroup>
        </FormControl>
      </Box>
      {sortedRepos ? renderRepos(sortedRepos) : renderRepos(data.repos)}
    </div>
  );
};

export default GitHub;
