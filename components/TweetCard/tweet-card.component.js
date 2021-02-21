import '@ramonak/paper/dist/index.css';

import { Box, Chip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@ramonak/paper';
import clsx from 'clsx';
import Link from 'next/link';

import { tweetCardStyles } from './tweet-card.styles';

const useStyles = makeStyles(tweetCardStyles);

const TweetCard = (props) => {
  const {
    text,
    created_at,
    retweet_count,
    favorite_count,
    in_reply_to_status_id,
    truncated,
  } = props;
  const classes = useStyles();

  const transformTweet = () => {
    const twitterLink = ' https://t.co/';
    const parts = text.split(twitterLink);
    const tweet = parts[0];
    const link = twitterLink.concat(parts[1]);
    return (
      <div>
        <Typography>
          {tweet}
          <Link href={link}>
            <a target="_blank" className={classes.link}>
              <Typography variant="caption" component="span">
                Read More
              </Typography>
            </a>
          </Link>
        </Typography>
      </div>
    );
  };

  return (
    <Paper elevation={3} customClass={classes.container}>
      <Box
        p={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <div className={classes.rowSpaceBetween}>
          <Chip
            variant="outlined"
            color={in_reply_to_status_id ? 'secondary' : 'primary'}
            label={in_reply_to_status_id ? 'Reply' : 'Tweet'}
          />
          <div className={classes.row}>
            <Typography variant="subtitle2">Created: &nbsp;</Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Typography>
          </div>
        </div>
        {truncated ? transformTweet() : <Typography>{text}</Typography>}

        <div className={classes.row}>
          <div className={clsx(classes.row, classes.paddingSide)}>
            <RepeatIcon fontSize="small" />
            <Typography>{retweet_count}</Typography>
          </div>
          <div className={clsx(classes.row, classes.paddingSide)}>
            <FavoriteBorderIcon fontSize="small" />
            <Typography>{favorite_count}</Typography>
          </div>
        </div>
      </Box>
    </Paper>
  );
};

export default TweetCard;
