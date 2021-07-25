import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IMappedDoc } from '../types/general';
import { prepareViewsData } from '../utils/blog-views';
import CustomLineChart from './LineChart';

const useStyles = makeStyles((theme) => ({
  modal: {
    height: '50vh',
  },
  chartContainer: {
    width: '90%',
    height: '70%',
    margin: theme.spacing(2),
  },
  title: {
    paddingTop: theme.spacing(2),
  },
}));

interface BlogViewsDetailsProps {
  handleClose: () => void;
  open: boolean;
  data: IMappedDoc;
}

const BlogViewsDetails = ({
  handleClose,
  open,
  data,
}: BlogViewsDetailsProps): JSX.Element => {
  const classes = useStyles();
  const { viewsData, description } = data;

  const viewsStats = prepareViewsData(viewsData);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="details-dialog"
      open={open}
      maxWidth="md"
      fullWidth
      classes={{ paper: classes.modal }}
    >
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        className={classes.title}
      >
        Views Count
      </Typography>
      <Typography variant="h6" gutterBottom align="center">
        {description}
      </Typography>
      <div className={classes.chartContainer}>
        <CustomLineChart
          data={viewsStats}
          lineDataKey="views"
          xDataKey="date"
        />
      </div>
    </Dialog>
  );
};

export default BlogViewsDetails;
