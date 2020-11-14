import { Typography, Box } from "@material-ui/core";
import Link from "next/link";
import Paper from "@ramonak/paper";
import "@ramonak/paper/dist/index.css";
import { makeStyles } from "@material-ui/core/styles";
import { githubCardStyles } from "./github-card.styles";
import LanguageIcon from "@material-ui/icons/Language";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import GavelIcon from "@material-ui/icons/Gavel";

const useStyles = makeStyles(githubCardStyles);

const GithubCard = (props) => {
  const {
    name,
    html_url,
    description,
    created_at,
    updated_at,
    homepage,
    stargazers_count,
    watchers_count,
    language,
    forks_count,
    license,
  } = props;
  const classes = useStyles();

  return (
    <Paper elevation={3} customClass={classes.paperContainer}>
      <Box p={1}>
        <Link href={html_url}>
          <a className={classes.container} target="_blank">
            <Typography variant="h4" align="center" gutterBottom>
              {name}
            </Typography>
          </a>
        </Link>
        {homepage && (
          <Link href={homepage}>
            <a target="_blank" className={classes.row}>
              <LanguageIcon fontSize="small" />
              <Typography>Website</Typography>
            </a>
          </Link>
        )}
        <Typography align="justify" gutterBottom>
          {description}
        </Typography>
        <div className={classes.statsRow}>
          <div className={classes.row}>
            <StarBorderIcon fontSize="small" />
            <Typography>{stargazers_count}</Typography>
          </div>
          <div className={classes.row}>
            <CallSplitIcon fontSize="small" />
            <Typography>{forks_count}</Typography>
          </div>
          <div className={classes.row}>
            <VisibilityIcon fontSize="small" />
            <Typography>{watchers_count}</Typography>
          </div>
          {language && (
            <div className={classes.row}>
              <FiberManualRecordIcon fontSize="small" />
              <Typography>{language}</Typography>
            </div>
          )}
          <div className={classes.row}>
            <CalendarTodayIcon fontSize="small" />
            <Typography>
              Created{" "}
              {new Date(created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Typography>
          </div>
          <div className={classes.row}>
            <AccessTimeIcon fontSize="small" />
            <Typography>
              Updated{" "}
              {new Date(updated_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Typography>
          </div>
          {license && (
            <div className={classes.row}>
              <GavelIcon fontSize="small" />
              <Typography>{license?.spdx_id}</Typography>
            </div>
          )}
        </div>
      </Box>
    </Paper>
  );
};

export default GithubCard;
