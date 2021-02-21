import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import CustomLineChart from '../Charts/LineChart.component';

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

const BlogViewsDetails = ({ handleClose, open, data }) => {
  const classes = useStyles();
  const { viewsData, description } = data;
  const prepareViewsData = () => {
    let result = [];
    if (viewsData.length > 1) {
      for (let i = 0; i < viewsData.length; i += 2) {
        const el1 = viewsData[i];
        const el2 = viewsData[i + 1];

        const start = moment(el1.date, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const end = moment(el2?.date, 'DD-MM-YYYY');
        if (!el2) {
          const prevDate = moment(viewsData[i - 1].date, 'DD-MM-YYYY').format(
            'YYYY-MM-DD'
          );
          result.push(fillEmptyDates(prevDate, start));
          result.push(el1);
        } else {
          result.push(el1);
          result.push(fillEmptyDates(start, end));
          result.push(el2);
        }
      }
    } else {
      result = viewsData;
    }
    return result.flat();
  };

  const fillEmptyDates = (start, end) => {
    let emptyDates = [];
    let tempDate = moment(start).add(1, 'days');
    while (tempDate.isBetween(start, end)) {
      emptyDates.push({
        date: tempDate.format('DD-MM-YYYY'),
        views: 0,
      });
      tempDate.add(1, 'days');
    }
    return emptyDates;
  };

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
          data={prepareViewsData()}
          lineDataKey="views"
          xDataKey="date"
        />
      </div>
    </Dialog>
  );
};

export default BlogViewsDetails;
