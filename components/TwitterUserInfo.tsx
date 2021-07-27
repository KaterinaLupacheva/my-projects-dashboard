import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LinkIcon from '@material-ui/icons/Link';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Paper from '@ramonak/paper';
import Image from 'next/image';
import Link from 'next/link';

import { ITweeterUser } from '../types/general';
import StatsCard from './StatCard';

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
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0.5),
  },
  margin: {
    marginBottom: theme.spacing(3),
  },
  link: {
    color: theme.palette.primary.main,
    fontWeight: 'bolder',
  },
}));

const TwitterUserInfo = (props: ITweeterUser): JSX.Element => {
  const {
    profile_image_url_https,
    screen_name,
    name,
    location,
    created_at,
    followers_count,
    friends_count,
  } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.margin}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3}>
          <div className={classes.container}>
            <div className={classes.column}>
              <Image
                src={profile_image_url_https}
                alt="User photo"
                width={50}
                height={50}
                className={classes.avatar}
              />
              <div>
                <Link href={`https://twitter.com/${screen_name}`}>
                  <a
                    target="_blank"
                    className={classes.link}
                  >{`@${screen_name}`}</a>
                </Link>
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.row}>
                <LocationOnIcon fontSize="small" />
                <Typography>{location}</Typography>
              </div>
              <div className={classes.row}>
                <LinkIcon fontSize="small" />
                <Link href={`https://${name}`}>
                  <a target="_blank" className={classes.link}>
                    {name}
                  </a>
                </Link>
              </div>
              <div className={classes.row}>
                <DateRangeIcon fontSize="small" />
                <Typography>
                  {`Joined ${new Date(created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                  })}`}
                </Typography>
              </div>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <StatsCard title="Followers" value={followers_count} />
      </Grid>
      <Grid item xs={12} md={3}>
        <StatsCard title="Following" value={friends_count} />
      </Grid>
    </Grid>
  );
};

export default TwitterUserInfo;
