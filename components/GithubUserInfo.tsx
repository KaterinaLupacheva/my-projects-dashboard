import '@ramonak/paper/dist/index.css';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
//@ts-ignore
import Paper from '@ramonak/paper';
import Image from 'next/image';
import Link from 'next/link';

import { IGithubUser } from '../types/general';
import StatCard from './StatCard';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
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
                <a>{`@${login}`}</a>
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
                <a target="_blank">
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
            <StatCard title="Total Repos" value={public_repos} />
          </Grid>
          <Grid item xs>
            <StatCard title="Followers" value={followers} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs>
            <StatCard title="Total stars" value={stars} />
          </Grid>
          <Grid item xs>
            <StatCard title="Total forks" value={forks} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GithubUserInfo;
