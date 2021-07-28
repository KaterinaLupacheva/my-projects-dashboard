import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import useSWR from 'swr';

import BackDropWithSpinner from '../components/BackdropWithSpinner';
import ErrorPage from '../components/ErrorPage';
import GithubCard from '../components/GitHubCard';
import GithubUserInfo from '../components/GithubUserInfo';
import CustomHead from '../components/Head';
import { GithubSortOptions } from '../types/general';
import { fetcher } from '../utils/fetcher';
import { countTotalStarsAndForks } from '../utils/stats-helpers';

const GitHub = (): JSX.Element => {
  const { data, error } = useSWR('/api/github', fetcher);
  const [sortType, setSortType] = useState<GithubSortOptions>('stars');

  if (error) return <ErrorPage />;
  if (!data) return <BackDropWithSpinner open={true} />;

  const starsAndForks = countTotalStarsAndForks(data.repos, data.user.login);

  const sortArray = (type: GithubSortOptions) => {
    const types = {
      stars: 'stargazers_count',
      forks: 'forks_count',
      upd: 'updated_at',
    };
    const sortProperty = types[type];
    const reposArr = data.repos;
    if (type === 'upd') {
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
      <CustomHead title="GitHub stats" />
      <GithubUserInfo {...data.user} totalStarsAndForks={starsAndForks} />
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
            onChange={(event) =>
              setSortType(event.target.value as GithubSortOptions)
            }
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
