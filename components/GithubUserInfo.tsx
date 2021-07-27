import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import Paper from '@ramonak/paper';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

import { IGithubUser } from '../types/general';
import { fetcher } from '../utils/fetcher';
import DetailedStatCard from './DetailedStatCard';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    borderRadius: '100%',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  gridColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  margin: {
    marginBottom: theme.spacing(3),
  },
  link: {
    color: theme.palette.text.primary,
    fontWeight: 'bolder',
  },
}));

const GithubUserInfo = (props: IGithubUser): JSX.Element => {
  const {
    login,
    avatar_url,
    html_url,
    name,
    company,
    blog,
    location,
    email,
    bio,
    public_repos,
    followers,
    totalStarsAndForks: { stars, forks },
  } = props;

  const classes = useStyles();

  const { data } = useSWR('/api/stats/github', fetcher);
  if (!data) return <CircularProgress color="inherit" />;

  return (
    <Grid container spacing={2} className={classes.margin}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          {name}
        </Typography>
        <Typography variant="h6" align="center">
          {bio}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} customClass={classes.container}>
          <div className={classes.column}>
            {avatar_url && (
              <Image
                src={avatar_url}
                alt="User photo"
                width={150}
                height={150}
                className={classes.avatar}
              />
            )}
            <div>
              <Link href={html_url}>
                <a className={classes.link}>{`@${login}`}</a>
              </Link>
            </div>
          </div>
          <div className={classes.column}>
            <div className={classes.row}>
              <LocationOnIcon fontSize="small" />
              <Typography>{location}</Typography>
            </div>
            <div className={classes.row}>
              <LanguageIcon fontSize="small" />
              <Link href={`https://${blog}`}>
                <a target="_blank" className={classes.link}>
                  <Typography>{blog}</Typography>
                </a>
              </Link>
            </div>
            <div className={classes.row}>
              <MailOutlineIcon fontSize="small" />
              <Typography>{email}</Typography>
            </div>
            <div className={classes.row}>
              <WorkOutlineIcon fontSize="small" />
              <Typography>{company}</Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} className={classes.gridColumn}>
        <Grid container spacing={2}>
          <Grid item xs>
            <DetailedStatCard
              data={data?.reposStats}
              title="Total Repos"
              value={public_repos}
            />
          </Grid>
          <Grid item xs>
            <DetailedStatCard
              data={data?.followersStats}
              title="Followers"
              value={followers}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs>
            <DetailedStatCard
              data={data?.starsStats}
              title="Total stars"
              value={stars}
            />
          </Grid>
          <Grid item xs>
            <DetailedStatCard
              data={data?.forksStats}
              title="Total forks"
              value={forks}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GithubUserInfo;
