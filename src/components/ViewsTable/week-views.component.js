import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { weekViewsStyles } from "./week-views.styles";

const useStyles = makeStyles(weekViewsStyles);

const WeekViews = (props) => {
  const { thisWeekViews, change } = props;
  const classes = useStyles();
  const roundChange = Math.round(change);

  return (
    <div className={classes.container}>
      <Typography>{thisWeekViews}</Typography>
      <div
        className={`${classes.bottomRow} ${
          change > 0 ? `${classes.green}` : `${classes.red}`
        }`}
      >
        {change > 0 ? (
          <ArrowUpwardIcon fontSize="small" />
        ) : change < 0 ? (
          <ArrowDownwardIcon fontSize="small" />
        ) : (
          ""
        )}
        <Typography variant="body2">
          {change > 0
            ? `${roundChange}%`
            : change < 0
            ? `${roundChange * -1}%`
            : ""}
        </Typography>
      </div>
    </div>
  );
};

export default WeekViews;
