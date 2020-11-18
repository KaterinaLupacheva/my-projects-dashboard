import Image from "next/image";
import Link from "next/link";
import { Typography } from "@material-ui/core";
import Paper from "@ramonak/paper";
import "@ramonak/paper/dist/index.css";
import { twitterUserInfoStyles } from "./twitter-user-info.styles";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import DateRangeIcon from "@material-ui/icons/DateRange";

const useStyles = makeStyles(twitterUserInfoStyles);

const TwitterUserInfo = (props) => {
  const {
    profile_image_url_https,
    screen_name,
    name,
    location,
    created_at,
  } = props;
  const classes = useStyles();

  return (
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
              <a target="_blank">{`@${screen_name}`}</a>
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
              <a target="_blank">{name}</a>
            </Link>
          </div>
          <div className={classes.row}>
            <DateRangeIcon fontSize="small" />
            <Typography>
              {`Joined ${new Date(created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}`}
            </Typography>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default TwitterUserInfo;
