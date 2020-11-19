import { Typography, Box, Chip } from "@material-ui/core";
import clsx from "clsx";
import Paper from "@ramonak/paper";
import "@ramonak/paper/dist/index.css";
import { makeStyles } from "@material-ui/core/styles";
import { tweetCardStyles } from "./tweet-card.styles";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles(tweetCardStyles);

const TweetCard = (props) => {
  const {
    text,
    created_at,
    retweet_count,
    favorite_count,
    in_reply_to_status_id,
  } = props;
  const classes = useStyles();

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
            color={in_reply_to_status_id ? "secondary" : "primary"}
            label={in_reply_to_status_id ? "Reply" : "Tweet"}
          />
          <div className={classes.row}>
            <Typography variant="subtitle2">Created: &nbsp;</Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
          </div>
        </div>
        <Typography>{text}</Typography>
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
