import { useState } from "react";
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
  const [sortType, setSortType] = useState("stars");

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.user || !data.repos) return <div>Error</div>;

  const countTotalStarsAndForks = (repos) => {
    let result = { stars: 0, forks: 0 };
    repos.forEach((repo) => {
      if (repo.owner.login === data.user.login) {
        result.stars += repo.stargazers_count;
        result.forks += repo.forks_count;
      }
    });
    return result;
  };

  const sortArray = (type) => {
    const types = {
      stars: "stargazers_count",
      forks: "forks_count",
      upd: "updated_at",
    };
    const sortProperty = types[type];
    const reposArr = data.repos;
    if (type === "upd") {
      return [...reposArr].sort(
        (a, b) => Date.parse(b[sortProperty]) - Date.parse(a[sortProperty])
      );
    } else {
      return [...reposArr].sort((a, b) => b[sortProperty] - a[sortProperty]);
    }
  };

  const renderRepos = () => {
    const sorted = sortArray(sortType);
    return (
      <Grid container spacing={2}>
        {sorted.map((repo) => {
          if (repo.owner.login === data.user.login) {
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
      <GithubUserInfo
        {...data.user}
        totalStarsAndForks={countTotalStarsAndForks(data.repos)}
      />
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
      {renderRepos()}
    </div>
  );
};

export default GitHub;
