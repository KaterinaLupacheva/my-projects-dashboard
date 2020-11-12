import { Grid, Typography } from "@material-ui/core";
import Paper from "@ramonak/paper";
import "@ramonak/paper/dist/index.css";
import { makeStyles } from "@material-ui/core/styles";
import { statCardStyles } from "./stat-card.styles";

const useStyles = makeStyles(statCardStyles);

const StatCard = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper customClass={classes.paper} elevation={3}>
        <div>
          <Typography variant="h4">{props.value}</Typography>
          <Typography variant="button">{props.title}</Typography>
        </div>
      </Paper>
    </Grid>
  );
};

export default StatCard;
