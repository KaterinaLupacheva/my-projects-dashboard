import Image from "next/image";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { githubUserInfoStyles } from "./github-user-info.styles";
import { Typography, Grid } from "@material-ui/core";
import Paper from "@ramonak/paper";
import "@ramonak/paper/dist/index.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import LanguageIcon from "@material-ui/icons/Language";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import StatCard from "../StatCard/stat-card.component";

const useStyles = makeStyles(githubUserInfoStyles);

const GithubUserInfo = (props) => {
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
  } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
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
            <StatCard title="Total stars" value="!!!!" />
          </Grid>
          <Grid item xs>
            <StatCard title="Total forks" value="!!!!" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GithubUserInfo;
