import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { BackDropStyles } from "./backdrop-with-spinner.styles";

const useStyles = makeStyles(BackDropStyles);

const BackDropWithSpinner = ({ open }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackDropWithSpinner;
